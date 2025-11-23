import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [authTokens, setAuthTokens] = useState(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    return access && refresh ? { access, refresh } : null;
  });

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/", {
        username,
        password,
      });
      const data = response.data;
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      return true;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    authTokens,
  };

  useEffect(() => {
    if (authTokens) {
      try {
        const decoded = jwtDecode(authTokens.access);
        setUser(decoded);
      } catch {
        logoutUser();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
