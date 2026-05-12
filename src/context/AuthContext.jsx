import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simula un login falso (admin/admin)
  const login = (email, password) => {
    if (email === 'admin@inmobiliaria.com' && password === 'admin123') {
      const userData = { email, name: 'Administrador' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Recuperar sesión al recargar
  const checkStoredUser = () => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkStoredUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
