import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Send, ArrowLeft, Wifi, WifiOff,
  Users, UserCircle, Search, Circle, X, UserPlus,
} from "lucide-react";
import * as API from "../../api";

type ChatTab = "mentors" | "general" | "direct";

interface ChatsPageProps {
  onBack: () => void;
  lang: "EN" | "RU";
  t: any;
  currentUser: any;
}

export default function ChatsPage({ onBack, lang, t, currentUser }: ChatsPageProps) {
  const [activeTab, setActiveTab] = useState<ChatTab>("direct");

  return (
    <div className="min-h-screen relative overflow-hidden px-5 pb-20 pt-28 md:px-6 md:pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.18] [background-image:linear-gradient(rgba(138,168,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,42,84,.13)_1px,transparent_1px)] [background-size:88px_88px]" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black md:text-4xl"
          >
            <span className="text-stone-900 dark:text-white">
              {lang === "RU" ? "Общение в " : "Chat on "}
            </span>
            <span className="bg-gradient-to-r from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)] bg-clip-text text-transparent">
              SkillPath
            </span>
          </motion.h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-white/40">
            {lang === "RU"
              ? "Общайтесь с менторами, участвуйте в общем чате и пишите друг другу"
              : "Chat with mentors, join the general chat, and message other users"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-xl shadow-sm dark:shadow-none max-w-md mx-auto">
          {([
            { id: "direct" as ChatTab, label: lang === "RU" ? "Личные" : "Direct", icon: MessageSquare },
            { id: "mentors" as ChatTab, label: lang === "RU" ? "Менторы" : "Mentors", icon: UserCircle },
            { id: "general" as ChatTab, label: lang === "RU" ? "Общий" : "General", icon: Users },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white shadow-lg shadow-[var(--tp)]/20"
                  : "text-stone-400 hover:text-stone-600 dark:text-white/40 dark:hover:text-white/70 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "mentors" && <MentorChatsTab lang={lang} currentUser={currentUser} />}
            {activeTab === "general" && <GeneralChatTab lang={lang} currentUser={currentUser} />}
            {activeTab === "direct" && <DirectChatsTab lang={lang} currentUser={currentUser} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Mentor Chats ──────────────────────────────────────────────

function MentorChatsTab({ lang, currentUser }: { lang: "EN" | "RU"; currentUser: any }) {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      API.getMentors().catch(() => ({ mentors: [] })),
      API.getMentorUsers().catch(() => ({ mentors: [] })),
    ]).then(([mentorsData, mentorUsersData]) => {
      const tableMentors = (mentorsData.mentors || mentorsData || []).map((m: any) => ({
        ...m,
        source: "mentors_table",
      }));
      const userMentors = (mentorUsersData.mentors || []).map((m: any) => ({
        ...m,
        source: "users_table",
      }));
      const seen = new Set<string>();
      const merged: any[] = [];
      for (const m of [...tableMentors, ...userMentors]) {
        const key = String(m.id);
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(m);
        }
      }
      setMentors(merged);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => { wsRef.current?.close(); };
  }, []);

  const openChat = async (mentor: any) => {
    setSelectedMentor(mentor);
    try {
      const data = await API.getChatHistory(mentor.id);
      setMessages(data.messages || []);
    } catch { setMessages([]); }
    connectWs(mentor.id);
  };

  const connectWs = (mentorId: number) => {
    wsRef.current?.close();
    const token = API.getToken();
    if (!token) return;
    const ws = new WebSocket(`${API.API_URL.replace("http", "ws")}/api/chat/ws/${mentorId}?token=${token}`);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "new_message") setMessages((p) => [...p, data.message]);
      } catch {}
    };
    wsRef.current = ws;
  };

  const send = async () => {
    if (!newMessage.trim() || !selectedMentor) return;
    const text = newMessage.trim();
    setNewMessage("");
    setMessages((p) => [...p, { id: Date.now(), from_who: "me", text, created_at: new Date().toISOString() }]);
    try {
      const res = await API.sendChatMessage(selectedMentor.id, text);
      if (res.mentor_reply) {
        setMessages((p) => [...p, res.mentor_reply]);
      }
    } catch (e) { console.error(e); }
  };

  if (selectedMentor) {
    return (
      <div className="bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-3xl shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "400px" }}>
        <div className="p-4 border-b border-stone-200/50 dark:border-white/5 flex items-center gap-3">
          <button onClick={() => { setSelectedMentor(null); wsRef.current?.close(); }} className="text-stone-400 hover:text-stone-600 dark:text-white/40 dark:hover:text-white/60 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--tp)] to-[var(--tp-dark)] flex items-center justify-center text-white font-bold text-sm shadow-md">
            {selectedMentor.name?.charAt(0) || "M"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-stone-900 dark:text-white text-sm font-bold truncate">{selectedMentor.name}</div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-400" : "bg-stone-300 dark:bg-white/20"}`} />
              <span className="text-stone-400 dark:text-white/30 text-xs">{connected ? (lang === "RU" ? "в сети" : "online") : "offline"}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 dark:bg-stone-950/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from_who === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from_who === "me"
                  ? "bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white rounded-br-md shadow-md"
                  : "bg-white dark:bg-white/10 border border-stone-200/50 dark:border-white/10 text-stone-700 dark:text-white/80 rounded-bl-md"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-stone-200/50 dark:border-white/5 bg-white/50 dark:bg-transparent">
          <div className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "RU" ? "Напишите сообщение..." : "Type a message..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-800 dark:text-white text-sm placeholder-stone-400 dark:placeholder-white/20 focus:outline-none focus:border-[var(--tp)] focus:ring-2 focus:ring-[var(--tp)]/20 transition-all"
            />
            <button onClick={send} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[var(--tp)]/20">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-3xl shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="p-5 border-b border-stone-200/50 dark:border-white/5">
        <h3 className="text-stone-900 dark:text-white font-bold text-base">
          {lang === "RU" ? "Выберите ментора" : "Choose a mentor"}
        </h3>
        <p className="text-stone-400 dark:text-white/30 text-xs mt-1">
          {lang === "RU" ? "Начните диалог с любым ментором" : "Start a conversation with any mentor"}
        </p>
      </div>
      {loading ? (
        <div className="p-12 text-center text-stone-400 dark:text-white/30 text-sm">
          <div className="w-8 h-8 border-3 border-[var(--tp)]/30 border-t-[var(--tp)] rounded-full animate-spin mx-auto" />
        </div>
      ) : mentors.length === 0 ? (
        <div className="p-12 text-center text-stone-400 dark:text-white/30 text-sm">
          <UserCircle size={40} className="mx-auto mb-3 text-stone-200 dark:text-white/10" />
          {lang === "RU" ? "Менторы пока не добавлены" : "No mentors yet"}
        </div>
      ) : (
        <div className="divide-y divide-stone-100 dark:divide-white/[0.03]">
          {mentors.map((m) => (
            <motion.button
              key={m.id}
              whileHover={{ backgroundColor: "rgba(138,168,255,0.04)" }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChat(m)}
              className="w-full p-4 flex items-center gap-4 text-left transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--tp)] to-[var(--tp-dark)] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[var(--tp)]/10">
                {m.name?.charAt(0) || "M"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-stone-900 dark:text-white text-sm font-bold">{m.name}</div>
                <div className="text-stone-400 dark:text-white/30 text-xs mt-0.5 truncate">{m.role_title || "Mentor"}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-stone-300 dark:text-white/20 text-xs">
                  <MessageSquare size={14} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── General Chat ──────────────────────────────────────────────

function GeneralChatTab({ lang, currentUser }: { lang: "EN" | "RU"; currentUser: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    API.getGeneralChatHistory()
      .then((d) => setMessages(d.messages || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = API.getToken();
    if (!token) return;
    const ws = new WebSocket(`${API.API_URL.replace("http", "ws")}/api/chat/ws/general?token=${token}`);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "new_message") setMessages((p) => [...p, data.message]);
      } catch {}
    };
    wsRef.current = ws;
    return () => { ws.close(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!newMessage.trim()) return;
    const text = newMessage.trim();
    setNewMessage("");
    setMessages((p) => [...p, {
      id: Date.now(), from_who: "general", text,
      sender_name: currentUser?.name || "You",
      created_at: new Date().toISOString(),
    }]);
    try {
      await API.sendGeneralMessage(text);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-3xl shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "400px" }}>
      <div className="p-4 border-b border-stone-200/50 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Users size={18} />
          </div>
          <div>
            <span className="text-stone-900 dark:text-white font-bold text-sm">
              {lang === "RU" ? "Общий чат" : "General Chat"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-400" : "bg-stone-300 dark:bg-white/20"}`} />
              <span className="text-stone-400 dark:text-white/30 text-xs">
                {connected ? (lang === "RU" ? "в сети" : "online") : "offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 dark:bg-stone-950/30">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-[var(--tp)]/30 border-t-[var(--tp)] rounded-full animate-spin mx-auto" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-stone-400 dark:text-white/30 text-sm py-12">
            <MessageSquare size={40} className="mx-auto mb-3 text-stone-200 dark:text-white/10" />
            {lang === "RU" ? "Пока нет сообщений. Начните общение!" : "No messages yet. Start chatting!"}
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.user_id === currentUser?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${isMe ? "text-right" : ""}`}>
                  {!isMe && msg.sender_name && (
                    <div className="text-[var(--tp)] text-xs font-bold mb-1 px-1">{msg.sender_name}</div>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white rounded-br-md shadow-md"
                      : "bg-white dark:bg-white/10 border border-stone-200/50 dark:border-white/10 text-stone-700 dark:text-white/80 rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-stone-200/50 dark:border-white/5 bg-white/50 dark:bg-transparent">
        <div className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={lang === "RU" ? "Напишите сообщение..." : "Type a message..."}
            className="flex-1 px-4 py-3 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-800 dark:text-white text-sm placeholder-stone-400 dark:placeholder-white/20 focus:outline-none focus:border-[var(--tp)] focus:ring-2 focus:ring-[var(--tp)]/20 transition-all"
          />
          <button onClick={send} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[var(--tp)]/20">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Direct Messages ───────────────────────────────────────────

function DirectChatsTab({ lang, currentUser }: { lang: "EN" | "RU"; currentUser: any }) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    API.getDirectConversations()
      .then((d) => setConversations(d.conversations || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => { wsRef.current?.close(); };
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (!q.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const data = await API.searchUsers(q);
        setSearchResults(data.users || []);
      } catch { setSearchResults([]); }
      setSearching(false);
    }, 300);
  }, []);

  const openChat = async (user: any) => {
    const convData = { user_id: user.id, user_name: user.name, user_avatar: user.avatar_url };
    setSelectedUser(convData);
    setShowUserSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    try {
      const data = await API.getDirectHistory(user.id);
      setMessages(data.messages || []);
      await API.markDirectRead(user.id);
    } catch { setMessages([]); }
    connectWs(user.id);
  };

  const connectWs = (userId: number) => {
    wsRef.current?.close();
    const token = API.getToken();
    if (!token) return;
    const ws = new WebSocket(`${API.API_URL.replace("http", "ws")}/api/chat/ws/direct/${userId}?token=${token}`);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "new_message") setMessages((p) => [...p, data.message]);
      } catch {}
    };
    wsRef.current = ws;
  };

  const send = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    const text = newMessage.trim();
    setNewMessage("");
    setMessages((p) => [...p, {
      id: Date.now(), user_id: currentUser?.id, from_who: "user", text,
      sender_name: currentUser?.name, created_at: new Date().toISOString(),
    }]);
    try {
      await API.sendDirectMessage(selectedUser.user_id, text);
    } catch (e) { console.error(e); }
  };

  if (selectedUser) {
    return (
      <div className="bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-3xl shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "400px" }}>
        <div className="p-4 border-b border-stone-200/50 dark:border-white/5 flex items-center gap-3">
          <button onClick={() => { setSelectedUser(null); wsRef.current?.close(); }} className="text-stone-400 hover:text-stone-600 dark:text-white/40 dark:hover:text-white/60 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--tp)] to-[var(--tp-dark)] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[var(--tp)]/10">
            {selectedUser.user_name?.charAt(0) || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-stone-900 dark:text-white text-sm font-bold truncate">{selectedUser.user_name}</div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-400" : "bg-stone-300 dark:bg-white/20"}`} />
              <span className="text-stone-400 dark:text-white/30 text-xs">
                {connected ? (lang === "RU" ? "в сети" : "online") : "offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 dark:bg-stone-950/30">
          {messages.map((msg) => {
            const isMe = msg.user_id === currentUser?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${isMe ? "text-right" : ""}`}>
                  {!isMe && msg.sender_name && (
                    <div className="text-[var(--tp)] text-xs font-bold mb-1 px-1">{msg.sender_name}</div>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white rounded-br-md shadow-md"
                      : "bg-white dark:bg-white/10 border border-stone-200/50 dark:border-white/10 text-stone-700 dark:text-white/80 rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-stone-200/50 dark:border-white/5 bg-white/50 dark:bg-transparent">
          <div className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "RU" ? "Напишите сообщение..." : "Type a message..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-800 dark:text-white text-sm placeholder-stone-400 dark:placeholder-white/20 focus:outline-none focus:border-[var(--tp)] focus:ring-2 focus:ring-[var(--tp)]/20 transition-all"
            />
            <button onClick={send} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[var(--tp)]/20">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-3xl shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-stone-200/50 dark:border-white/5">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-300 dark:text-white/20" />
            <input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={lang === "RU" ? "Найти пользователя по имени..." : "Search users by name..."}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-800 dark:text-white text-sm placeholder-stone-400 dark:placeholder-white/20 focus:outline-none focus:border-[var(--tp)] focus:ring-2 focus:ring-[var(--tp)]/20 transition-all"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setSearchResults([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 dark:text-white/20 hover:text-stone-500 dark:hover:text-white/40">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowUserSearch(!showUserSearch)}
            className={`px-4 py-3 rounded-2xl border transition-all flex items-center gap-2 text-sm font-medium ${
              showUserSearch
                ? "bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white border-transparent shadow-lg shadow-[var(--tp)]/20"
                : "bg-stone-100 dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-500 dark:text-white/40 hover:text-stone-700 dark:hover:text-white/70"
            }`}
          >
            <UserPlus size={16} />
          </button>
        </div>
      </div>

      {/* Search results */}
      {searchQuery && (
        <div className="border-b border-stone-200/50 dark:border-white/5">
          {searching ? (
            <div className="p-6 text-center">
              <div className="w-6 h-6 border-2 border-[var(--tp)]/30 border-t-[var(--tp)] rounded-full animate-spin mx-auto" />
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-6 text-center text-stone-400 dark:text-white/30 text-sm">
              {lang === "RU" ? "Пользователи не найдены" : "No users found"}
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 dark:divide-white/[0.03]">
              {searchResults.map((u) => (
                <motion.button
                  key={u.id}
                  whileHover={{ backgroundColor: "rgba(138,168,255,0.04)" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openChat(u)}
                  className="w-full p-3 flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--tp)] to-[var(--tp-dark)] flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {u.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-stone-900 dark:text-white text-sm font-semibold truncate">{u.name}</div>
                    <div className="text-stone-400 dark:text-white/30 text-xs capitalize">{u.role}</div>
                  </div>
                  <Send size={14} className="text-stone-300 dark:text-white/20" />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Conversations list */}
      <div className="p-4 border-b border-stone-200/50 dark:border-white/5">
        <h3 className="text-stone-900 dark:text-white font-bold text-sm">
          {lang === "RU" ? "Диалоги" : "Conversations"}
        </h3>
      </div>
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-[var(--tp)]/30 border-t-[var(--tp)] rounded-full animate-spin mx-auto" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="p-12 text-center text-stone-400 dark:text-white/30 text-sm">
          <MessageSquare size={40} className="mx-auto mb-3 text-stone-200 dark:text-white/10" />
          {lang === "RU" ? "Пока нет диалогов. Найдите пользователя выше!" : "No conversations yet. Search for a user above!"}
        </div>
      ) : (
        <div className="divide-y divide-stone-100 dark:divide-white/[0.03]">
          {conversations.map((conv) => (
            <motion.button
              key={conv.user_id}
              whileHover={{ backgroundColor: "rgba(138,168,255,0.04)" }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChat(conv)}
              className="w-full p-4 flex items-center gap-4 text-left transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--tp)] to-[var(--tp-dark)] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[var(--tp)]/10">
                {conv.user_name?.charAt(0) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-stone-900 dark:text-white text-sm font-bold">{conv.user_name}</div>
                <div className="text-stone-400 dark:text-white/30 text-xs truncate mt-0.5 max-w-[200px]">
                  {conv.last_message || (lang === "RU" ? "Нет сообщений" : "No messages")}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {conv.unread_count > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[var(--tp)] to-[var(--tp-dark)] text-white text-xs font-bold shadow-md">
                    {conv.unread_count}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
