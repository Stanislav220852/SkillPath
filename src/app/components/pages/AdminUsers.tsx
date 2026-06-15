import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, UserX, UserCheck, Eye, X, Calendar, BookOpen, Trophy } from "lucide-react";
import * as API from "../../api";

interface AdminUsersProps {
  onNavigate: (page: string) => void;
}

export default function AdminUsers({ onNavigate }: AdminUsersProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewUser, setViewUser] = useState<any>(null);
  const [viewUserData, setViewUserData] = useState<any>(null);
  const [viewLoading, setViewLoading] = useState(false);

  const load = (p = page, s = search) => {
    setLoading(true);
    API.getAdminUsers(s, p)
      .then((d) => { setUsers(d.users); setTotal(d.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(1, ""); }, []);

  const handleSearch = () => { setPage(1); load(1, search); };

  const handleRoleChange = async (userId: number, role: string) => {
    try { await API.updateAdminUser(userId, { role }); load(); } catch {}
  };

  const handleToggleActive = async (userId: number, isActive: boolean) => {
    try { await API.updateAdminUser(userId, { is_active: !isActive }); load(); } catch {}
  };

  const handleDelete = async (userId: number) => {
    if (!confirm("Deactivate this user?")) return;
    try { await API.deleteAdminUser(userId); load(); } catch {}
  };

  const handlePermanentDelete = async (userId: number) => {
    if (!confirm("PERMANENTLY delete this user? This cannot be undone!")) return;
    try { await API.hardDeleteAdminUser(userId); load(); } catch {}
  };

  const viewDetails = async (user: any) => {
    setViewUser(user);
    setViewLoading(true);
    try {
      const [quiz, bookings, stats] = await Promise.allSettled([
        API.getAdminUserQuizHistory(user.id),
        API.getAdminUserBookings(user.id),
        API.getAdminUserStats(user.id),
      ]);
      setViewUserData({
        quizzes: quiz.status === "fulfilled" ? quiz.value : [],
        bookings: bookings.status === "fulfilled" ? bookings.value : [],
        stats: stats.status === "fulfilled" ? stats.value : null,
      });
    } catch {}
    setViewLoading(false);
  };

  const pages = Math.ceil(total / 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14]">
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => onNavigate("admin")} className="text-white/40 hover:text-white text-sm transition-colors cursor-pointer">
            ← Back
          </button>
          <span className="text-white font-bold text-sm">User Management</span>
          <span className="text-white/30 text-xs">({total} total)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#8AA8FF]/50 transition-all"
            />
          </div>
          <button onClick={handleSearch} className="px-5 py-2.5 rounded-xl bg-[#8AA8FF]/20 text-[#8AA8FF] text-sm font-medium hover:bg-[#8AA8FF]/30 transition-colors cursor-pointer">
            Search
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-white/40 font-medium">Name</th>
                  <th className="text-left p-4 text-white/40 font-medium">Email</th>
                  <th className="text-left p-4 text-white/40 font-medium">Role</th>
                  <th className="text-left p-4 text-white/40 font-medium">Status</th>
                  <th className="text-left p-4 text-white/40 font-medium">Joined</th>
                  <th className="text-right p-4 text-white/40 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-white/30">Loading...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-white/30">No users found</td></tr>
                ) : users.map((user) => (
                  <tr key={user.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8AA8FF]/10 flex items-center justify-center text-[#8AA8FF] text-xs font-bold">
                          {user.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <span className="text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/50">{user.email}</td>
                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none cursor-pointer"
                      >
                        <option value="user">User</option>
                        <option value="mentor">Mentor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleToggleActive(user.id, user.is_active)} className="cursor-pointer">
                        {user.is_active ? (
                          <span className="flex items-center gap-1 text-green-400 text-xs"><UserCheck size={12} /> Active</span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-400 text-xs"><UserX size={12} /> Banned</span>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-white/30 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => viewDetails(user)}
                          className="px-2.5 py-1 rounded-lg bg-[#8AA8FF]/10 text-[#8AA8FF] text-xs hover:bg-[#8AA8FF]/20 transition-colors cursor-pointer flex items-center gap-1">
                          <Eye size={12} /> View
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-xs hover:bg-orange-500/20 transition-colors cursor-pointer">
                          Ban
                        </button>
                        <button onClick={() => handlePermanentDelete(user.id)} className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-white/5">
              <span className="text-white/30 text-xs">{total} users total</span>
              <div className="flex items-center gap-2">
                <button disabled={page <= 1} onClick={() => { setPage(page - 1); load(page - 1); }}
                  className="p-1 rounded-lg text-white/30 hover:text-white/60 disabled:opacity-30 transition-colors cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-white/40 text-xs">Page {page} of {pages}</span>
                <button disabled={page >= pages} onClick={() => { setPage(page + 1); load(page + 1); }}
                  className="p-1 rounded-lg text-white/30 hover:text-white/60 disabled:opacity-30 transition-colors cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {viewUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => { setViewUser(null); setViewUserData(null); }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
              style={{ background: "rgba(15,15,25,0.95)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-white/5"
                style={{ background: "rgba(15,15,25,0.98)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8AA8FF] to-[#FF9800] flex items-center justify-center text-white text-lg font-bold">
                    {viewUser.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{viewUser.name}</h3>
                    <p className="text-white/40 text-xs">{viewUser.email}</p>
                  </div>
                </div>
                <button onClick={() => { setViewUser(null); setViewUserData(null); }}
                  className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* User Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-white/30 text-xs mb-1">Role</div>
                    <div className={`text-sm font-medium ${viewUser.role === "admin" ? "text-red-400" : viewUser.role === "mentor" ? "text-orange-400" : "text-white"}`}>
                      {viewUser.role}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-white/30 text-xs mb-1">Status</div>
                    <div className={`text-sm font-medium ${viewUser.is_active ? "text-green-400" : "text-red-400"}`}>
                      {viewUser.is_active ? "Active" : "Banned"}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-white/30 text-xs mb-1">Joined</div>
                    <div className="text-white text-sm">{new Date(viewUser.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-white/30 text-xs mb-1">User ID</div>
                    <div className="text-white text-sm">#{viewUser.id}</div>
                  </div>
                </div>

                {viewLoading ? (
                  <div className="text-center py-8 text-white/30 text-sm">Loading user data...</div>
                ) : viewUserData ? (
                  <>
                    {/* Stats */}
                    {viewUserData.stats && (
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "Quizzes", value: viewUserData.stats.total_quizzes || 0, icon: Trophy, color: "#FF9800" },
                          { label: "Bookings", value: viewUserData.stats.total_bookings || 0, icon: Calendar, color: "#8AA8FF" },
                          { label: "Skills", value: viewUserData.stats.total_roadmap_skills_completed || 0, icon: BookOpen, color: "#4CAF50" },
                          { label: "Lessons", value: viewUserData.stats.total_lessons_completed || 0, icon: BookOpen, color: "#FF6B9D" },
                        ].map((s) => (
                          <div key={s.label} className="p-3 rounded-xl bg-white/[0.03] text-center">
                            <s.icon size={16} className="mx-auto mb-1" style={{ color: s.color }} />
                            <div className="text-white font-bold text-lg">{s.value}</div>
                            <div className="text-white/30 text-xs">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quiz History */}
                    {viewUserData.quizzes?.length > 0 && (
                      <div>
                        <h4 className="text-white/60 text-xs font-medium mb-2 flex items-center gap-1.5">
                          <Trophy size={12} /> Quiz History
                        </h4>
                        <div className="space-y-1.5">
                          {viewUserData.quizzes.slice(0, 5).map((q: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                              <div>
                                <span className="text-white text-xs font-medium">{q.top_role}</span>
                                <span className="text-white/30 text-xs ml-2">({q.quiz_type})</span>
                              </div>
                              <span className="text-white/30 text-xs">{new Date(q.created_at).toLocaleDateString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bookings */}
                    {viewUserData.bookings?.length > 0 && (
                      <div>
                        <h4 className="text-white/60 text-xs font-medium mb-2 flex items-center gap-1.5">
                          <Calendar size={12} /> Bookings
                        </h4>
                        <div className="space-y-1.5">
                          {viewUserData.bookings.slice(0, 5).map((b: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                              <div className="flex items-center gap-2">
                                <span className="text-white text-xs">Mentor #{b.mentor_id}</span>
                                <span className="text-white/30 text-xs">{b.date} {b.time}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                b.status === "confirmed" ? "bg-green-500/10 text-green-400" :
                                b.status === "cancelled" ? "bg-red-500/10 text-red-400" :
                                "bg-yellow-500/10 text-yellow-400"
                              }`}>{b.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(!viewUserData.quizzes || viewUserData.quizzes.length === 0) && (!viewUserData.bookings || viewUserData.bookings.length === 0) && (
                      <div className="text-center py-6 text-white/20 text-sm">No activity data yet</div>
                    )}
                  </>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
