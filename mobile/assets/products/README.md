# products/ — Fotografías reales de productos

Productos con fotografía real anunciada (fuente: master prompt, sección 8):

| Producto | Convención de archivo sugerida | `imageKey` usado en `mocks/products.ts` |
|---|---|---|
| B's Bite | `bs-bite-01.jpg` | `bs-bite-01` |
| Cheesy Bite | `cheesy-bite-01.jpg` | `cheesy-bite-01` |
| Mediterránea | `mediterranea-01.jpg` | `mediterranea-01` |
| Mordida Nica | `mordida-nica-01.jpg` … `mordida-nica-04.jpg` (galería amplia — producto estrella) | `mordida-nica-01`…`04` |
| Sweet Bite | `sweet-bite-01.jpg` | `sweet-bite-01` |

⚠️ **Ninguno de estos archivos existe todavía en esta carpeta.** Los
`imageKey` de arriba ya están cargados en `mocks/products.ts` siguiendo esta
convención — cuando lleguen los archivos reales, solo hace falta:

1. Copiar las fotos aquí con estos nombres exactos (si los nombres reales que
   entregues son distintos, avisar para actualizar `mocks/products.ts` y no
   perder ningún archivo).
2. Agregar cada `require()` en `mobile/src/lib/productImages.ts`
   (`productImageMap`) — es el único lugar donde se resuelven imágenes de
   producto, así que ningún componente necesita cambios.

El resto de productos del menú (Croqueta Bites, Algo Rico, Papas Bravas,
milkshakes, postres, bebidas) no tiene fotografía real anunciada todavía —
usan placeholder visual (`images: []`).

No se usa stock ni imágenes externas. No sobrescribir destructivamente los
archivos master que se agreguen aquí.
