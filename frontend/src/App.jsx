import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';

function HomePlaceholder() {
    const {favorites, toggleFavorite, agenda, toggleAgenda, setIsSearchModalOpen} = useApp();

    return (
            <div className="flex flex-col gap-6 py-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-darkgr-30 flex flex-col md:flex-row
                     items-center justify-between gap-6">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <span className="bg-brand/20 text-[#8e4e14] px-3 py-1 rounded-full text-xs font-bold w-max mx-auto
                              md:mx-0">
                            Etapa 3 Activa: UI Shell & Contextos
                        </span>
                        <h1 className="text-3xl font-bold txt-darkbl">Cascarón de Navegación Funcional</h1>
                        <p className="txt-muted text-sm max-w-xl">
                            Prueba la apertura del Menú Lateral (Drawer), el Buscador Modal (con autocompletado en memoria), y la
                            reactividad de los contadores en la barra inferior móvil y en el encabezado.
                        </p>
                    </div>
            
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => setIsSearchModalOpen(true)}
                            className="cursor-pointer bg-[#004b74] hover:bg-[#0d1b2a] text-white px-4 py-2.5 rounded-xl font-
                            medium text-xs flex items-center gap-2 shadow-sm transition-all"
                            >
                            <span className="material-symbols-outlined text-base">search</span>
                            <span>Abrir Buscador</span>
                        </button>
            
                        <button
                            onClick={() => toggleFavorite('demo-1')}
                            className={`cursor-pointer px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 border
  transition-all ${
                                        favorites.includes('demo-1')
                                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                                        : 'bg-white border-darkgr-40 txt-darkbl hover:bg-slate-50'
                                        }`}
                            >
                            <span className="material-symbols-outlined text-base">favorite</span>
                            <span>{favorites.includes('demo-1') ? 'Quitar Favorito Demo' : 'Añadir Favorito Demo'}</span>
                        </button>
            
                        <button
                            onClick={() => toggleAgenda('demo-agenda-1')}
                            className={`cursor-pointer px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 border
  transition-all ${
                                        agenda.includes('demo-agenda-1')
                                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                                        : 'bg-white border-darkgr-40 txt-darkbl hover:bg-slate-50'
                                        }`}
                            >
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span>{agenda.includes('demo-agenda-1') ? 'Quitar de Agenda' : 'Añadir a Agenda'}</span>
                        </button>
                    </div>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-darkgr-30 shadow-sm">
                        <div className="flex items-center gap-2 text-rose-600 mb-2">
                            <span className="material-symbols-outlined">bookmark</span>
                            <h3 className="font-bold text-sm">Favoritos Activos</h3>
                        </div>
                        <p className="text-2xl font-bold txt-darkbl">{favorites.length}</p>
                        <p className="text-xs txt-muted mt-1">Sincronizados en Header, Drawer y BottomNav.</p>
                    </div>
            
                    <div className="bg-white p-5 rounded-xl border border-darkgr-30 shadow-sm">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <span className="material-symbols-outlined">event</span>
                            <h3 className="font-bold text-sm">Agenda Personal</h3>
                        </div>
                        <p className="text-2xl font-bold txt-darkbl">{agenda.length}</p>
                        <p className="text-xs txt-muted mt-1">Persistidos en localStorage de manera reactiva.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-darkgr-30 shadow-sm">
                        <div className="flex items-center gap-2 text-amber-600 mb-2">
                            <span className="material-symbols-outlined">notifications</span>
                            <h3 className="font-bold text-sm">Avisos del Sistema</h3>
                        </div>
                        <p className="text-2xl font-bold txt-darkbl">2</p>
                        <p className="text-xs txt-muted mt-1">Insignia roja visible en el Header y BottomNav.</p>
                    </div>
                </div>
            </div>
            );
}

function GenericPlaceholder( { title, icon }) {
    return (
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-darkgr-30 text-center flex flex-col items-
                 center gap-3 my-8">
                <span className="material-symbols-outlined text-4xl text-[#004b74]">{icon}</span>
                <h2 className="text-2xl font-bold txt-darkbl">{title}</h2>
                <p className="text-sm txt-muted">Vista enrutada correctamente mediante React Router v6.</p>
                <Link to="/" className="text-xs font-bold text-[#004b74] hover:underline mt-2">
                ← Volver al Inicio
                </Link>
            </div>
            );
}

export default function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<HomePlaceholder />} />
                            <Route path="events" element={<GenericPlaceholder title="Catálogo de Eventos" icon="explore" />} />
                            <Route path="events/:id" element={<GenericPlaceholder title="Detalle del Evento" icon="info" />} />
                            <Route path="favorites" element={<GenericPlaceholder title="Mis Favoritos" icon="bookmark" />} />
                            <Route path="agenda" element={<GenericPlaceholder title="Mi Agenda Cultural" icon="calendar_today" />} />
                            <Route path="notifications" element={<GenericPlaceholder title="Centro de Notificaciones" icon="notifications" />} />
                            <Route path="perfil" element={<GenericPlaceholder title="Configuración de Perfil" icon="manage_accounts" />} />
                            <Route path="admin" element={<GenericPlaceholder title="Panel Administrativo" icon="admin_panel_settings" />} />
                            <Route path="login" element={<GenericPlaceholder title="Iniciar Sesión" icon="login" />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </AuthProvider>
    );
}