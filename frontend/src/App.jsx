
import { useState } from 'react';
import { eventsService } from './api/events.service';
import { categoriesService } from './api/categories.service';

export default function App() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState('');

    const testConnection = async () => {
        setLoading(true);
        setStatus(null);
        setDetails('');

        try {
            const [eventos, categorias] = await Promise.all([
                eventsService.getAll(),
                categoriesService.getAll(),
            ]);

            setStatus('success');
            setDetails(
                    `Conectado al backend: ${eventos.length} eventos y ${categorias.length} categorías cargadas desde MySQL.`
                    );
        } catch (err) {
            setStatus('error');
            setDetails(
                    `Error de conexión: ${err.message}. Verifica que Spring Boot esté iniciado en http://localhost:8080.`
                    );
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="min-h-screen bg-cremlg flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 max-w-lg w-full flex flex-col items-center gap-4">
                    <img
                        src="/assets/images/logo_CulturaTechBG.png"
                        alt="Logo de CulturaTech Bogotá"
                        className="w-16 h-16 object-contain"
                        />
            
                    <h1 className="text-2xl font-bold txt-darkbl">
                        CulturaTech Bogotá
                    </h1>
            
                    <p className="text-sm txt-muted">
                        Etapa 2 — Capa de Red y Servicios API
                    </p>
            
                    <button
                        onClick={testConnection}
                        disabled={loading}
                        className="cursor-pointer bg-[#004b74] hover:bg-[#0d1b2a] text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                        <span className="material-symbols-outlined text-base">
                            {loading ? 'sync' : 'network_check'}
                        </span>
                        <span>
                            {loading ? 'Verificando...' : 'Probar Conexión con Spring Boot'}
                        </span>
                    </button>
            
                    {status === 'success' && (
                                    <div className="w-full bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl text-xs flex items-start gap-2 text-left">
                                        <span className="material-symbols-outlined text-green-600 text-base">
                                            check_circle
                                        </span>
                                        <div>
                                            <p className="font-semibold">
                                                ¡Conexión exitosa con la API!
                                            </p>
                                            <p className="mt-0.5">{details}</p>
                                        </div>
                                    </div>
                                        )}
            
                    {status === 'error' && (
                            <div className="w-full bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs flex items-start gap-2 text-left">
                                <span className="material-symbols-outlined text-amber-600 text-base">
                                    info
                                </span>
                                <div>
                                    <p className="font-semibold">
                                        Backend no disponible o solicitud fallida
                                    </p>
                                    <p className="mt-0.5">{details}</p>
                                </div>
                            </div>
                                )}
                </div>
            </div>
            );
}
