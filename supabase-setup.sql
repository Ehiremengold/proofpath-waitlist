-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

create table public.waitlist (
  id         bigint generated always as identity primary key,
  email      text not null unique,
  role       text not null check (role in ('seeker', 'recruiter')),
  created_at timestamptz default now()
);

-- Enable Row Level Security (keeps data private)
alter table public.waitlist enable row level security;

-- Only the service role (server-side) can read/write — no public access
create policy "service role only"
  on public.waitlist
  for all
  to service_role
  using (true)
  with check (true);
