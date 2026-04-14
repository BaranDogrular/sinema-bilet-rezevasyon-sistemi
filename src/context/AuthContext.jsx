import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const mockUser = {
  id: 1,
  name: "Ali Yılmaz",
  email: "ali@example.com",
  role: "admin",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email && password) {
      setUser(mockUser);
    }
  };

  const register = (name, email, password) => {
    if (name && email && password) {
      setUser({
        id: 2,
        name,
        email,
        role: "user",
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);