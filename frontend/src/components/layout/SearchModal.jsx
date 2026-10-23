/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useState, useMemo } from 'react';
    import { Link } from 'react-router-dom';
    import { useApp } from '../../context/AppContext';

    export default function SearchModal() {
      const { isSearchModalOpen, setIsSearchModalOpen, events } = useApp();
      const [query, setQuery] = useState('');

      const filteredEvents = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return events.slice(0, 8);
        return events.filter((e) => {
          const title = (e.nombreEvento || e.title || '').toLowerCase();
          const cat = (e.categoria?.nombreCategoria || e.category || '').toLowerCase();
          const place = (e.lugar?.nombreLugar || e.location || '').toLowerCase();
          const loc = (e.lugar?.localidad || e.locality || '').toLowerCase();
          const desc = (e.descripcion || '').toLowerCase();
          return title.includes(q) || cat.includes(q) || place.includes(q) || loc.includes(q) || desc.includes(q);
        });
      }, [events, query]);

      if (!isSearchModalOpen) return null;

      const closeModal = () => {
        setIsSearchModalOpen(false);
        setQuery('');
      };

      return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm
  animate-fadeIn">
          <div className="bg-[#f9faf5] rounded-2xl w-full max-w-2xl shadow-2xl border border-[#c4c6cc]/40 overflow-
  hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-[#c4c6cc]/30 flex items-center gap-3 bg-white">
              <span className="material-symbols-outlined text-[#0d1b2a] text-[24px]">search</span>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar eventos, categorías, lugares (ej: Jazz, MAMBO, Teatro)..."
                className="w-full bg-transparent border-none outline-none font-body text-base text-[#1a1c1a]
  placeholder:text-[#74777d]"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-[#74777d] hover:text-[#1a1c1a] p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">cancel</span>
                </button>
              )}
              <button
                onClick={closeModal}
                className="bg-[#e8e8e4] hover:bg-[#e2e3df] text-[#0d1b2a] font-label text-xs font-semibold px-3 py-1.
  5 rounded-full transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3">
              <div className="flex items-center justify-between font-label text-xs text-[#44474c] px-1">
                <span>{query ? `Resultados para "${query}"` : 'Eventos destacados'}</span>
                <span>{filteredEvents.length} encontrados</span>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center gap-2 text-[#74777d]">
                  <span className="material-symbols-outlined text-[48px]">search_off</span>
                  <p className="font-body text-sm font-medium text-[#1a1c1a]">
                    No encontramos eventos con esa búsqueda.
                  </p>
                  <p className="font-label text-xs">
                    Intenta buscar términos como "Música", "Teatro", "Parque" o "Arte".
                  </p>
                </div>
              ) : (
                filteredEvents.map((event) => {
                  const id = event.idEvento || event.id;
                  const title = event.nombreEvento || event.title;
                  const img = event.imagenUrl || event.imageUrl || '/assets/images/bogota_cultura_logo_1786336366091.jpg';
                  const cat = event.categoria?.nombreCategoria || event.category || 'Cultura';
                  const place = event.lugar?.nombreLugar || event.location || 'Bogotá';
                  const date = event.fechaEvento || event.date || 'Próximamente';

                  return (
                    <Link
                      key={id}
                      to={`/events/${id}`}
                      onClick={closeModal}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white hover:bg-[#f3f4f0] border border-
  [#c4c6cc]/20 transition-all cursor-pointer group shadow-sm no-underline"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform
  shrink-0"
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#d6e4f9] text-[#0f1c2c] font-label text-[10px] font-semibold px-2 py-
  0.5 rounded">
                            {cat}
                          </span>
                          <span className="font-label text-xs text-[#44474c] truncate">{date}</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-[#0d1b2a] group-hover:text-[#2d8aca]
  transition-colors truncate">
                          {title}
                        </h4>
                        <p className="font-body text-xs text-[#74777d] truncate">📍 {place}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#74777d] group-hover:translate-x-1 transition-
  transform">
                        chevron_right
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      );
    }