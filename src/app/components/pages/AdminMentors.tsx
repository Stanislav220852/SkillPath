import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import * as API from "../../api";

interface AdminMentorsProps {
  onNavigate: (page: string) => void;
}

const CATEGORIES = ["frontend", "ai", "cybersec", "datascience", "backend", "mobile", "devops", "gamedev"];

export default function AdminMentors({ onNavigate }: AdminMentorsProps) {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", role_title: "", company: "", category: "frontend",
    experience: "", price_per_hour: 100, rating: 5.0, bio: "",
    skills: "", languages: "",
  });

  const load = () => {
    setLoading(true);
    API.getAdminMentors()
      .then(setMentors)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: "", role_title: "", company: "", category: "frontend", experience: "", price_per_hour: 100, rating: 5.0, bio: "", skills: "", languages: "" });
    setShowForm(true);
  };

  const openEdit = (m: any) => {
    setEditingId(m.id);
    setForm({
      name: m.name, role_title: m.role_title, company: m.company || "",
      category: m.category, experience: m.experience || "",
      price_per_hour: m.price_per_hour, rating: m.rating, bio: m.bio || "",
      skills: (m.skills || []).join(", "), languages: (m.languages || []).join(", "),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await API.updateAdminMentor(editingId, data);
      } else {
        await API.createAdminMentor(data);
      }
      setShowForm(false);
      load();
    } catch {}
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this mentor?")) return;
    try { await API.deleteAdminMentor(id); load(); } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14]">
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate("admin")} className="text-white/40 hover:text-white/60 text-sm">← Back</button>
            <span className="text-white font-bold text-sm">Mentor Management</span>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8AA8FF]/20 text-[#8AA8FF] text-sm font-medium hover:bg-[#8AA8FF]/30 transition-colors">
            <Plus size={14} /> Add Mentor
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleSubmit}
              className="w-full max-w-lg mx-4 rounded-2xl p-6"
              style={{ background: "rgba(20,20,35,0.95)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{editingId ? "Edit Mentor" : "Add Mentor"}</h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-white/30 hover:text-white/60"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  ["Name", "name", "text"], ["Role Title", "role_title", "text"], ["Company", "company", "text"],
                  ["Experience", "experience", "text"], ["Price/Hour", "price_per_hour", "number"], ["Rating", "rating", "number"],
                ] as [string, string, string][]).map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-white/40 text-xs mb-1">{label}</label>
                    <input type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8AA8FF]/50" />
                  </div>
                ))}
                <div>
                  <label className="block text-white/40 text-xs mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-white/40 text-xs mb-1">Skills (comma-separated)</label>
                <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none" placeholder="React, TypeScript, Node.js" />
              </div>
              <div className="mt-3">
                <label className="block text-white/40 text-xs mb-1">Languages (comma-separated)</label>
                <input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none" placeholder="Russian, English" />
              </div>
              <div className="mt-3">
                <label className="block text-white/40 text-xs mb-1">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none resize-none" />
              </div>
              <button type="submit" className="w-full mt-4 py-2.5 rounded-xl bg-[#8AA8FF] text-white font-medium text-sm hover:bg-[#7B99FF] transition-colors">
                {editingId ? "Save Changes" : "Create Mentor"}
              </button>
            </motion.form>
          </div>
        )}

        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/40 font-medium">Name</th>
                <th className="text-left p-4 text-white/40 font-medium">Category</th>
                <th className="text-left p-4 text-white/40 font-medium">Company</th>
                <th className="text-left p-4 text-white/40 font-medium">Rating</th>
                <th className="text-left p-4 text-white/40 font-medium">Price</th>
                <th className="text-left p-4 text-white/40 font-medium">Status</th>
                <th className="text-right p-4 text-white/40 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-white/30">Loading...</td></tr>
              ) : mentors.map((m) => (
                <tr key={m.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="p-4 text-white">{m.name}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-full bg-[#8AA8FF]/10 text-[#8AA8FF] text-xs">{m.category}</span></td>
                  <td className="p-4 text-white/50">{m.company || "—"}</td>
                  <td className="p-4 text-white/50">{m.rating}</td>
                  <td className="p-4 text-white/50">${m.price_per_hour}/h</td>
                  <td className="p-4"><span className={`w-2 h-2 rounded-full inline-block ${m.is_active ? "bg-green-400" : "bg-red-400"}`} /></td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(m)} className="text-white/30 hover:text-[#8AA8FF] mr-3 transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(m.id)} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
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
