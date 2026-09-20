import { Platform, type ViewStyle } from 'react-native';
import { colors } from './colors';

/**
 * Sombras de Bite Club.
 * FUENTE: instrucciones del usuario, sección "10. SOMBRAS" — "MUY suaves",
 * evitar efecto pesado. Un único estilo de sombra ligera, reutilizado en
 * todas las cards (no crear una sombra distinta por pantalla).
 */
export const shadows: Record<'none' | 'soft', ViewStyle> = {
  none: {},
  soft: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.text,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) as ViewStyle,
};

export type ShadowToken = keyof typeof shadows;
