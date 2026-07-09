import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { adminLogin, adminMe, TOKEN_KEY } from "../lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (!t) { setLoading(false); return; }
    try {
      const me = await adminMe();
      setAdmin(me);
    } catch (e) {
      localStorage.removeItem(TOKEN_KEY);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { bootstrap(); }, [bootstrap]);

  const login = async (email, password) => {
    const res = await adminLogin(email, password);
    localStorage.setItem(TOKEN_KEY, res.access_token);
    setAdmin(res.admin);
    return res.admin;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  };

  return (
    <AuthCtx.Provider value={{ admin, loading, login, logout }}>{children}</AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
