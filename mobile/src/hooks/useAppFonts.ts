import { useFonts } from 'expo-font';

export interface AppFontsResult {
  loaded: boolean;
  error: Error | null;
}

/** Carga centralizada de las 4 fuentes oficiales de Bite Club. */
export function useAppFonts(): AppFontsResult {
  const [loaded, error] = useFonts({
    GlikerBlack: require('../../assets/fonts/Gliker-Black.ttf'),
    GothamBook: require('../../assets/fonts/Gotham-Book.otf'),
    GothamMedium: require('../../assets/fonts/Gotham-Medium.otf'),
    GothamBold: require('../../assets/fonts/Gotham-Bold.ttf'),
  });

  return { loaded, error: error ?? null };
}
