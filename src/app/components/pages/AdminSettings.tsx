import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import * as API from "../../api";

interface AdminSettingsProps {
  onNavigate: (page: string) => void;
}

type Tab = "general" | "appearance" | "sections";

const DEFAULT_SETTINGS: Record<string, any> = {
  general: { site_title: "SkillPath", site_description: "IT Academy", contact_email: "hello@skillpath.com", phone: "+375 (25) 517-21-37", telegram: "t.me/Fordmash" },
  appearance: { default_theme: "purple", accent_color: "#8AA8FF" },
  sections: { roadmaps: true, mentors: true, quiz: true, pricing: true, testimonials: true, faq: true },
};

export default function AdminSettings({ onNavigate }: AdminSettingsProps) {
  const [tab, setTab] = useState<Tab>("general");
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    API.getAdminSettings()
      .then((data) => {
        const map: any = {};
        data.forEach((s: any) => { map[s.key] = s.value; });
        setSettings({ ...DEFAULT_SETTINGS, ...map });
      })
      .catch(() => setSettings(DEFAULT_SETTINGS))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) => API.updateAdminSettings(key, value))
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, field: string, value: any) => {
    setSettings({ ...settings, [key]: { ...settings[key], [field]: value } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14]">
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate("admin")} className="text-white/40 hover:text-white/60 text-sm">← Back</button>
            <span className="text-white font-bold text-sm">Platform Settings</span>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8AA8FF] text-white text-sm font-medium hover:bg-[#7B99FF] transition-colors disabled:opacity-50">
            <Save size={14} /> {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["general", "appearance", "sections"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                tab === t ? "bg-[#8AA8FF]/20 text-[#8AA8FF] border border-[#8AA8FF]/30" : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-white/30 text-sm">Loading...</div>
        ) : (
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {tab === "general" && (
              <div className="space-y-4">
                {[
                  ["Site Title", "site_title"], ["Site Description", "site_description"],
                  ["Contact Email", "contact_email"], ["Phone", "phone"], ["Telegram", "telegram"],
                ].map(([label, key]) => (
                  <div key={key}>
                    <label className="block text-white/40 text-xs mb-1">{label}</label>
                    <input value={settings.general?.[key] || ""} onChange={(e) => updateField("general", key, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8AA8FF]/50 transition-all" />
                  </div>
                ))}
              </div>
            )}

            {tab === "appearance" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-white/40 text-xs mb-1">Default Theme</label>
                  <select value={settings.appearance?.default_theme || "purple"}
                    onChange={(e) => updateField("appearance", "default_theme", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="mono">Mono</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-1">Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={settings.appearance?.accent_color || "#8AA8FF"}
                      onChange={(e) => updateField("appearance", "accent_color", e.target.value)}
                      className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer" />
                    <span className="text-white/50 text-sm">{settings.appearance?.accent_color}</span>
                  </div>
                </div>
              </div>
            )}

            {tab === "sections" && (
              <div className="space-y-3">
                {Object.entries(settings.sections || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                    <span className="text-white text-sm capitalize">{key}</span>
                    <button onClick={() => updateField("sections", key, !value)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${value ? "bg-[#8AA8FF]" : "bg-white/10"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
