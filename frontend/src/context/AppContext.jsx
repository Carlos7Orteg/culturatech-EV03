/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { eventsService } from '../api/events.service';
import { normalizeEvent } from '../utils/eventNormalizer';

const AppContext = createContext(null);

export function AppProvider( { children }) {
    // Favoritos
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem('culturatech_favorites');
            const parsed = stored ? JSON.parse(stored) : [6, 5, 8];

            return Array.isArray(parsed)
                ? parsed.map(Number).filter(id => Number.isFinite(id) && id > 0)
                : [6, 5, 8];
        } catch {
            return [6, 5, 8];
        }
    });

    // Agenda personal
    const [agenda, setAgenda] = useState(() => {
        try {
            const stored = localStorage.getItem('culturatech_agenda');
            const parsed = stored ? JSON.parse(stored) : [];

            if (!Array.isArray(parsed)) return [];

            const today = new Date().toISOString().slice(0, 10);

            return parsed.map(item => {
                const rawId =
                    item && typeof item === 'object'
                        ? item.eventId ?? item.id
                        : item;

                const id = Number(rawId);

                if (!Number.isFinite(id) || id <= 0) return null;

                if (item && typeof item === 'object') {
                    return {
                        ...item,
                        eventId: id,
                        addedAt: item.addedAt ?? today,
                        dateBadge: item.dateBadge ?? 'Programado',
                        note: item.note ?? ''
                    };
                }

                return {
                    eventId: id,
                    addedAt: today,
                    dateBadge: 'Programado',
                    note: ''
                };
            }).filter(Boolean);
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
                .then((data) =>
                    setEvents(
                            Array.isArray(data) ? data.map(normalizeEvent) : []
                    )
                )
                .catch(() => setEvents([]));
    }, []);

    const isFavorite = (eventId) =>
        favorites.some(id => Number(id) === Number(eventId));

    const toggleFavorite = (eventId) => {
        const id = Number(eventId);

        if (!Number.isFinite(id) || id <= 0) return;

        setFavorites(prev =>
            prev.some(value => Number(value) === id)
                ? prev.filter(value => Number(value) !== id)
                : [...prev, id]
        );
    };

    const isInAgenda = (eventId) =>
        agenda.some(item => Number(item.eventId) === Number(eventId));

    const toggleAgenda = (eventId) => {
        const id = Number(eventId);
 
        if (!Number.isFinite(id) || id <= 0) return;

        setAgenda(prev => {
            const exists = prev.some(
                item => Number(item.eventId) === id
            );

            if (exists) {
                return prev.filter(
                    item => Number(item.eventId) !== id
                );
            }

            return [
                ...prev,
                {
                    eventId: id,
                    addedAt: new Date().toISOString().slice(0, 10),
                    dateBadge: 'Programado',
                    note: ''
                }
            ];
        });
    };

    const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

    return (
            <AppContext.Provider
                value={{
                                favorites,
                                toggleFavorite,
                                agenda,
                                toggleAgenda,
                                isFavorite,
                                isInAgenda,
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