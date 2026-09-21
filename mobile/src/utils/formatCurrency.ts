/**
 * Formatea un monto en córdobas: formatCurrency(410) -> "C$410".
 * Redondea a entero (el menú oficial no usa centavos) y aplica separador de
 * miles en montos grandes (totales de carrito).
 */
export function formatCurrency(amount: number): string {
  return `C$${Math.round(amount).toLocaleString('es-NI')}`;
}
