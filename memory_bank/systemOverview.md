# Sarah's Kitchen Frontend Backup - System Overview

Last updated: 2026-06-24

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- React Router
- Context API

## Routing map

### Public routes

- `/`
- `/menu`
- `/carrito`
- `/checkout`
- `/confirmacion`
- `/rastrear`
- `/nosotros`
- `/faq`

### Admin routes

- `/admin`
- `/admin/productos`
- `/admin/productos/nuevo`
- `/admin/productos/:id`
- `/admin/pedidos`

## Core state containers

### `ProductsContext`

- Source of truth for catalog items.
- Uses browser persistence with `localStorage`.
- Supports CRUD-style updates used by admin screens.

### `CartContext`

- Manages cart line items, delivery date/time, and notes.
- Persists cart state in `localStorage`.

### `OrderContext`

- Creates and stores local orders.
- Persists orders in `localStorage`.
- Powers confirmation and tracking views.

## UI/UX posture

- The current visual language is already present and should be preserved.
- Client flow is good enough for design evaluation.
- Admin flow is usable for local/demo operations.

## Current architecture limits

- No server-backed auth.
- No server-backed order persistence.
- No real payment orchestration.
- No formal deployment metadata or runtime config layer.
- No Git repository initialized locally at the project root.

## Recommended integration posture

If we connect this frontend to the production-grade backend later, keep these seams isolated:

1. Product adapter
2. Cart-to-order adapter
3. Payment session adapter
4. Order status polling/tracking adapter

This will let us preserve the UI investment while swapping data sources safely.
