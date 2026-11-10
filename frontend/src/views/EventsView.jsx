/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './EventsView.css';

const CATEGORIES = ['Todo', 'Música', 'Teatro', 'Arte', 'Cine', 'Danza'];
const DATE_OPTIONS = [
    'Próximos eventos',
    'Hoy',
    'Próximos 7 días',
    'Este mes',
    'Próximo mes'
];
const ITEMS_PER_PAGE = 6;

function startOfDay(date = new Date()) {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value;
}

function matchesDateFilter(dateString, filter) {
    if (!dateString) return false;

    const eventDate = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(eventDate.getTime())) return false;

    const today = startOfDay();

    if (filter === 'Próximos eventos') return eventDate >= today;

    if (filter === 'Hoy') {
        return eventDate.getTime() === today.getTime();
    }

    if (filter === 'Próximos 7 días') {
        const limit = new Date(today);
        limit.setDate(limit.getDate() + 7);
        return eventDate >= today && eventDate <= limit;
    }

    if (filter === 'Este mes') {
        return (
            eventDate.getFullYear() === today.getFullYear() &&
            eventDate.getMonth() === today.getMonth()
        );
    }

    if (filter === 'Próximo mes') {
        const nextMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1
        );

        return (
            eventDate.getFullYear() === nextMonth.getFullYear() &&
            eventDate.getMonth() === nextMonth.getMonth()
        );
    }

    return true;
}

function formatEventDateLabel(dateString) {
    if (!dateString) return 'Fecha por confirmar';

    const eventDate = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(eventDate.getTime())) return dateString;

    const today = startOfDay();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (eventDate.getTime() === today.getTime()) return 'Hoy';
    if (eventDate.getTime() === tomorrow.getTime()) return 'Mañana';

    return dateString;
}

function formatCost(cost) {
    const value = Number(cost);

    if (!value || value === 0) return 'Entrada Libre';

    return `$${value.toLocaleString('es-CO')} COP`;
}

