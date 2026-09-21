# brand/ — Assets de marca oficiales

Archivos esperados (nombres exactos, fuente: master prompt sección 5):

| Archivo | Uso |
|---|---|
| `Bite-Club-_isotipo.png` | Isotipo (marca gráfica sin texto) |
| `Bite-Club-_isotipo-white.png` | Isotipo, versión blanca (fondos oscuros/rojos) |
| `Bite-Club-_logo-primary.png` | Logo completo, sobre fondos claros |
| `Bite-Club-_logo-white.png` | Logo completo, versión blanca, sobre fondos rojos/oscuros |

⚠️ **Ninguno de estos 4 archivos existe todavía en esta carpeta.** El Home
(`app/(tabs)/index.tsx`) usa por ahora un texto "Bite Club" con
`typography.display` (GlikerBlack) como placeholder del logo, en vez de una
imagen — para no reconstruir ni aproximar el logo real sin tenerlo.

## Cómo activar

1. Copiar los 4 archivos aquí con los nombres exactos de la tabla.
2. Reemplazar el texto placeholder del header de Inicio por
   `<Image source={require('../../assets/brand/Bite-Club-_logo-primary.png')} />`.
3. No reconstruir ni modificar el logo — usar los archivos tal cual se entreguen.
