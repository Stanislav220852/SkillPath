import React, { useEffect, useState } from "react";
import * as API from "../../api";

interface AdminBookingsProps {
  onNavigate: (page: string) => void;
}

export default function AdminBookings({ onNavigate }: AdminBookingsProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    API.getAdminBookings()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id: number, status: string) => {
    try { await API.updateAdminBooking(id, status); load(); } catch {}
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-green-500/10 text-green-400";
    if (s === "cancelled") return "bg-red-500/10 text-red-400";
    return "bg-yellow-500/10 text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14]">
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => onNavigate("admin")} className="text-white/40 hover:text-white/60 text-sm">← Back</button>
          <span className="text-white font-bold text-sm">Booking Management</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["all", "pending", "confirmed", "cancelled"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                filter === f ? "bg-[#8AA8FF]/20 text-[#8AA8FF] border border-[#8AA8FF]/30" : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/40 font-medium">User ID</th>
                <th className="text-left p-4 text-white/40 font-medium">Mentor ID</th>
                <th className="text-left p-4 text-white/40 font-medium">Date</th>
                <th className="text-left p-4 text-white/40 font-medium">Time</th>
                <th className="text-left p-4 text-white/40 font-medium">Status</th>
                <th className="text-right p-4 text-white/40 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-white/30">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-white/30">No bookings</td></tr>
              ) : filtered.map((b) => (
                <tr key={b.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="p-4 text-white/50">#{b.user_id}</td>
                  <td className="p-4 text-white/50">#{b.mentor_id}</td>
                  <td className="p-4 text-white/50">{b.date}</td>
                  <td className="p-4 text-white/50">{b.time}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(b.status)}`}>{b.status}</span></td>
                  <td className="p-4 text-right">
                    {b.status === "pending" && (
                      <>
                        <button onClick={() => handleStatus(b.id, "confirmed")} className="text-green-400/60 hover:text-green-400 text-xs mr-3 transition-colors">Confirm</button>
                        <button onClick={() => handleStatus(b.id, "cancelled")} className="text-red-400/60 hover:text-red-400 text-xs transition-colors">Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
