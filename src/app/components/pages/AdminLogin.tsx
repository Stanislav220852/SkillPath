import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import * as API from "../../api";

interface AdminLoginProps {
  onSuccess: (user: any) => void;
  onBack: () => void;
}

export default function AdminLogin({ onSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await API.login(email, password);
      if (data.user.role !== "admin") {
        setError("Access denied. Admin account required.");
        API.logout();
        return;
      }
      onSuccess(data.user);
    } catch (err: any) {
      setError(err.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a14] via-[#111128] to-[#0a0a14] px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8AA8FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FF9800]/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(30,30,45,0.9), rgba(15,15,25,0.95))",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(138,168,255,0.05)",
          }}
        >
          {/* Header */}
          <div className="p-8 pb-0 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8AA8FF] to-[#6B8AFF] flex items-center justify-center mx-auto mb-4">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
            <p className="text-white/40 text-sm">Sign in with your admin account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skillpath.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#8AA8FF]/50 focus:ring-1 focus:ring-[#8AA8FF]/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#8AA8FF]/50 focus:ring-1 focus:ring-[#8AA8FF]/20 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #8AA8FF, #6B8AFF)",
                boxShadow: "0 4px 20px rgba(138,168,255,0.3)",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2 text-white/30 hover:text-white/50 text-xs transition-colors"
            >
              ← Back to site
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
