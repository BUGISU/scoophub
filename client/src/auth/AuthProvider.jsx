import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  async function refreshMe() {
    const t = localStorage.getItem("accessToken");
    if (!t) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await apiGet("/auth/me"); // 자동 토큰
      setUser(data.user);
    } catch (e) {
      localStorage.removeItem("accessToken");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const data = await apiPost(
      "/auth/login",
      { email, password },
      { useAuth: false }
    );
    localStorage.setItem("accessToken", data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
    setLoading(false);
  }

  useEffect(() => {
    if (token) refreshMe();
    else setLoading(false);
  }, [token]);

  const value = useMemo(
    () => ({ token, user, loading, login, logout, refreshMe }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
