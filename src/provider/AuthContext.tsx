"use client";
import React, { createContext, useContext, useState } from "react";

type Role = "admin" | "pembeli" | null;

const AuthContext = createContext<{
  role: Role;
  setRole: (role: Role) => void;
}>({
  role: null,
  setRole: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);