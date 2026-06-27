# Plan Notes — Brutalism Finance Dashboard

Dashboard pencatatan keuangan personal/kolaboratif. **Frontend only** (Nuxt 3 + Tailwind v4) dengan mock Nitro API yang bisa di-swap ke backend asli lewat env.

## Stack
- **Nuxt 3** + TypeScript
- **Tailwind CSS v4** (CSS-first `@theme`)
- **Pinia** (state per domain) + **VueUse** (responsive JS)
- **vee-validate + Zod** (form validation typed)
- **vue-chartjs + chart.js** (grafik)
- **lucide-vue-next** (ikon)

## Design
- Style: **Neo-brutalism** (border tebal, hard shadow, font heavy)
- Palet: **vintage retro** (cream, mustard, burnt orange, terracotta, olive, teal)
- Font: Archivo Black (display), Space Grotesk (body), Space Mono (numeric)
- Responsive: **JS-driven** via `useAppBreakpoints` — pakai `v-if="isDesktop"` bukan `md:` Tailwind

## Setup

```bash
pnpm install
pnpm dev
# http://localhost:3000
```

Login demo: `demo@plannotes.id` / `demo123`

## Menyambungkan ke backend

```bash
# .env
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
```

Backend harus mematuhi kontrak yang sama dengan mock di `server/api/**`. ERD lengkap di plan file.

## Struktur

```
components/
├── ui/             # Primitives brutalism (BButton, BCard, BInput, ...)
├── layout/         # Sidebar, Topbar, MobileBottomNav
├── dashboard/      # Komponen dashboard
├── plans/          # Komponen plan
└── transactions/   # Komponen transaksi

composables/        # useApi, useAppBreakpoints, useToast, useCurrency
stores/             # Pinia stores
pages/              # File-based routes
server/api/         # Mock Nitro endpoints (siap diganti backend asli)
types/              # TypeScript interfaces (sinkron dengan ERD)
utils/              # format.ts, schemas.ts (Zod), plan-helpers.ts
assets/css/main.css # @theme tokens + utility brutalism
```

## ERD untuk Backend

Lihat plan file di `~/.claude/plans/` atau ringkasannya di bawah:

- `users` (id, email, name, password_hash, avatar_url, created_at)
- `plans` (id, owner_id FK, name, type [saving|installment|expense], target_amount, current_amount, due_date, status, color, created_at)
- `plan_members` (id, plan_id FK, user_id FK, role [owner|editor|viewer], joined_at)
- `invitations` (id, plan_id FK, email, invited_by FK, role, token UQ, status [pending|accepted|rejected|expired], expires_at, created_at)
- `transactions` (id, user_id FK, plan_id FK nullable, type [income|expense|saving_in|saving_out|installment_payment], amount, description, category_id FK nullable, occurred_at, created_at)
- `categories` (id, user_id FK, name, color, icon)

### Business rule penting

- `plans.current_amount` direkalkulasi dari sum transactions sesuai `plan.type`:
  - **saving**: `+saving_in - saving_out`
  - **installment**: `+installment_payment`
  - **expense**: `+expense`
- `plan_members` unique `(plan_id, user_id)`
- `invitations.token` UUID → link `/invitations/{token}/accept`

## Endpoints kontrak (mock)

| Method | Path | Keterangan |
|---|---|---|
| POST | `/auth/login` | `{ email, password }` → `{ token, user }` |
| POST | `/auth/register` | `{ name, email, password }` → `{ token, user }` |
| GET | `/auth/me` | current user (Bearer) |
| GET | `/plans` | list plan milik/diikuti user |
| POST | `/plans` | buat plan |
| GET | `/plans/:id` | detail |
| PATCH | `/plans/:id` | update |
| DELETE | `/plans/:id` | hapus |
| GET | `/plans/:id/members` | list member |
| POST | `/plans/:id/invite` | `{ email, role }` → invitation |
| GET | `/transactions` | list (filtered by user) |
| POST | `/transactions` | buat + recompute plan |
| DELETE | `/transactions/:id` | hapus + recompute |
| GET | `/transactions/summary` | `{ income, expense, net, byDay[] }` |
| GET | `/invitations?direction=sent` | inbox / sent |
| POST | `/invitations/:token/accept` | terima + buat member |
| POST | `/invitations/:token/reject` | tolak |

## Catatan

- Auth pakai cookie `auth_token` (Bearer dari mock). Saat ke backend asli, sesuaikan dengan strategi JWT/OAuth Anda di `composables/useApi.ts`.
- Semua palet/font tokens ada di `assets/css/main.css` — modifikasi di satu tempat akan menyebar ke seluruh app.
- Responsive sengaja **tidak** pakai `md:`/`lg:` Tailwind — semua via `isDesktop`/`isMobile` dari `useAppBreakpoints()`.
