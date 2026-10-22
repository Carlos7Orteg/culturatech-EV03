export default function App() {
    return (
            <div className="min-h-screen bg-cremlg flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 max-w-md w-full flex flex-col
                     items-center gap-4">
                    <img
                        src="/assets/images/logo_CulturaTechBG.png"
                        alt="CulturaTech Bogotá Logo"
                        className="w-16 h-16 object-contain"
                        />
                    <h1 className="text-2xl font-bold txt-darkbl">CulturaTech Bogotá</h1>
                    <p className="text-sm txt-muted">
                        Migración a React — Etapa 1 configurada exitosamente.
                    </p>
                    <div className="flex gap-2 items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-
                         semibold">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span>Vite + Tailwind + Fuentes Activas</span>
                    </div>
                </div>
            </div>
            );
}
