/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
/**
 * Convierte los eventos del backend al formato utilizado por React.
 * Conserva los campos originales para no romper componentes existentes.
 */
export function normalizeEvent(event = {}) {
    const rawDate = event.fechaHora ?? event.fechaEvento ?? event.date ?? '';
    const dateParts = String(rawDate).split('T');

    const category =
        typeof event.categoria === 'object' && event.categoria !== null
            ? event.categoria.nombreCategoria ?? ''
            : event.categoria ?? event.category ?? '';

    const place =
        typeof event.lugar === 'object' && event.lugar !== null
            ? event.lugar
            : null;

    return {
        ...event,
        id: event.idEvento ?? event.id ?? null,
        title: event.titulo ?? event.nombreEvento ?? event.title ?? '',
        description: event.descripcion ?? event.description ?? '',
        date: dateParts[0] ?? '',
        time: dateParts[1] ?? event.time ?? '',
        cost: event.costo ?? event.cost ?? null,
        imageUrl: event.imagen ?? event.imagenUrl ?? event.imageUrl ?? '',
        category,
        location: place?.nombreLugar ?? event.location ?? '',
        locality: place?.localidad ?? event.locality ?? '',
        coordinates: place
            ? {
                lat: place.latitud ?? place.lat ?? null,
                lng: place.longitud ?? place.lng ?? null
            }
            : event.coordinates ?? null
    };
}


