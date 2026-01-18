import React, { createContext, useEffect, useState } from "react";
import { setAuthToken } from "../../../common/axios/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);



  const login = (userData, jwtToken, jwtRefreshToken) => {
    setUser(userData);
    setToken(jwtToken);
    setRefreshToken(jwtRefreshToken);

    setAuthToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, setToken, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
