/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { NavLink } from 'react-router-dom';
    import Logo from '../common/Logo';
    import { useApp } from '../../context/AppContext';

    export default function Footer() {
      const { unreadNotificationsCount, favorites, agenda } = useApp();

      const navItems = [
        { to: '/', label: 'Inicio', icon: 'home', badge: 0 },
        { to: '/events', label: 'Explorar', icon: 'explore', badge: 0 },
        { to: '/agenda', label: 'Mi Agenda', icon: 'calendar_today', badge: agenda.length },
        { to: '/favorites', label: 'Favoritos', icon: 'favorite', badge: favorites.length },
        { to: '/notifications', label: 'Avisos', icon: 'notifications', badge: unreadNotificationsCount },
      ];

      const getDesktopClass = (isActive) => {
        const base = [
          'relative',
          'flex',
          'items-center',
          'gap-2',
          'px-3',
          'py-2',
          'rounded-xl',
          'text-xs',
          'font-label',
          'no-underline',
          'cursor-pointer',
          'select-none',
          'transition-all'
        ].join(' ');
        const active = 'bg-[#8e4e14] text-white font-bold shadow-sm';
        const normal = 'txt-darkgr hover:text-white hover:bg-white/10';
        return base + ' ' + (isActive ? active : normal);
      };

      const badgeClass = [
        'ml-0.5',
        'px-1.5',
        'py-0.2',
        'bg-warning',
        'text-white',
        'text-[10px]',
        'font-bold',
        'rounded-full'
      ].join(' ');

      return (
        <footer className="w-full bg-[#0d1b2a] txt-cremlg mt-auto relative overflow-hidden pb-20 md:pb-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2d8aca]/10 rounded-full blur-3xl pointer-events-
  none" />

          {/* Versión Móvil */}
          <div className="block md:hidden bg-[#122438] border-t border-white/10 px-6 py-8 relative z-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <Logo size="md" variant="dark" titleText="CulturaTech Bogotá" showText={true} />
              <div className="flex items-center justify-center gap-4 font-label text-xs txt-darkgr mt-1">
                <span className="hover:text-white cursor-pointer">Términos</span>
                <span className="opacity-30">•</span>
                <span className="hover:text-white cursor-pointer">Privacidad</span>
                <span className="opacity-30">•</span>
                <span className="hover:text-white cursor-pointer">Soporte</span>
              </div>
              <p className="font-label text-xs txt-darkgr-80 mt-1">
                © 2026 CulturaTech Bogotá. Todos los derechos reservados.
              </p>
            </div>
          </div>

          {/* Versión Escritorio / Tablet */}
          <div className="hidden md:block py-10 px-6 lg:px-10 border-t border-white/10 relative z-10 max-w-[1280px]
  mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6">
              <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                <Logo size="sm" variant="dark" titleText="CulturaTech Bogotá" showText={true} />
                <p className="font-label text-xs txt-darkgr max-w-xs lg:max-w-md mt-1">
                  Conectando el arte, el patrimonio y la agenda cultural de la capital.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#142638] p-2 rounded-2xl border border-white/10 shadow-lg">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => getDesktopClass(isActive)}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className={badgeClass}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-3 font-label text-xs txt-darkgr">
                  <span className="hover:text-white cursor-pointer">Términos</span>
                  <span className="opacity-30">•</span>
                  <span className="hover:text-white cursor-pointer">Privacidad</span>
                  <span className="opacity-30">•</span>
                  <span className="hover:text-white cursor-pointer">Soporte</span>
                </div>
                <p className="font-label text-[11px] txt-darkgr-70">
                  © 2026 CulturaTech Bogotá. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      );
    }