export default function EventsView() {
    const navigate = useNavigate();

    const {
        events = [],
        isFavorite,
        toggleFavorite,
        isInAgenda,
        toggleAgenda
    } = useApp();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todo');
    const [dateFilter, setDateFilter] = useState('Próximos eventos');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [dateOpen, setDateOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, dateFilter]);

    const filteredEvents = useMemo(() => {
        const query = search.toLocaleLowerCase('es').trim();

        return events.filter(event => {
            const matchesCategory =
                category === 'Todo' || event.category === category;

            const matchesDate = matchesDateFilter(
                event.date,
                dateFilter
            );

            const searchable = [
                event.title,
                event.location,
                event.locality,
                event.category
            ];

            const matchesSearch =
                !query ||
                searchable.some(value =>
                    String(value ?? '')
                        .toLocaleLowerCase('es')
                        .includes(query)
                );

            return matchesCategory && matchesDate && matchesSearch;
        });
    }, [events, search, category, dateFilter]);

    const totalPages =
        Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) || 1;

    const safePage = Math.min(currentPage, totalPages);

    const paginatedEvents = filteredEvents.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    );

    const hasActiveFilters =
        category !== 'Todo' ||
        dateFilter !== 'Próximos eventos' ||
        search.trim() !== '';

    function clearFilters() {
        setCategory('Todo');
        setDateFilter('Próximos eventos');
        setSearch('');
        setCurrentPage(1);
        setCategoryOpen(false);
        setDateOpen(false);
    }

    return (
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-8 pb-24 md:pb-16">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-display font-bold text-3xl md:text-4xl txt-darkbl tracking-tight">
                        Explorar Eventos
                    </h1>

                    <p className="font-body text-sm txt-primary mt-1">
                        Catálogo completo de actividades, muestras y talleres en Bogotá.
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 txt-muted">
                        search
                    </span>

                    <input
                        id="events-filter-input"
                        type="text"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        placeholder="Filtrar por nombre o lugar..."
                        className="w-full bg-white border br-darkgr rounded-full pl-10 pr-4 py-2.5 font-body text-sm outline-none focus-border-darkbl shadow-sm"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-8 relative z-30">

                {(categoryOpen || dateOpen) && (
                    <button
                        type="button"
                        aria-label="Cerrar filtros"
                        onClick={() => {
                            setCategoryOpen(false);
                            setDateOpen(false);
                        }}
                        className="fixed inset-0 z-20 bg-transparent cursor-default"
                    />
                )}

                <div className="relative z-30">
                    <button
                        type="button"
                        onClick={() => {
                            setCategoryOpen(!categoryOpen);
                            setDateOpen(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-label text-xs font-semibold transition-all cursor-pointer border shadow-sm ${
                            category !== 'Todo'
                                ? 'bg-darkbl text-white br-darkbl'
                                : 'bg-white txt-darkbl br-darkgr hover-bg-crem'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            category
                        </span>

                        <span>
                            {category === 'Todo'
                                ? 'Categoría'
                                : `Cat: ${category}`}
                        </span>

                        <span className="material-symbols-outlined text-[18px]">
                            {categoryOpen ? 'expand_less' : 'expand_more'}
                        </span>
                    </button>

                    {categoryOpen && (
                        <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-darkgr-40 py-2 z-40 animate-fadeIn">
                            {CATEGORIES.map(item => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setCategory(item);
                                        setCategoryOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs font-body hover-bg-crem flex items-center justify-between cursor-pointer ${
                                        category === item
                                            ? 'font-bold txt-darkbl bg-azuladclr'
                                            : 'txt-primary'
                                    }`}
                                >
                                    <span>
                                        {item === 'Todo'
                                            ? 'Todas las categorías'
                                            : item}
                                    </span>

                                    {category === item && (
                                        <span className="material-symbols-outlined text-[16px] txt-accent">
                                            check
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative z-30">
                    <button
                        type="button"
                        onClick={() => {
                            setDateOpen(!dateOpen);
                            setCategoryOpen(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-label text-xs font-semibold transition-all cursor-pointer border shadow-sm ${
                            dateFilter !== 'Próximos eventos'
                                ? 'bg-darkbl text-white br-darkbl'
                                : 'bg-white txt-darkbl br-darkgr hover-bg-crem'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            calendar_month
                        </span>

                        <span>
                            {dateFilter === 'Próximos eventos'
                                ? 'Fecha'
                                : dateFilter}
                        </span>

                        <span className="material-symbols-outlined text-[18px]">
                            {dateOpen ? 'expand_less' : 'expand_more'}
                        </span>
                    </button>

                    {dateOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-darkgr-40 py-2 z-40 animate-fadeIn">
                            {DATE_OPTIONS.map(item => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setDateFilter(item);
                                        setDateOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs font-body hover-bg-crem flex items-center justify-between cursor-pointer ${
                                        dateFilter === item
                                            ? 'font-bold txt-darkbl bg-azuladclr'
                                            : 'txt-primary'
                                    }`}
                                >
                                    <span>{item}</span>

                                    {dateFilter === item && (
                                        <span className="material-symbols-outlined text-[16px] txt-accent">
                                            check
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={clearFilters}
                    title="Restablecer todos los filtros"
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-label text-xs font-semibold transition-all cursor-pointer border shadow-sm ${
                        hasActiveFilters
                            ? 'bg-danger-10 txt-danger border-danger-30 hover-bg-danger-20 font-bold'
                            : 'bg-crem txt-muted border-darkgr-40 hover-bg-soft'
                    }`}
                >
                    <span className="material-symbols-outlined text-[16px]">
                        filter_alt_off
                    </span>
                    Limpiar filtros
                </button>
            </div>

            {paginatedEvents.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-darkgr-30 shadow-sm flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-[48px] txt-muted">
                        event_busy
                    </span>

                    <h3 className="font-display font-bold text-lg txt-darkbl">
                        No hay eventos con estos filtros
                    </h3>

                    <p className="font-body text-xs txt-primary">
                        Prueba cambiando la categoría seleccionada o limpia la búsqueda.
                    </p>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="bg-darkbl text-white font-label text-xs font-bold px-4 py-2 rounded-full mt-2 cursor-pointer hover-bg-azulmrn transition-colors"
                    >
                        Restablecer filtros
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map(event => {
                        const favorite = isFavorite(event.id);
                        const inAgenda = isInAgenda(event.id);

                        return (
                            <article
                                key={event.id}
                                className="bg-white rounded-2xl shadow-sm border border-darkgr-30 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
                            >
                                <div className="relative h-48 w-full overflow-hidden bg-lightsecn">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/events/${event.id}`)}
                                        className="block w-full h-full text-left"
                                    >
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title || 'Evento cultural'}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center txt-muted">
                                                <span className="material-symbols-outlined text-5xl">
                                                    image
                                                </span>
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => toggleFavorite(event.id)}
                                        aria-label={
                                            favorite
                                                ? 'Quitar de favoritos'
                                                : 'Agregar a favoritos'
                                        }
                                        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
                                            favorite
                                                ? 'bg-white txt-danger'
                                                : 'bg-white/80 txt-muted hover:bg-white hover-txt-danger'
                                        }`}
                                    >
                                        <span
                                            className="material-symbols-outlined text-[20px]"
                                            style={{
                                                fontVariationSettings: favorite
                                                    ? "'FILL' 1"
                                                    : "'FILL' 0"
                                            }}
                                        >
                                            favorite
                                        </span>
                                    </button>

                                    {event.category && (
                                        <div className="absolute bottom-3 left-3 z-10">
                                            <span className="bg-darkbln-80 text-white font-label text-[10px] font-semibold px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                                                {event.category}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/events/${event.id}`)}
                                        className="text-left no-underline"
                                    >
                                        <h4 className="font-display text-lg font-bold txt-darkbl hover-txt-accent transition-colors line-clamp-2 cursor-pointer mb-2">
                                            {event.title || 'Evento cultural'}
                                        </h4>
                                    </button>

                                    <div className="flex items-center gap-2 txt-primary font-label text-xs mb-1.5">
                                        <span className="material-symbols-outlined text-[16px] txt-accent">
                                            calendar_today
                                        </span>

                                        <span>
                                            {formatEventDateLabel(event.date)}
                                            {event.time
                                                ? ` • ${String(event.time).slice(0, 5)}`
                                                : ''}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 txt-primary font-label text-xs mb-4">
                                        <span className="material-symbols-outlined text-[16px] txt-accent">
                                            location_on
                                        </span>

                                        <span className="truncate">
                                            {event.location ||
                                                event.locality ||
                                                'Lugar por confirmar'}
                                        </span>
                                    </div>

                                    <div className="mt-auto pt-4 border-t br-soft flex items-center justify-between">
                                        <span className="font-body text-xs font-semibold txt-darkbl">
                                            {formatCost(event.cost)}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => toggleAgenda(event.id)}
                                            aria-pressed={inAgenda}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label text-xs transition-all cursor-pointer ${
                                                inAgenda
                                                    ? 'bg-success txt-green font-semibold'
                                                    : 'bg-crem txt-darkbl hover-bg-soft'
                                            }`}
                                        >
                                            <span
                                                className="material-symbols-outlined text-[16px]"
                                                style={{
                                                    fontVariationSettings: inAgenda
                                                        ? "'FILL' 1"
                                                        : "'FILL' 0"
                                                }}
                                            >
                                                {inAgenda
                                                    ? 'check'
                                                    : 'calendar_add_on'}
                                            </span>

                                            <span>
                                                {inAgenda ? 'Agendado' : 'Agendar'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage(page => Math.max(1, page - 1))
                        }
                        disabled={safePage === 1}
                        aria-label="Página anterior"
                        className="p-2 rounded-full border br-darkgr txt-darkbl disabled:opacity-30 disabled:cursor-not-allowed hover-bg-soft"
                    >
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map(page => (
                        <button
                            type="button"
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            aria-current={
                                safePage === page ? 'page' : undefined
                            }
                            className={`w-9 h-9 rounded-full font-label text-xs font-bold transition-all ${
                                safePage === page
                                    ? 'bg-darkbl text-white'
                                    : 'bg-crem txt-primary hover-bg-soft'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage(page =>
                                Math.min(totalPages, page + 1)
                            )
                        }
                        disabled={safePage === totalPages}
                        aria-label="Página siguiente"
                        className="p-2 rounded-full border br-darkgr txt-darkbl disabled:opacity-30 disabled:cursor-not-allowed hover-bg-soft"
                    >
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </button>
                </div>
            )}
        </main>
    );
}

