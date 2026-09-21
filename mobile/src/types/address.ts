/** Dirección local (mock) — sin mapas, geocoding ni APIs externas en esta fase. */
export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string | null;
  city: string;
  isDefault: boolean;
}
