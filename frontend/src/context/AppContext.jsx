/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { eventsService } from '../api/events.service';

const AppContext = createContext(null);

export function AppProvider( { children }) {
    // Favoritos
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem('culturatech_favorites');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Agenda personal
    const [agenda, setAgenda] = useState(() => {
        try {
            const stored = localStorage.getItem('culturatech_agenda');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Notificaciones
    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem('culturatech_notifications');
            return stored
                    ? JSON.parse(stored)
                    : [
                        {id: 1, title: '¡Bienvenido a CulturaTech!', read: false},
                        {id: 2, title: 'Agenda cultural actualizada este mes', read: false},
                    ];
        } catch {
            return [];
        }
    });

    // Catálogo de eventos precargado en memoria (para el SearchModal rápido)
    const [events, setEvents] = useState([]);

    // Estados visuales del Cascarón
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('culturatech_favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('culturatech_agenda', JSON.stringify(agenda));
    }, [agenda]);

    useEffect(() => {
        localStorage.setItem('culturatech_notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Carga inicial de eventos para búsqueda global
    useEffect(() => {
        eventsService
                .getAll()
                .then((data) => setEvents(Array.isArray(data) ? data : []))
                .catch(() => setEvents([]));
    }, []);

    const toggleFavorite = (eventId) => {
        setFavorites((prev) =>
            prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
        );
    };

    const toggleAgenda = (eventId) => {
        setAgenda((prev) =>
            prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
        );
    };

    const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

    return (
            <AppContext.Provider
                value={{
                                favorites,
                                toggleFavorite,
                                agenda,
                                toggleAgenda,
                                notifications,
                                unreadNotificationsCount,
                                events,
                                isDrawerOpen,
                                setIsDrawerOpen,
                                isSearchModalOpen,
                                setIsSearchModalOpen,
                            }}
                >
                {children}
            </AppContext.Provider>
            );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context)
        throw new Error('useApp debe ser usado dentro de un AppProvider');
    return context;
}