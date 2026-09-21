# Frontend Architecture — Bite Club

## Estructura

```text
mobile/
├── app/               Expo Router: tabs + flujos secundarios
├── assets/            brand, app, fonts, products
└── src/
    ├── components/    librería compartida
    ├── features/      componentes compuestos por flujo
    ├── hooks/         fuentes y hooks comunes
    ├── lib/           Supabase client + resolver de imágenes
    ├── mocks/         datos locales de esta fase
    ├── state/         Context + reducer para carrito/app
    ├── theme/         tokens oficiales
    ├── types/         tipos UI y database separados
    └── utils/         helpers
```

## Navegación

Tabs oficiales:

- Inicio
- Club
- Pedir
- Ofertas
- Más

Rutas construidas:

- `/product/[id]`
- `/cart`
- `/delivery`
- `/addresses`
- `/checkout`
- `/order-confirmation`
- `/order-tracking`
- `/order-history`
- `/reward/[id]`
- `/points-history`
- `/profile`
- `/notifications`
- `/support`

## Estado frontend

`CartContext` maneja carrito, cantidades, extras y subtotal. `AppStateContext` maneja método de entrega, direcciones y pedido mock actual. No hay persistencia backend en esta fase.

## Datos

Los tipos UI/mocks están separados de `src/types/database.ts`. Esto permite probar toda la experiencia sin modificar el esquema histórico de Supabase.

## Assets

- Fuentes reales: `assets/fonts/`.
- Logos: `assets/brand/`.
- App icon/splash: `assets/app/`.
- Fotos optimizadas: `assets/products/`.
- Mapeo estático de fotos: `src/lib/productImages.ts`.

## Splash

Flujo:

1. splash nativo estático (`expo-splash-screen`)
2. carga de fuentes
3. primer frame del MP4
4. se oculta splash nativo
5. `expo-video` reproduce el MP4 una vez
6. se monta la navegación principal
