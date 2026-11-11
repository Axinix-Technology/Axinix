import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('axinix_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    // Simulated authentication handshake with audit trail
    const demoUser = {
      id: 'usr_001',
      name: email.split('@')[0] || 'Enterprise Client',
      email: email,
      role: 'Enterprise Admin',
      tenantId: 'tnt_axinix_01',
    };
    setUser(demoUser);
    localStorage.setItem('axinix_auth_user', JSON.stringify(demoUser));
    return demoUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('axinix_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

