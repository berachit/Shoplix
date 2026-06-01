import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const readStoredAuth = () => {
  try {
    const storedToken = localStorage.getItem("shoplix_token");
    const storedUser = localStorage.getItem("shoplix_user");

    if (storedToken && storedUser) {
      return {
        token: storedToken,
        user: JSON.parse(storedUser),
      };
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem("shoplix_token");
    localStorage.removeItem("shoplix_user");
  }

  return { token: null, user: null };
};

export function AuthProvider({ children }) {
  const [storedAuth] = useState(readStoredAuth);
  const [user, setUser] = useState(storedAuth.user);
  const [token, setToken] = useState(storedAuth.token);
  const loading = false;

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("shoplix_token");
    localStorage.removeItem("shoplix_user");
  };

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("shoplix_token", authToken);
    localStorage.setItem("shoplix_user", JSON.stringify(userData));
  };

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, isAdmin, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
