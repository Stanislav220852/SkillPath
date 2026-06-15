import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, ArrowLeft, Wifi, WifiOff } from "lucide-react";
import * as API from "../../api";

interface MentorDashboardProps {
  onNavigate: (page: string) => void;
  user: any;
}

export default function MentorDashboard({ onNavigate, user }: MentorDashboardProps) {
  const [inbox, setInbox] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    API.getMentorInbox()
      .then((d) => setInbox(d.inbox || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openChat = async (item: any) => {
    setSelectedUser(item);
    try {
      const data = await API.getChatHistory(item.user_id);
      setMessages(data.messages || []);
      await API.markChatAsRead(item.user_id);
    } catch (e) {
      console.error(e);
    }
    connectWebSocket(item.user_id);
  };

  const connectWebSocket = (userId: number) => {
    if (wsRef.current) wsRef.current.close();
    const token = API.getToken();
    const wsUrl = `${API.API_URL.replace("https", "wss").replace("http", "ws")}/api/chat/ws/${userId}?token=${token}`;
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "new_message") {
          setMessages((prev) => [...prev, data.message]);
        }
      } catch {}
    };
    wsRef.current = ws;
  };

  useEffect(() => {
    return () => { wsRef.current?.close(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    try {
      await API.sendChatMessage(selectedUser.user_id, newMessage.trim());
      setMessages((prev) => [...prev, {
        id: Date.now(), from_who: "mentor", text: newMessage.trim(),
        created_at: new Date().toISOString(),
      }]);
      setNewMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14]">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedUser ? (
              <button onClick={() => { setSelectedUser(null); wsRef.current?.close(); }} className="text-white/40 hover:text-white/60">
                <ArrowLeft size={18} />
              </button>
            ) : null}
            <span className="text-white font-bold text-sm">
              {selectedUser ? `Chat with User #${selectedUser.user_id}` : "Mentor Dashboard"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectedUser && (
              <span className={`flex items-center gap-1 text-xs ${connected ? "text-green-400" : "text-white/30"}`}>
                {connected ? <Wifi size={12} /> : <WifiOff size={12} />}
                {connected ? "Live" : "Offline"}
              </span>
            )}
            <button onClick={() => onNavigate("home")} className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Back to Site
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!selectedUser ? (
          /* Inbox */
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="p-4 border-b border-white/5">
              <h3 className="text-white font-semibold">Conversations</h3>
            </div>
            {loading ? (
              <div className="p-8 text-center text-white/30 text-sm">Loading...</div>
            ) : inbox.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">
                <MessageSquare size={32} className="mx-auto mb-3 text-white/10" />
                No conversations yet
              </div>
            ) : (
              <div className="divide-y divide-white/[0.03]">
                {inbox.map((item) => (
                  <motion.button
                    key={item.user_id}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    onClick={() => openChat(item)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#8AA8FF]/10 flex items-center justify-center text-[#8AA8FF] font-bold text-sm">
                        #{item.user_id}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">User #{item.user_id}</div>
                        <div className="text-white/30 text-xs truncate max-w-[200px]">
                          {item.last_message?.text || "No messages"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.unread_count > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#8AA8FF] text-white text-xs font-bold">
                          {item.unread_count}
                        </span>
                      )}
                      <span className="text-white/20 text-xs">{item.total_messages} msgs</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Chat */
          <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", height: "calc(100vh - 160px)" }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from_who === "mentor" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from_who === "mentor"
                      ? "bg-[#8AA8FF] text-white rounded-br-md"
                      : "bg-white/5 text-white/80 rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a reply..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#8AA8FF]/50 transition-all"
                />
                <button onClick={sendMessage}
                  className="px-4 py-2.5 rounded-xl bg-[#8AA8FF] text-white hover:bg-[#7B99FF] transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
