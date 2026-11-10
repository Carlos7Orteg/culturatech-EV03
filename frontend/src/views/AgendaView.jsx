/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */

import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const DEFAULT_IMAGE =
  '/assets/images/bogota_cultura_logo_1786336366091.jpg';

function formatDate(value) {
  if (!value) return 'Fecha por confirmar';

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatAddedDate(value) {
  if (!value) return '';

  return formatDate(String(value).slice(0, 10));
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

function getAgendaEventId(item) {
  const rawId =
    item && typeof item === 'object'
      ? item.eventId ?? item.id
      : item;

  const id = Number(rawId);

  return Number.isFinite(id) && id > 0 ? id : null;
}

export default function AgendaView() {
  const { events, agenda, toggleAgenda } = useApp();

  const allEvents = Array.isArray(events) ? events : [];
  const agendaItems = Array.isArray(agenda) ? agenda : [];

  const scheduledEvents = agendaItems
    .map((item) => {
      const eventId = getAgendaEventId(item);

      if (eventId === null) return null;

      const event = allEvents.find(
        (candidate) => Number(candidate.id) === eventId,
      );

      if (!event) return null;

      return {
        event,
        agendaItem:
          item && typeof item === 'object'
            ? item
            : { eventId },
      };
    })
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-16">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-[#8e4e14]">
            calendar_month
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-darkbl md:text-3xl">
            Mi Agenda Cultural
          </h1>
        </div>

        <p className="text-sm text-primary">
          Organiza y consulta los eventos culturales que has guardado.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-darkgr-30 pb-4">
        <span className="text-sm font-semibold text-darkbl">
          {scheduledEvents.length}{' '}
          {scheduledEvents.length === 1
            ? 'evento agendado'
            : 'eventos agendados'}
        </span>

        <Link
          to="/events"
          className="text-xs font-semibold text-[#8e4e14] no-underline hover:underline"
        >
          Explorar eventos
        </Link>
      </div>

      {scheduledEvents.length > 0 ? (
        <div className="flex flex-col gap-5">
          {scheduledEvents.map(({ event, agendaItem }) => (
            <article
              key={event.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-darkgr-30 bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row"
            >
              <Link
                to={`/events/${encodeURIComponent(event.id)}`}
                aria-label={`Ver detalles de ${event.title || 'evento'}`}
                className="block h-52 shrink-0 overflow-hidden bg-cremlg md:h-auto md:w-64"
              >
                <img
                  src={event.imageUrl || DEFAULT_IMAGE}
                  alt={event.title || 'Evento cultural'}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:p-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cremlg px-3 py-1 text-[10px] font-semibold text-[#8e4e14]">
                      {event.category || 'Cultura'}
                    </span>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-800">
                      {agendaItem.dateBadge || 'Agendado'}
                    </span>
                  </div>

                  <Link
                    to={`/events/${encodeURIComponent(event.id)}`}
                    className="mb-3 block text-lg font-bold text-darkbl no-underline hover:text-[#8e4e14]"
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

                  <div className="mb-2 flex items-start gap-2 text-xs text-primary">
                    <span className="material-symbols-outlined text-base">
                      location_on
                    </span>

                    <span>
                      {event.location || 'Lugar por confirmar'}
                      {event.locality ? ` · ${event.locality}` : ''}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-darkbl">
                    {formatCost(event.cost)}
                  </p>

                  {agendaItem.addedAt && (
                    <p className="mt-3 text-[11px] text-muted">
                      Agregado a la agenda el{' '}
                      {formatAddedDate(agendaItem.addedAt)}
                    </p>
                  )}

                  {agendaItem.note && (
                    <p className="mt-2 text-xs text-primary">
                      {agendaItem.note}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-row gap-2 md:flex-col">
                  <Link
                    to={`/events/${encodeURIComponent(event.id)}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-darkbl px-4 py-2.5 text-xs font-semibold text-white no-underline hover:bg-black"
                  >
                    <span className="material-symbols-outlined text-base">
                      visibility
                    </span>
                    Ver evento
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleAgenda(event.id)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-darkgr-40 bg-white px-4 py-2.5 text-xs font-semibold text-darkbl transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined text-base">
                      event_busy
                    </span>
                    Quitar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="flex flex-col items-center rounded-2xl border border-darkgr-30 bg-white px-6 py-14 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-primary">
            calendar_month
          </span>

          <h2 className="text-lg font-bold text-darkbl">
            Tu agenda está vacía
          </h2>

          <p className="mt-2 max-w-md text-sm text-primary">
            Agrega eventos desde la página principal para consultarlos aquí.
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

