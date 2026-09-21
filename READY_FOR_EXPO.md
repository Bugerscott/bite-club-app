# Bite Club — Proyecto listo para revisión en Expo

Este paquete une la Fase Frontend 2 con los assets oficiales suministrados por el usuario.

## Correcciones aplicadas

- `newArchEnabled` eliminado de `app.json`.
- `baseUrl` eliminado de `tsconfig.json`.
- Icon, adaptive icon, monochrome icon, favicon y splash nativo apuntan a los assets oficiales.
- Gotham Book/Medium/Bold y Gliker Black cargadas realmente con `expo-font`.
- `splash-animation.mp4` integrado con `expo-video`.
- Logo oficial utilizado en Inicio.
- 25 fotografías de producto optimizadas y conectadas mediante `productImages.ts`.
- Mordida Nica configurada con 8 fotografías y prioridad visual.
- Nota de donación corregida: pertenece a Papas Bravas.
- Eliminadas descripciones comerciales inventadas de milk shakes, postres y bebidas.
- Eliminado copy de campaña no aprobado en Ofertas.
- Grid de productos y recompensas ajustado para pantallas pequeñas.
- Galería de producto adaptada al ancho real de pantalla.
- Tipografía del tab bar tomada del Design System.
- `supabase/migrations/` no fue modificado.

## En Windows

Desde la carpeta `mobile`:

```powershell
npm.cmd install
npx.cmd expo install --fix
npx.cmd expo-doctor
npm.cmd run typecheck
npm.cmd start
```

Para esta revisión puramente frontend no es necesario conectar Supabase si ninguna pantalla importa todavía el cliente `src/lib/supabase.ts`.
