/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  { name: 'Todo', icon: 'grid_view' },
  { name: 'Música', icon: 'music_note' },
  { name: 'Teatro', icon: 'theater_comedy' },
  { name: 'Arte', icon: 'palette' },
  { name: 'Cine', icon: 'movie' },
  { name: 'Danza', icon: 'celebration' },
  { name: 'Museos', icon: 'museum' },
  { name: 'Literatura', icon: 'menu_book' },
  { name: 'Gastronomía', icon: 'restaurant' },
];

const DEFAULT_IMAGE =
  '/assets/images/bogota_cultura_logo_1786336366091.jpg';

function formatDate(value) {
  if (!value) return 'Fecha por confirmar';

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatCost(value) {
  if (value === null || value === undefined || value === '') {
    return 'Costo por confirmar';
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) return String(value);
  if (amount === 0) return 'Entrada libre';

  return `$${amount.toLocaleString('es-CO')} COP`;
}

function getEventDate(event) {
  if (!event.date) return null;

  const date = new Date(`${event.date}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function EventCard({
  event,
  isFavorite,
  isInAgenda,
  onToggleFavorite,
  onToggleAgenda,
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-darkgr-30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-lightsecn">
        <Link
          to={`/events/${encodeURIComponent(event.id)}`}
          aria-label={`Ver detalles de ${event.title || 'evento'}`}
        >
          <img
            src={event.imageUrl || DEFAULT_IMAGE}
            alt={event.title || 'Evento cultural'}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => onToggleFavorite(event.id)}
          aria-label={
            isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
          }
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-colors ${
            isFavorite
              ? 'bg-white text-red-600'
              : 'bg-white/90 text-slate-600 hover:text-red-600'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: isFavorite
                ? "'FILL' 1"
                : "'FILL' 0",
            }}
          >
            favorite
          </span>
        </button>

        <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
          {event.category || 'Cultura'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link
          to={`/events/${encodeURIComponent(event.id)}`}
          className="mb-3 text-lg font-bold text-darkbl no-underline transition-colors hover:text-[#8e4e14]"
        >
          {event.title || 'Evento cultural'}
        </Link>

        {event.description && (
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted">
            {event.description}
          </p>
        )}

        <div className="mb-2 flex items-start gap-2 text-xs text-primary">
          <span className="material-symbols-outlined text-base text-accent">
            calendar_today
          </span>
          <span>
            {formatDate(event.date)}
            {event.time ? ` · ${String(event.time).slice(0, 5)}` : ''}
          </span>
        </div>

        <div className="mb-4 flex items-start gap-2 text-xs text-primary">
          <span className="material-symbols-outlined text-base text-accent">
            location_on
          </span>
          <span className="min-w-0 truncate">
            {event.location || 'Lugar por confirmar'}
            {event.locality ? ` · ${event.locality}` : ''}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-darkgr-30 pt-4">
          <span className="text-xs font-semibold text-darkbl">
            {formatCost(event.cost)}
          </span>

          <button
            type="button"
            onClick={() => onToggleAgenda(event.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
              isInAgenda
                ? 'bg-green-100 text-green-800'
                : 'bg-cremlg text-darkbl hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isInAgenda ? 'check' : 'calendar_add_on'}
            </span>
            {isInAgenda ? 'Agendado' : 'Agendar'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HomeView() {
  const {
    events,
    isFavorite,
    toggleFavorite,
    isInAgenda,
    toggleAgenda
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const allEvents = Array.isArray(events) ? events : [];

  const featuredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allEvents
      .filter((event) => {
        const date = getEventDate(event);
        return date && date >= today;
      })
      .sort((a, b) => getEventDate(a) - getEventDate(b))
      .slice(0, 3);
  }, [allEvents]);

  const currentFeatured =
    featuredEvents[carouselIndex] || featuredEvents[0];

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'Todo') return allEvents;

    return allEvents.filter((event) =>
      String(event.category || '')
        .toLocaleLowerCase('es-CO')
        .includes(selectedCategory.toLocaleLowerCase('es-CO')),
    );
  }, [allEvents, selectedCategory]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const moveCarousel = (direction) => {
    if (featuredEvents.length < 2) return;

    setCarouselIndex((current) =>
      (current + direction + featuredEvents.length) %
      featuredEvents.length,
    );
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-16">
      {currentFeatured ? (
        <section className="group relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl bg-darkbl shadow-xl md:aspect-[21/9]">
          <img
            src={currentFeatured.imageUrl || DEFAULT_IMAGE}
            alt={currentFeatured.title || 'Evento destacado'}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-5 md:p-10">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-blue-900/90 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white">
                  <span className="material-symbols-outlined text-sm">
                    stars
                  </span>
                  Destacado
                </span>

                <span className="rounded-sm bg-brand px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white">
                  {currentFeatured.category || 'Cultura'}
                </span>
              </div>

              <Link
                to={`/events/${encodeURIComponent(currentFeatured.id)}`}
                className="text-2xl font-bold leading-tight tracking-tight text-white no-underline hover:text-[#ffab69] md:text-4xl lg:text-5xl"
              >
                {currentFeatured.title || 'Evento cultural'}
              </Link>

              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-white/90 md:gap-6 md:text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">
                    calendar_today
                  </span>
                  {formatDate(currentFeatured.date)}
                </span>

                {currentFeatured.time && (
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    {String(currentFeatured.time).slice(0, 5)}
                  </span>
                )}

                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">
                    payments
                  </span>
                  {formatCost(currentFeatured.cost)}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <Link
                  to={`/events/${encodeURIComponent(currentFeatured.id)}`}
                  className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-bold uppercase text-darkbl no-underline transition-colors hover:bg-slate-100"
                >
                  Ver detalles
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => toggleFavorite(currentFeatured.id)}
                  aria-label={
                    isFavorite(currentFeatured.id)
                      ? 'Quitar destacado de favoritos'
                      : 'Agregar destacado a favoritos'
                  }
                  className={`rounded-sm border p-2.5 text-white backdrop-blur-sm transition-colors ${
                    isFavorite(currentFeatured.id)
                      ? 'border-red-500 bg-red-600'
                      : 'border-white/40 bg-white/20 hover:bg-white/40'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings: isFavorite(currentFeatured.id)
                        ? "'FILL' 1"
                        : "'FILL' 0",
                    }}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>

          {featuredEvents.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Evento destacado anterior"
                onClick={() => moveCarousel(-1)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/40 bg-white/70 text-darkbl shadow-xl transition hover:scale-105 hover:bg-white md:left-6"
              >
                <span className="material-symbols-outlined text-3xl">
                  chevron_left
                </span>
              </button>

              <button
                type="button"
                aria-label="Siguiente evento destacado"
                onClick={() => moveCarousel(1)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/40 bg-white/70 text-darkbl shadow-xl transition hover:scale-105 hover:bg-white md:right-6"
              >
                <span className="material-symbols-outlined text-3xl">
                  chevron_right
                </span>
              </button>

              <div className="absolute bottom-3 right-4 flex items-center gap-2">
                {featuredEvents.map((event, index) => (
                  <button
                    key={event.id ?? index}
                    type="button"
                    aria-label={`Ir al destacado ${index + 1}`}
                    onClick={() => setCarouselIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      carouselIndex === index
                        ? 'w-6 bg-white'
                        : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-darkbl px-6 py-10 text-center text-white">
          <span className="material-symbols-outlined mb-3 text-4xl">
            event_busy
          </span>
          <h2 className="text-xl font-bold">Sin próximos eventos destacados</h2>
          <p className="mt-2 max-w-lg text-sm text-white/80">
            Puedes explorar el catálogo disponible más abajo.
          </p>
        </section>
      )}

      <section className="mb-6 mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-darkbl">
            Categorías culturales
          </h2>

          {selectedCategory !== 'Todo' && (
            <button
              type="button"
              onClick={() => changeCategory('Todo')}
              className="text-xs font-semibold text-body hover:underline"
            >
              Ver todo
            </button>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 md:hidden">
          {CATEGORIES.slice(0, 5).map((category) => {
            const isActive = selectedCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => changeCategory(category.name)}
                className="flex shrink-0 flex-col items-center"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                    isActive
                      ? 'scale-105 border-darkbl bg-darkbl text-white shadow-md'
                      : 'border-darkgr-40 bg-cremlg text-darkbl'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {category.icon}
                  </span>
                </span>
                <span
                  className={`mt-1.5 whitespace-nowrap text-[11px] ${
                    isActive
                      ? 'font-bold text-darkbl'
                      : 'font-medium text-primary'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden gap-2 pb-2 pt-1 md:flex md:items-center md:justify-between">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => changeCategory(category.name)}
                className="flex min-w-0 flex-1 flex-col items-center"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition lg:h-12 lg:w-12 ${
                    isActive
                      ? 'scale-105 border-darkbl bg-darkbl text-white shadow-md'
                      : 'border-darkgr-40 bg-cremlg text-darkbl hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl lg:text-2xl">
                    {category.icon}
                  </span>
                </span>
                <span
                  className={`mt-1.5 max-w-full truncate text-center text-[11px] lg:text-xs ${
                    isActive
                      ? 'font-bold text-darkbl'
                      : 'font-medium text-primary'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-darkbl">
            {selectedCategory === 'Todo'
              ? 'Agenda de Eventos'
              : `Eventos de ${selectedCategory}`}
          </h2>
          <span className="text-xs text-primary">
            Mostrando {paginatedEvents.length} de {filteredEvents.length}
          </span>
        </div>

        {paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedEvents.map((event, index) => (
              <EventCard
                key={event.id ?? `${event.title}-${index}`}
                event={event}
                isFavorite={isFavorite(event.id)}
                isInAgenda={isInAgenda(event.id)}
                onToggleFavorite={toggleFavorite}
                onToggleAgenda={toggleAgenda}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-darkgr-30 bg-white px-6 py-12 text-center">
            <span className="material-symbols-outlined text-4xl text-muted">
              event_busy
            </span>
            <h3 className="mt-3 font-bold text-darkbl">
              No hay eventos para mostrar
            </h3>
            <p className="mt-1 text-sm text-muted">
              Prueba otra categoría o vuelve a consultar más tarde.
            </p>
            {selectedCategory !== 'Todo' && (
              <button
                type="button"
                onClick={() => changeCategory('Todo')}
                className="mt-4 rounded-full bg-darkbl px-4 py-2 text-xs font-semibold text-white"
              >
                Ver todos los eventos
              </button>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Paginación de eventos"
            className="mt-10 flex items-center justify-center gap-2"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-darkgr-30 text-darkbl transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  aria-current={currentPage === page ? 'page' : undefined}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-full text-xs font-bold transition ${
                    currentPage === page
                      ? 'bg-darkbl text-white'
                      : 'bg-cremlg text-primary hover:bg-slate-200'
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-darkgr-30 text-darkbl transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
