import type { Product } from '../types';

/**
 * Productos mock usando nombres reales ya conocidos de Bite Club (instrucciones
 * del usuario, sección 29). NO se inventaron precios ni descripciones
 * comerciales: `price: null` y `shortDescription` con placeholder de
 * desarrollo explícito hasta que existan copy y precios aprobados.
 *
 * `categoryId` es una asignación estructural propuesta por Claude para poder
 * probar CategoryChip/ProductCard — DECISIÓN PENDIENTE DE APROBACIÓN, no una
 * clasificación oficial confirmada contigo.
 */
export const mockProducts: Product[] = [
  {
    id: 'bs-bite',
    name: "B's Bite",
    shortDescription: '[DEV] Descripción pendiente de aprobar.',
    categoryId: 'bites',
    price: null,
    imageKey: null,
    available: true,
    badge: null,
  },
  {
    id: 'sweet-bite',
    name: 'Sweet Bite',
    shortDescription: '[DEV] Descripción pendiente de aprobar.',
    categoryId: 'bites',
    price: null,
    imageKey: null,
    available: true,
    badge: null,
  },
  {
    id: 'cheesy-bite',
    name: 'Cheesy Bite',
    shortDescription: '[DEV] Descripción pendiente de aprobar.',
    categoryId: 'bites',
    price: null,
    imageKey: null,
    available: true,
    badge: null,
  },
  {
    id: 'mordida-nica',
    name: 'Mordida Nica',
    shortDescription: '[DEV] Descripción pendiente de aprobar.',
    categoryId: 'bites',
    price: null,
    imageKey: null,
    available: true,
    badge: null,
  },
  {
    id: 'croqueta-bites',
    name: 'Croqueta Bites',
    shortDescription: '[DEV] Descripción pendiente de aprobar.',
    categoryId: 'bites',
    price: null,
    imageKey: null,
    available: true,
    badge: null,
  },
  {
    id: 'papas-bravas',
    name: 'Papas Bravas',
    shortDescription: '[DEV] Descripción pendiente de aprobar.',
    categoryId: 'sides',
    price: null,
    imageKey: null,
    available: true,
    badge: null,
  },
];
