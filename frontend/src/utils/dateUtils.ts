/**
 * Utilidades para manejo de fechas en timezone de Lima, Perú (America/Lima, UTC-5)
 */

/**
 * Formatea una fecha ISO string a formato legible en timezone de Lima
 * @param dateString - Fecha en formato ISO (ej: "2025-03-01T00:00:00.000Z")
 * @param options - Opciones de formato
 * @returns Fecha formateada en español
 */
export function formatDateLima(
    dateString: string,
    options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
): string {
    const date = new Date(dateString);

    return date.toLocaleDateString('es-PE', {
        ...options,
        timeZone: 'America/Lima',
    });
}

/**
 * Formatea una fecha ISO string a formato completo (dia mes año)
 * @param dateString - Fecha en formato ISO
 * @returns Fecha formateada (ej: "1 de marzo de 2025")
 */
export function formatDateLimaFull(dateString: string): string {
    return formatDateLima(dateString, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Formatea una fecha ISO string a formato corto (mes año)
 * @param dateString - Fecha en formato ISO
 * @returns Fecha formateada (ej: "mar de 2025")
 */
export function formatDateLimaShort(dateString: string): string {
    return formatDateLima(dateString, {
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Formatea una fecha ISO string a formato de solo fecha (dia/mes/año)
 * @param dateString - Fecha en formato ISO
 * @returns Fecha formateada (ej: "01/03/2025")
 */
export function formatDateLimaNumeric(dateString: string): string {
    return formatDateLima(dateString, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/**
 * Convierte una fecha del input type="date" (YYYY-MM-DD) a un Date object
 * interpretado en timezone de Lima
 * @param dateString - Fecha en formato YYYY-MM-DD
 * @returns Date object
 */
export function parseDateInputLima(dateString: string): Date {
    // Agregar hora del mediodía en Lima para evitar problemas de timezone
    return new Date(`${dateString}T12:00:00-05:00`);
}

/**
 * Convierte un Date object a formato YYYY-MM-DD para input type="date"
 * @param date - Date object o string ISO
 * @returns String en formato YYYY-MM-DD
 */
export function toDateInputValue(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    // Formatear en timezone de Lima
    const year = d.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'America/Lima' });
    const month = d.toLocaleDateString('en-US', { month: '2-digit', timeZone: 'America/Lima' });
    const day = d.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'America/Lima' });

    return `${year}-${month}-${day}`;
}
