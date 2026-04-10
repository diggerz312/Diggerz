import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "diggerz_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((userData) => {
    const normalized = {
      provider: userData.provider,
      id: userData.id || userData.sub || userData.name,
      name: userData.name || userData.login || "User",
      email: userData.email || null,
      avatar: userData.avatar || userData.picture || null,
    };
    setUser(normalized);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch { /* ignore */ }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
