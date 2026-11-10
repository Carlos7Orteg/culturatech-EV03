/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function formatDate(dateString) {
    if (!dateString) return 'Fecha por confirmar';

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) return dateString;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) return 'Hoy';
    if (date.getTime() === tomorrow.getTime()) return 'Mañana';

    return dateString;
}

function formatCost(cost) {
    const value = Number(cost);

    if (!value || value === 0) return 'Entrada Libre';

    return `$${value.toLocaleString('es-CO')} COP`;
}

export default function EventDetailView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        events,
        isFavorite,
        toggleFavorite,
        isInAgenda,
        toggleAgenda
    } = useApp();

    const [registeredAssistance, setRegisteredAssistance] = useState(false);

    const event = events.find(item => String(item.id) === String(id));

    if (!event) {
        return (
            <main className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10">
                <div className="bg-white rounded-2xl p-8 border border-darkgr-40 shadow-sm">
                    <h2 className="font-display font-bold text-xl txt-darkbl mb-3">
                        Evento no encontrado
                    </h2>

                    <p className="font-body text-sm txt-primary mb-5">
                        No se encontró el evento solicitado en el catálogo.
                    </p>

                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 bg-darkbl text-white px-5 py-3 rounded-lg font-label text-xs font-bold no-underline"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Regresar al listado
                    </Link>
                </div>
            </main>
        );
    }

    const favorite = isFavorite(event.id);
    const inAgenda = isInAgenda(event.id);

    const recommendedEvents = events
        .filter(item => String(item.id) !== String(event.id))
        .slice(0, 3);

    const description = event.fullDescription || event.description || '';

    async function handleShare() {
        const shareData = {
            title: event.title,
            text: event.description || event.title,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('No se pudo compartir el evento:', error);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Enlace del evento copiado al portapapeles.');
            } catch {
                alert('No fue posible copiar el enlace.');
            }
        }
    }

    function openMap() {
        const query = [
            event.location,
            event.address,
            event.locality,
            'Bogotá',
            'Colombia'
        ].filter(Boolean).join(', ');

        window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
            '_blank',
            'noopener,noreferrer'
        );
    }

    return (
        <main className="flex-1 w-full max-w-[1280px] mx-auto pb-16">

            {/* Acciones superiores */}
            <div className="flex items-center justify-between px-4 md:px-10 py-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 txt-darkbl font-label text-xs font-bold hover-txt-accent cursor-pointer"
                >
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    Cultura Bogotá
                </button>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleShare}
                        aria-label="Compartir evento"
                        className="p-2 rounded-full txt-primary hover-txt-darkbl hover-bg-subtle cursor-pointer"
                    >
                        <span className="material-symbols-outlined">
                            share
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => toggleFavorite(event.id)}
                        aria-label={
                            favorite
                                ? 'Quitar de favoritos'
                                : 'Guardar en favoritos'
                        }
                        className={`p-2 rounded-full cursor-pointer ${
                            favorite ? 'txt-danger' : 'txt-primary hover-txt-danger'
                        }`}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontVariationSettings: favorite
                                    ? "'FILL' 1"
                                    : "'FILL' 0"
                            }}
                        >
                            favorite
                        </span>
                    </button>
                </div>
            </div>

            {/* Imagen principal e información */}
            <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden md:rounded-2xl md:mt-2 shadow-xl bg-darkbln">
                {event.imageUrl && (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-darkbln-95 via-darkbln-40 to-transparent flex flex-col justify-end p-5 md:p-10">
                    <div className="flex flex-col gap-3">

                        <div className="flex flex-wrap gap-2">
                            {event.isFeatured && (
                                <span className="inline-flex items-center gap-1 bg-blue-90 text-white px-3 py-1 rounded-sm font-label text-[11px] font-medium uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">
                                        stars
                                    </span>
                                    DESTACADO
                                </span>
                            )}

                            <span className="inline-flex items-center bg-brand txt-label px-3 py-1 rounded-sm font-label text-[11px] font-medium uppercase tracking-widest">
                                {event.category}
                            </span>
                        </div>

                        <h1 className="text-white text-3xl md:text-5xl font-display font-bold leading-tight max-w-3xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 font-body text-xs md:text-sm mt-1">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_today
                                </span>
                                {formatDate(event.date)}
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">
                                    schedule
                                </span>
                                {event.time || 'Hora por confirmar'}
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">
                                    payments
                                </span>
                                {formatCost(event.cost)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenido principal */}
            <div className="px-4 md:px-10 mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">

                <div className="lg:col-span-8 flex flex-col gap-10">

                    {/* Descripción */}
                    <section>
                        <h2 className="text-2xl font-display font-bold txt-darkbl mb-4 border-b border-darkgr-40 pb-2">
                            Acerca del evento
                        </h2>

                        <div className="space-y-4 font-body text-base md:text-lg txt-main leading-relaxed">
                            {description
                                ? description.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                                : <p>Información detallada no disponible.</p>
                            }
                        </div>
                    </section>

                    {/* Cronograma */}
                    {event.schedule?.length > 0 && (
                        <section className="bg-crem rounded-2xl p-6 md:p-8 border border-darkgr-40">
                            <h3 className="text-xl font-display font-bold txt-darkbl mb-6">
                                Cronograma de Presentaciones
                            </h3>

                            <div className="space-y-6">
                                {event.schedule.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 md:gap-6 items-start"
                                    >
                                        <span className="font-label font-bold txt-darkbl text-base min-w-[60px]">
                                            {item.time}
                                        </span>

                                        <div className="flex flex-col border-l-2 border-darkbl-20 pl-4">
                                            <h4 className="font-display font-bold text-base txt-main">
                                                {item.title}
                                            </h4>

                                            <p className="font-body text-xs txt-primary mt-0.5">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Lugar */}
                    <section className="space-y-6">
                        <h3 className="text-2xl font-display font-bold txt-darkbl border-b border-darkgr-40 pb-2">
                            Lugar del evento
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3 font-body">

                                <div>
                                    <p className="font-label text-[11px] font-bold txt-primary uppercase tracking-wider">
                                        Nombre del lugar
                                    </p>
                                    <p className="font-display font-bold text-lg txt-main">
                                        {event.location || 'No disponible'}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-label text-[11px] font-bold txt-primary uppercase tracking-wider">
                                        Dirección
                                    </p>
                                    <p className="text-sm txt-main">
                                        {event.address || 'No disponible'}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-label text-[11px] font-bold txt-primary uppercase tracking-wider">
                                        Localidad
                                    </p>
                                    <p className="text-sm txt-main">
                                        {event.locality || 'No disponible'}
                                    </p>
                                </div>

                                {event.phone && (
                                    <div>
                                        <p className="font-label text-[11px] font-bold txt-primary uppercase tracking-wider">
                                            Teléfono
                                        </p>
                                        <p className="text-sm txt-main">
                                            {event.phone}
                                        </p>
                                    </div>
                                )}

                                {event.website && (
                                    <div>
                                        <p className="font-label text-[11px] font-bold txt-primary uppercase tracking-wider">
                                            Página web
                                        </p>
                                        <a
                                            href={
                                                event.website.startsWith('http')
                                                    ? event.website
                                                    : `https://${event.website}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm txt-body font-semibold hover:underline"
                                        >
                                            {event.website}
                                        </a>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={openMap}
                                    className="mt-2 inline-flex items-center justify-center gap-2 bg-darkbl text-white px-5 py-3 rounded-lg font-label font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        map
                                    </span>
                                    Ver ubicación
                                </button>
                            </div>

                            <div className="w-full h-60 rounded-2xl overflow-hidden relative shadow-inner border border-darkgr-40 bg-lightsecn">
                                <iframe
                                    title={`Mapa de ubicación de ${event.title}`}
                                    width="100%"
                                    height="100%"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        `${event.location || ''}, ${event.address || ''}, ${event.locality || ''}, Bogotá, Colombia`
                                    )}&hl=es&z=15&output=embed`}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Panel lateral */}
                <aside className="lg:col-span-4 flex flex-col gap-6">

                    {/* Organización */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-darkgr-40">
                        <span className="font-label text-[10px] txt-muted uppercase tracking-widest block mb-4">
                            Organización oficial
                        </span>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-darkbln text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                {event.organizer?.name?.[0] || 'I'}
                            </div>

                            <div>
                                <h4 className="font-display font-bold text-base txt-main">
                                    {event.organizer?.name || 'IDARTES'}
                                </h4>

                                <p className="font-body text-xs txt-primary">
                                    {event.organizer?.description || 'Instituto Distrital de las Artes'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Registro y agenda */}
                    <section className="bg-darkbln text-white rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-darkgr-20">
                        <div className="relative z-10 flex flex-col gap-4">

                            <div>
                                <span className="font-display text-2xl font-bold block mb-1">
                                    {formatCost(event.cost)}
                                </span>

                                <p className="font-body text-xs txt-lightazl">
                                    El registro te permite reservar tu cupo y sincronizar tu agenda cultural.
                                </p>
                            </div>

                            <div className="space-y-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setRegisteredAssistance(true)}
                                    className={`w-full py-3.5 rounded-lg font-label font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                                        registeredAssistance
                                            ? 'bg-success txt-green'
                                            : 'bg-white txt-darkbln hover-bg-soft'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {registeredAssistance ? 'check_circle' : 'how_to_reg'}
                                    </span>

                                    {registeredAssistance
                                        ? 'Asistencia confirmada'
                                        : 'Registrar asistencia'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => toggleAgenda(event.id)}
                                    className={`w-full py-3.5 rounded-lg font-label font-bold text-xs uppercase tracking-widest border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                        inAgenda
                                            ? 'bg-blue br-blue text-white'
                                            : 'br-lightazl txt-lightazl hover:bg-white/10'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {inAgenda ? 'event_available' : 'calendar_add_on'}
                                    </span>

                                    {inAgenda ? 'En tu agenda' : 'Agregar a Agenda'}
                                </button>
                            </div>

                            <p className="font-label text-[10px] txt-lightazl-70 text-center mt-2 leading-tight">
                                Al registrarte aceptas los términos de la Secretaría de Cultura de Bogotá.
                            </p>
                        </div>
                    </section>

                    <Link
                        to="/events"
                        className="w-full py-3.5 txt-primary hover-txt-darkbl font-label font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover-bg-crem rounded-xl transition-all cursor-pointer border border-darkgr-40 no-underline"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Regresar al listado
                    </Link>
                </aside>
            </div>

            {/* Eventos recomendados */}
            {recommendedEvents.length > 0 && (
                <section className="mt-16 px-4 md:px-10 border-t border-darkgr-30 pt-12">
                    <h3 className="text-2xl font-display font-bold txt-darkbl mb-6">
                        Otros eventos recomendados
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendedEvents.map(item => (
                            <Link
                                key={item.id}
                                to={`/events/${item.id}`}
                                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-darkgr-30 shadow-sm hover:shadow-md transition-all p-3 no-underline block"
                            >
                                <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 relative">
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>

                                <span className="font-label text-[10px] font-bold txt-body uppercase tracking-wider">
                                    {item.category} • {item.date}
                                </span>

                                <h5 className="font-display font-bold text-base txt-main grp-hover-accent transition-colors mt-0.5 line-clamp-1">
                                    {item.title}
                                </h5>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
