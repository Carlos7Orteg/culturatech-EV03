
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';
import FavoritesView from './views/FavoritesView';
import AgendaView from './views/AgendaView';
import EventsView from './views/EventsView';
import EventDetailView from './views/EventDetailView';
import ProfileView from './views/ProfileView';
import AdminView from './views/AdminView';

// Protege todas las rutas privadas.
function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="text-center p-8">
                Verificando sesión...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Restringe el acceso administrativo al rol ADMIN.
function AdminRoute({ children }) {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

function GenericPlaceholder({ title, icon }) {
    return (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-darkgr-30 text-center flex flex-col items-center gap-3 my-8">
            <span className="material-symbols-outlined text-4xl text-[#004b74]">
                {icon}
            </span>
            <h2 className="text-2xl font-bold txt-darkbl">{title}</h2>
            <p className="text-sm txt-muted">Vista enrutada correctamente.</p>
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
                        {/* Rutas privadas */}
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <MainLayout />
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<HomeView />} />
                            <Route path="events" element={<EventsView />} />
                            <Route path="events/:id" element={<EventDetailView />} />
                            <Route path="favorites" element={<FavoritesView />} />
                            <Route path="agenda" element={<AgendaView />} />
                            <Route
                                path="notifications"
                                element={
                                    <GenericPlaceholder
                                        title="Notificaciones"
                                        icon="notifications"
                                    />
                                }
                            />
                            <Route path="perfil" element={<ProfileView />} />
                        </Route>

                        {/* Rutas públicas */}
                        <Route path="/login" element={<LoginView />} />
                        <Route path="/register" element={<RegisterView />} />

                        {/* Ruta administrativa */}
                        <Route
                            path="/admin"
                            element={
                                <PrivateRoute>
                                    <AdminRoute>
                                        <AdminView />
                                    </AdminRoute>
                                </PrivateRoute>
                            }
                        />

                        {/* Ruta desconocida */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </AuthProvider>
    );
}
