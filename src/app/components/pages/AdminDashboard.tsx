import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, MessageSquare, Calendar, Settings, BarChart3 } from "lucide-react";
import * as API from "../../api";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getAdminDashboard()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Users", value: stats?.users_count ?? 0, icon: Users, color: "#8AA8FF", page: "admin-users" },
    { label: "Mentors", value: stats?.mentors_count ?? 0, icon: GraduationCap, color: "#FF9800", page: "admin-mentors" },
    { label: "Bookings", value: stats?.bookings_count ?? 0, icon: Calendar, color: "#4CAF50", page: "admin-bookings" },
    { label: "Active Bookings", value: stats?.active_bookings_count ?? 0, icon: MessageSquare, color: "#FF6B9D", page: "admin-bookings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8AA8FF] to-[#6B8AFF] flex items-center justify-center">
              <BarChart3 size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate("home")} className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Back to Site
            </button>
            <button onClick={onLogout} className="text-red-400/60 hover:text-red-400 text-xs transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Nav tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { label: "Dashboard", page: "admin" },
            { label: "Users", page: "admin-users" },
            { label: "Mentors", page: "admin-mentors" },
            { label: "Bookings", page: "admin-bookings" },
            { label: "Settings", page: "admin-settings" },
          ].map((tab) => (
            <button
              key={tab.page}
              onClick={() => onNavigate(tab.page)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab.page === "admin"
                  ? "bg-[#8AA8FF]/20 text-[#8AA8FF] border border-[#8AA8FF]/30"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <motion.button
              key={card.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(card.page)}
              className="p-6 rounded-2xl text-left transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <card.icon size={20} style={{ color: card.color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{loading ? "—" : card.value}</div>
              <div className="text-white/40 text-sm">{card.label}</div>
            </motion.button>
          ))}
        </div>

        {/* Recent users */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-white font-semibold mb-4">Recent Users</h3>
          {loading ? (
            <div className="text-white/30 text-sm">Loading...</div>
          ) : (
            <div className="space-y-3">
              {stats?.recent_users?.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                  <div>
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-white/30 text-xs">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-red-500/10 text-red-400" :
                      user.role === "mentor" ? "bg-orange-500/10 text-orange-400" :
                      "bg-white/5 text-white/40"
                    }`}>
                      {user.role}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${user.is_active ? "bg-green-400" : "bg-red-400"}`} />
                  </div>
                </div>
              ))}
              {(!stats?.recent_users || stats.recent_users.length === 0) && (
                <div className="text-white/20 text-sm text-center py-4">No users yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
