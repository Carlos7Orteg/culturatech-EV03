/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { createContext, useContext, useState, useEffect } from 'react';
    import { authService } from '../api/auth.service';

    const AuthContext = createContext(null);

    export function AuthProvider({ children }) {
      const [user, setUser] = useState(() => {
        try {
          const stored = localStorage.getItem('culturatech_user');
          return stored ? JSON.parse(stored) : null;
        } catch {
          return null;
        }
      });

      const [loading, setLoading] = useState(false);

      // Guarda o elimina el usuario en localStorage al cambiar el estado
      useEffect(() => {
        if (user) {
          localStorage.setItem('culturatech_user', JSON.stringify(user));
        } else {
          localStorage.removeItem('culturatech_user');
        }
      }, [user]);

      const login = async (credentials) => {
        setLoading(true);
        try {
          const res = await authService.login(credentials);
          if (res && res.ok && res.usuario) {
            setUser(res.usuario);
            return { ok: true, usuario: res.usuario };
          }
          return { ok: false, mensaje: res.mensaje || 'Credenciales incorrectas' };
        } catch (err) {
          return { ok: false, mensaje: err.message };
        } finally {
          setLoading(false);
        }
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('culturatech_user');
      };

      const updateUser = (updatedFields) => {
        setUser((prev) => {
          const updated = { ...prev, ...updatedFields };
          localStorage.setItem('culturatech_user', JSON.stringify(updated));
          return updated;
        });
      };

      const isAdmin = String(user?.rol || '').toUpperCase() === 'ADMIN';

      return (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated: !!user,
            isAdmin,
            loading,
            login,
            logout,
            updateUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
    }

    export function useAuth() {
      const context = useContext(AuthContext);
      if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
      return context;
    }