/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */

import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

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

export default function FavoritesView() {
  const { events, favorites, toggleFavorite } = useApp();

  const favoriteEvents = (Array.isArray(events) ? events : []).filter(
    (event) =>
      Array.isArray(favorites) &&
      favorites.some((id) => Number(id) === Number(event.id))
  );

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-16">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-red-600">
            favorite
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-darkbl md:text-3xl">
            Mis Favoritos
          </h1>
        </div>

        <p className="text-sm text-primary">
          Tus eventos culturales guardados para consultar cuando quieras.
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between border-b border-darkgr-30 pb-4">
        <span className="text-sm font-semibold text-darkbl">
          {favoriteEvents.length}{' '}
          {favoriteEvents.length === 1 ? 'evento' : 'eventos'}
        </span>

        <Link
          to="/events"
          className="text-xs font-semibold text-[#8e4e14] no-underline hover:underline"
        >
          Explorar eventos
        </Link>
      </div>

      {favoriteEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteEvents.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-darkgr-30 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-cremlg">
                <Link
                  to={`/events/${encodeURIComponent(event.id)}`}
                  aria-label={`Ver detalles de ${event.title}`}
                >
                  <img
                    src={
                      event.imageUrl ||
                      '/assets/images/bogota_cultura_logo_1786336366091.jpg'
                    }
                    alt={event.title || 'Evento cultural'}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        '/assets/images/bogota_cultura_logo_1786336366091.jpg';
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => toggleFavorite(event.id)}
                  aria-label={`Quitar ${event.title} de favoritos`}
                  title="Quitar de favoritos"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-md"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
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
                  className="mb-3 text-lg font-bold text-darkbl no-underline hover:text-[#8e4e14]"
                >
                  {event.title || 'Evento cultural'}
                </Link>

                <div className="mb-2 flex items-start gap-2 text-xs text-primary">
                  <span className="material-symbols-outlined text-base">
                    calendar_today
                  </span>
                  <span>
                    {formatDate(event.date)}
                    {event.time
                      ? ` · ${String(event.time).slice(0, 5)}`
                      : ''}
                  </span>
                </div>

                <div className="mb-4 flex items-start gap-2 text-xs text-primary">
                  <span className="material-symbols-outlined text-base">
                    location_on
                  </span>
                  <span>
                    {event.location || 'Lugar por confirmar'}
                    {event.locality ? ` · ${event.locality}` : ''}
                  </span>
                </div>

                <div className="mt-auto border-t border-darkgr-30 pt-4">
                  <span className="text-xs font-semibold text-darkbl">
                    {formatCost(event.cost)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="flex flex-col items-center rounded-2xl border border-darkgr-30 bg-white px-6 py-14 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-primary">
            favorite_border
          </span>

          <h2 className="text-lg font-bold text-darkbl">
            Todavía no tienes favoritos
          </h2>

          <p className="mt-2 max-w-md text-sm text-primary">
            Guarda los eventos culturales que te interesen y aparecerán aquí.
          </p>

          <Link
            to="/"
            className="mt-5 rounded-full bg-darkbl px-5 py-3 text-xs font-semibold text-white no-underline hover:bg-black"
          >
            Explorar eventos
          </Link>
        </section>
      )}
    </main>
  );
}

