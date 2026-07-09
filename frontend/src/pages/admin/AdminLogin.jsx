import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dna, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { admin, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@bionivid.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      nav("/admin", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.detail || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 dna-pattern">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center"><Dna className="w-5 h-5 text-white" /></div>
          <span className="text-2xl font-bold text-green-700 font-display">bionivid</span>
        </Link>
        <h1 className="text-2xl font-bold font-display text-gray-900 text-center">Admin Login</h1>
        <p className="text-sm text-gray-500 text-center mt-1">Sign in to manage content</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Email</label>
            <div className="mt-1 relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Password</label>
            <div className="mt-1 relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input required type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
              <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {err && <div className="text-xs bg-red-50 border border-red-100 text-red-700 rounded-md px-3 py-2">{err}</div>}

          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 rounded-full h-11">{loading ? "Signing in..." : "Sign in"}</Button>
        </form>

        <div className="text-[11px] text-gray-400 mt-6 text-center">Default: admin@bionivid.com / Admin@1234</div>
      </motion.div>
    </div>
  );
}
