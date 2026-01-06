import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // Simulate login
    const userData = {
      email,
      name: email.split("@")[0],
      balance: 48352.5,
      avatar: email.split("@")[0].substring(0, 2).toUpperCase(),
    };
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const register = (name, email, password) => {
    // Simulate registration
    const userData = {
      email,
      name,
      balance: 0,
      avatar: name.substring(0, 2).toUpperCase(),
    };
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
