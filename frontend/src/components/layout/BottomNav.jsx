/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
    const location = useLocation();
    const {unreadNotificationsCount, favorites, agenda} = useApp();

    if (['/login', '/register'].includes(location.pathname)) {
        return null;
    }

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const navItems = [
        {to: '/', label: 'Inicio', icon: 'home', badge: 0},
        {to: '/events', label: 'Explorar', icon: 'explore', badge: 0},
        {to: '/agenda', label: 'Agenda', icon: 'calendar_today', badge: agenda.length},
        {to: '/favorites', label: 'Favoritos', icon: 'favorite', badge: favorites.length},
        {to: '/notifications', label: 'Avisos', icon: 'notifications', badge: unreadNotificationsCount},
    ];

    const getMobileClass = (isActive) => {
        const base = [
            'relative',
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'flex-1',
            'py-1',
            'px-0.5',
            'rounded-xl',
            'transition-all',
            'cursor-pointer',
            'select-none',
            'no-underline'
        ].join(' ');
        const active = 'txt-brand font-bold scale-105';
        const normal = 'txt-darkgr hover:text-white';
        return base + ' ' + (isActive ? active : normal);
    };

    const mobileBadgeClass = [
        'absolute',
        '-top-1',
        '-right-2',
        'bg-warning',
        'text-white',
        'text-[9px]',
        'font-bold',
        'px-1.5',
        'py-0.2',
        'rounded-full',
        'border',
        'border-[#0d1b2a]'
    ].join(' ');

    return (
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1b2a] border-t border-white/10 shadow-lg px-2 py-1
                 md:hidden">
                <div className="flex justify-between items-center max-w-lg mx-auto">
                    {navItems.map((item) => (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            className={({ isActive }) => getMobileClass(isActive)}
                                            >
                                            {({ isActive }) => (
                                                                            <>
                                                                            <div className="relative flex items-center justify-center">
                                                                                <span
                                                                                    className="material-symbols-outlined text-[20px]"
                                                                                    style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}
                                                                                    >
                                                                                    {item.icon}
                                                                                </span>
                                                                                {item.badge > 0 && (
                                                                                                                    <span className={mobileBadgeClass}>
                                                                                                                        {item.badge > 9 ? '9+' : item.badge}
                                                                                                                    </span>
                                                                                                        )}
                                                                            </div>
                                                                            <span className="font-label text-[10px] mt-0.5 tracking-tight leading-none text-center">
                                                                                {item.label}
                                                                            </span>
                                                                            </>
                                                                    )}
                                        </NavLink>
                                            ))}
            
                    <button
                        onClick={scrollToTop}
                        title="Subir al inicio"
                        className="relative flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-xl transition-
                        all cursor-pointer select-none txt-darkgr hover:text-white"
                        >
                        <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                        <span className="font-label text-[10px] mt-0.5 tracking-tight leading-none text-center">
                            Arriba
                        </span>
                    </button>
                </div>
            </nav>
            );
}