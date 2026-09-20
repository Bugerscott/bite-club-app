/**
 * Radios de borde oficiales de Bite Club.
 * FUENTE: instrucciones del usuario, sección "8. RADIOS".
 * No crear radios arbitrarios por pantalla.
 */
export const radius = {
  /** Card principal. */
  card: 20,
  /** Botón. */
  button: 16,
  /** Input. */
  input: 16,
  /** Pill / chip completamente redondo (usar junto a height/2 o un valor alto fijo). */
  pill: 999,
  /**
   * Icon button — "circular" según las instrucciones. Se resuelve con este mismo
   * valor (999), que en un contenedor cuadrado (sizes.iconButton x sizes.iconButton)
   * produce un círculo perfecto sin necesitar un token nuevo.
   */
  iconButton: 999,
} as const;

export type RadiusToken = keyof typeof radius;
