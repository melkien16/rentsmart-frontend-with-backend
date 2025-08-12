import React, { createContext, useContext, useState, useEffect } from "react";
import { users as dummyUsers } from "../dummydata";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem("rentsmart_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Check dummy data for user
    const allUsers = [
      ...dummyUsers,
      ...JSON.parse(localStorage.getItem("rentsmart_extra_users") || "[]"),
    ];
    const foundUser = allUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    if (!foundUser) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw new Error("Invalid credentials");
    }
    localStorage.setItem("rentsmart_user", JSON.stringify(foundUser));
    setAuthState({
      user: foundUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = async (data) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Check if email already exists in dummy data or extra users
    const allUsers = [
      ...dummyUsers,
      ...JSON.parse(localStorage.getItem("rentsmart_extra_users") || "[]"),
    ];
    if (allUsers.some((u) => u.email === data.email)) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw new Error("Email already exists");
    }
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: "user",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    // Save new user to localStorage (not dummy data)
    const extraUsers = JSON.parse(
      localStorage.getItem("rentsmart_extra_users") || "[]"
    );
    extraUsers.push(newUser);
    localStorage.setItem("rentsmart_extra_users", JSON.stringify(extraUsers));
    localStorage.setItem("rentsmart_user", JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    // Remove current user session
    localStorage.removeItem("rentsmart_user");
    // Optionally, clear extra users if you want to fully reset (not always desired)
    // localStorage.removeItem("rentsmart_extra_users");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};