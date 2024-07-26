// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  username: string; // Додаємо username
  setIsAuthenticated: (auth: boolean) => void;
  setRole: (role: string) => void;
  setUsername: (username: string) => void; // Додаємо метод для встановлення username
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  username: '',
  setIsAuthenticated: () => {},
  setRole: () => {}, // Ініціалізація для методу setRole
  setUsername: () => {}, // Ініціалізація для методу setUsername
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // Додаємо стан для username

  // Додаємо реалізацію для setRole, навіть якщо він не використовується
  const setRole = (role: string) => {
    // У цьому випадку, можливо, просто не буде нічого робити
    console.log('Role set to:', role);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, setIsAuthenticated, setRole, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
