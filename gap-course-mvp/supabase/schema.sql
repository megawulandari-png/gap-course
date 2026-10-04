create extension if not exists pgcrypto;

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade text,
  school text,
  subject text,
  rate integer not null default 0,
  access_code text unique not null,
  parent_name text,
  parent_whatsapp text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  session_date date not null default current_date,
  subject text not null,
  topic text,
  tutor_name text,
  status text not null default 'scheduled' check (status in ('scheduled','open','closed','cancelled')),
  opens_at timestamptz,
  closes_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists reflections (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  session_id uuid not null references sessions(id) on delete cascade,
  attendance_status text not null default 'present',
  understanding integer not null check (understanding between 1 and 4),
  learned text not null,
  difficulty text not null,
  created_at timestamptz not null default now(),
  unique(student_id, session_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  amount integer not null,
  paid_at date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

alter table students enable row level security;
alter table sessions enable row level security;
alter table reflections enable row level security;
alter table payments enable row level security;

-- This MVP uses the server-side service role key for all database access.
-- Therefore no public RLS policies are required.
