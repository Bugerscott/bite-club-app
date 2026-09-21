/**
 * Generador de IDs locales simple (sin dependencia externa tipo uuid), para
 * identificar líneas de carrito, direcciones nuevas, etc. Solo para estado
 * local en esta fase — no se usa como identificador de backend.
 */
export function generateLocalId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
