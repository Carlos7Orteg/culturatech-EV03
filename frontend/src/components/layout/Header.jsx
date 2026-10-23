/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import { useApp } from '../../context/AppContext';

export default function Header( { showBack = false, title = 'Cultura Bogotá', backHref = null }) {
    const location = useLocation();
    const {unreadNotificationsCount, setIsDrawerOpen, setIsSearchModalOpen} = useApp();
    const isNotifActive = location.pathname === '/notifications';

    return (
            <header className="w-full top-0 sticky z-40 bg-cremlg shadow-sm border-b border-darkgr-30 h-16 transition-
                    colors duration-200">
                <div className="flex items-center justify-between px-4 md:px-10 h-full w-full max-w-[1280px] mx-auto">
                    {showBack ? (
                                    <Link
                                        to={backHref || -1}
                                        aria-label="Regresar"
                                        className="p-2 -ml-2 rounded-full txt-main hover-bg-subtle transition-colors flex items-center
                                        justify-center cursor-pointer"
                                        >
                                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                                    </Link>
                                        ) : (
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                aria-label="Abrir menú"
                                className="p-2 -ml-2 rounded-full txt-darkbl hover-bg-subtle transition-colors flex items-center
                                justify-center cursor-pointer"
                                >
                                <span className="material-symbols-outlined text-[24px]">menu</span>
                            </button>
                                )}
            
                    <Link to="/" className="flex items-center gap-2 cursor-pointer select-none no-underline">
                    <Logo size="sm" showText={true} titleText="CulturaTech Bogotá" />
                    </Link>
            
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsSearchModalOpen(true)}
                            aria-label="Buscar eventos"
                            className="p-2 rounded-full txt-darkbl hover-bg-subtle transition-colors flex items-center justify-
                            center cursor-pointer"
                            >
                            <span className="material-symbols-outlined text-[22px]">search</span>
                        </button>
            
                        <Link
                            to="/notifications"
                            aria-label="Notificaciones"
                            className={`p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer
  relative no-underline ${
                                        isNotifActive ? 'bg-lightazl txt-darkbln' : 'txt-darkbl hover-bg-subtle'
                                        }`}
                            >
                        <span
                            className="material-symbols-outlined text-[22px]"
                            style={{fontVariationSettings: isNotifActive ? "'FILL' 1" : "'FILL' 0"}}
                            >
                            notifications
                        </span>
                        {unreadNotificationsCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-
                                  white"></span>
                                    )}
                        </Link>
                    </div>
                </div>
            </header>
            );
}