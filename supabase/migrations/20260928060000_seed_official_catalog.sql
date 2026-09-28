-- Seed del catalogo oficial ya definido en la app. Migracion aditiva; no modifica initial_schema.
-- legacy_key conserva el identificador estable del menu local sin usar IDs generados como referencias.
alter table public.products add column if not exists legacy_key text;
create unique index if not exists idx_products_legacy_key on public.products(legacy_key) where legacy_key is not null;

insert into public.products (legacy_key, name, description, category, price, active, sort_order)
values
('bs-bite', 'B''s Bite', 'Pan de papa, 2ble carne smash blend original, 2ble queso, salsa Bite, lechuga, cebolla y pepinillos.', 'smash-burgers', 330, true, 10),
('sweet-bite', 'Sweet Bite', 'Pan de papa, carne smash blend original, queso, salsa BBQ, bacon y cebolla caramelizada.', 'smash-burgers', 280, true, 20),
('cheesy-bite', 'Cheesy Bite', 'Pan de papa, carne smash blend original, 2ble queso, salsa Bite y pepinillos.', 'smash-burgers', 250, true, 30),
('mediterranea', 'Mediterránea', 'Pan de papa, 2ble carne medallón 100g blend original, Aioli de la casa, lechuga, bacon y cebolla caramelizada.', 'especialidades', 400, true, 40),
('mordida-nica', 'Mordida Nica', 'Pan de papa, 2ble carne medallón 100g blend original, crema cilantro, cuajada seca, cebolla encurtida con chile y bacon.', 'especialidades', 410, true, 50),
('croqueta-bites', 'Croqueta Bites', 'Las croquetas son una mezcla cremosa de pollo en salsa blanca, empanizada y frita hasta quedar crujiente.', 'starters', 200, true, 60),
('algo-rico', 'Algo Rico', '¿Lo que se te antoja comer y no sabes qué es? Son papas fritas con crema de cilantro, trozos de bacon, cuajada seca y cebolla caramelizada.', 'starters', 180, true, 70),
('papas-bravas', 'Papas Bravas', 'Papas cortadas en cubos crujientes bañadas en una salsa poco picante pero llena de sabor.', 'starters', 200, true, 80),
('milkshake-fresa', 'Milk Shake — Fresa', '', 'shakes-postres', 180, true, 90),
('milkshake-chocolate', 'Milk Shake — Chocolate', '', 'shakes-postres', 180, true, 100),
('milkshake-banano', 'Milk Shake — Banano', '', 'shakes-postres', 180, true, 110),
('milkshake-caramelo', 'Milk Shake — Caramelo', '', 'shakes-postres', 180, true, 120),
('brownie-bite', 'Brownie Bite', '', 'shakes-postres', 60, true, 130),
('cheesecake-bite', 'Cheese Cake Bite', '', 'shakes-postres', 60, true, 140),
('coca-cola', 'Coca Cola', '', 'bebidas', 40, true, 150),
('jugo', 'Jugo', '', 'bebidas', 40, true, 160),
('agua', 'Agua', '', 'bebidas', 30, true, 170),
('cafe', 'Café', '', 'bebidas', 20, true, 180)
on conflict (legacy_key) where legacy_key is not null do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  price = excluded.price,
  active = excluded.active,
  sort_order = excluded.sort_order,
  updated_at = now();
