create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.item_progress (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  item_id text not null,
  item_type text not null check (item_type in ('trap', 'event', 'ordering-set')),
  mastery numeric not null default 0,
  streak integer not null default 0,
  ease numeric not null default 1.4,
  due_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (profile_id, item_id)
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('akatsak', 'ordenatu')),
  score numeric not null,
  max_score numeric not null,
  detail jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.item_progress enable row level security;
alter table public.attempts enable row level security;

drop policy if exists "Public username profiles" on public.profiles;
drop policy if exists "Public progress by username app" on public.item_progress;
drop policy if exists "Public attempts by username app" on public.attempts;

create policy "Public username profiles"
on public.profiles
for all
using (true)
with check (true);

create policy "Public progress by username app"
on public.item_progress
for all
using (true)
with check (true);

create policy "Public attempts by username app"
on public.attempts
for all
using (true)
with check (true);

create index if not exists item_progress_profile_due_idx on public.item_progress(profile_id, due_at);
create index if not exists attempts_profile_created_idx on public.attempts(profile_id, created_at desc);
