/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verifica la sesión real con Spring Boot al iniciar.
    useEffect(() => {
        let mounted = true;

        const verificarSesion = async () => {
            try {
                const usuario = await authService.getPerfil();

                if (mounted) {
                    setUser(usuario);
                }
            } catch (error) {
                if (mounted) {
                    setUser(null);
                    localStorage.removeItem('culturatech_user');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        verificarSesion();

        return () => {
            mounted = false;
        };
    }, []);

    // Persiste el usuario después de verificar la sesión.
    useEffect(() => {
        if (loading) return;

        if (user) {
            localStorage.setItem('culturatech_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('culturatech_user');
        }
    }, [user, loading]);

    const login = async (credentials) => {
        setLoading(true);

        try {
            const res = await authService.login(credentials);

            if (res && res.ok && res.usuario) {
                setUser(res.usuario);
                return { ok: true, usuario: res.usuario };
            }

            return {
                ok: false,
                mensaje: res?.mensaje || 'Credenciales incorrectas'
            };
        } catch (err) {
            return { ok: false, mensaje: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error(
                'No se pudo confirmar el cierre de sesión en el servidor:',
                error.message
            );
        } finally {
            setUser(null);
            localStorage.removeItem('culturatech_user');
        }
    };

    const updateUser = (updatedFields) => {
        setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, ...updatedFields };
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
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }

    return context;
}
