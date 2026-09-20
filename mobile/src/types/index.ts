export * from './product';
export * from './category';
export * from './offer';
export * from './reward';
export * from './order';
export * from './user';
// database.ts NO se re-exporta aquí a propósito: son los tipos ligados 1:1 al
// esquema de Supabase (ver supabase/migrations/), con su propia semántica
// (incluye el aviso server-controlled de points_balance). Importar
// explícitamente desde './database' cuando se necesiten.
