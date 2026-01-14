import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // ✅ Login (store in memory only)
  const login = (userData, jwtToken,jwtRefreshToken) => {
    setUser(userData);
    setToken(jwtToken);
    setRefreshToken(jwtRefreshToken);
  };

  // ✅ Logout (clear memory)
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,setToken,refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}