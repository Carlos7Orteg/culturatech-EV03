/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Drawer() {
    const {isDrawerOpen, setIsDrawerOpen} = useApp();
    const {user, isAdmin, logout} = useAuth();
    const [devNotice, setDevNotice] = useState(null);

    if (!isDrawerOpen)
        return null;

    const closeDrawer = () => setIsDrawerOpen(false);

    const showNotice = (feature) => {
        setDevNotice(`La sección "${feature}" estará disponible en la siguiente versión.`);
        setTimeout(() => setDevNotice(null), 3000);
    };

    const navItem = (to, icon, label) => (
                <NavLink
                    to={to}
                    onClick={closeDrawer}
                    className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-full text-left transition-colors font-medium cursor-pointer
  no-underline ${
                                    isActive ? 'bg-lightazl txt-darkbln font-bold' : 'txt-main hover-bg-crem'
                                    }`
                    }
                    >
                    {({ isActive }) => (
                                        <>
                                        <span
                                            className="material-symbols-outlined text-[22px]"
                                            style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}
                                            >
                                            {icon}
                                        </span>
                                        <span>{label}</span>
                                        </>
                                    )}
                </NavLink>
                );

    return (
            <>
            <div
                onClick={closeDrawer}
                className="fixed inset-0 bg-black/60 z-[100] transition-opacity animate-fadeIn"
                />
            
            <aside className="fixed top-0 left-0 h-full max-h-[100dvh] w-[290px] max-w-[80vw] bg-cremlg shadow-2xl z-
                   [100] flex flex-col border-r border-darkgr-40 animate-slideRight">
                <div className="p-4 flex items-center justify-between border-b border-darkgr-30 h-16 bg-lightsecn flex-
                     shrink-0">
                    <Logo size="sm" showText={true} titleText="CulturaTech Bogotá" />
                    <button
                        onClick={closeDrawer}
                        aria-label="Cerrar menú"
                        className="p-2 rounded-full txt-primary hover-bg-subtle transition-colors cursor-pointer"
                        >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            
                {user ? (
                                    <div className="p-4 bg-crem border-b border-darkgr-20 flex items-center gap-3 flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-darkbln text-white flex items-center justify-center font-
                                             bold text-sm">
                                            {user.nombres ? user.nombres[0].toUpperCase() : 'U'}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="font-display font-semibold text-sm txt-main truncate">
                                                {user.nombres} {user.apellidos}
                                            </span>
                                            <span className="font-label text-xs txt-primary truncate">{user.correo}</span>
                                            {isAdmin && (
                                                                <span className="mt-0.5 inline-block text-[10px] font-bold bg-[#004b74] text-white px-2 py-0.2
                                                                      rounded-md w-max">
                                                                    ADMINISTRADOR
                                                                </span>
                                                            )}
                                        </div>
                                    </div>
                                    ) : (
                            <div className="p-4 bg-crem border-b border-darkgr-20 flex items-center justify-between flex-shrink-0">
                                <span className="text-xs txt-muted font-medium">No has iniciado sesión</span>
                                <Link
                                    to="/login"
                                    onClick={closeDrawer}
                                    className="text-xs font-bold text-[#004b74] hover:underline"
                                    >
                                Iniciar sesión
                                </Link>
                            </div>
                            )}
            
                <nav className="flex-1 overflow-y-auto py-4 px-3 pb-16 flex flex-col gap-1 font-body">
                    {navItem('/', 'home', 'Inicio')}
                    {navItem('/events', 'event', 'Eventos')}
                    {navItem('/favorites', 'bookmark', 'Favoritos')}
                    {navItem('/agenda', 'calendar_today', 'Agenda personal')}
                    {navItem('/notifications', 'notifications', 'Notificaciones')}
            
                    <div className="my-2 border-t border-darkgr-30 mx-2"></div>
            
                    {user && navItem('/perfil', 'manage_accounts', 'Configuración de perfil')}
            
                    {isAdmin && navItem('/admin', 'admin_panel_settings', 'Panel administrativo')}
            
                    <button
                        onClick={() => showNotice('Ajustes')}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-full txt-primary hover-bg-crem
                        hover-txt-darkbl font-medium transition-colors cursor-pointer text-left"
                        >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                            <span>Ajustes</span>
                        </div>
                        <span className="font-label text-[10px] bg-soft txt-primary px-2 py-0.5 rounded-md">
                            Próximamente
                        </span>
                    </button>
            
                    {devNotice && (
                            <div className="mx-2 my-2 p-3 bg-darkbl text-white text-xs font-body rounded-xl animate-fadeIn text-
                                 center shadow-lg">
                                {devNotice}
                            </div>
                                )}
            
                    {user && (
                            <div className="pt-4 mt-2">
                                <button
                                    onClick={() => {
                                                    logout();
                                                    closeDrawer();
                                                }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border br-danger
                                    text-danger hover:bg-red-50 transition-colors font-medium cursor-pointer"
                                    >
                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                    <span>Cerrar sesión</span>
                                </button>
                            </div>
                                )}
                </nav>
            </aside>
            </>
            );
}
