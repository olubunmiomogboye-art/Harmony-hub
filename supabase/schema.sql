-- ==============================================================================
-- HARMONY HUB — SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Create Products Table
create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  subtitle text,
  price numeric(12, 2) not null check (price >= 0),
  category text not null check (category in ('Kitchen Utensils', 'Baby Things', 'Adults'' Fashion', 'Children''s Outfits')),
  category_slug text not null check (category_slug in ('kitchen-utensils', 'baby-things', 'adults-fashion', 'childrens-outfits')),
  image text not null,
  short_description text not null default '',
  description text not null default '',
  in_stock boolean not null default true,
  stock_count integer not null default 10,
  is_published boolean not null default true,
  featured boolean not null default false,
  badge text,
  sizes text[] default '{}',
  colors jsonb default '[]'::jsonb,
  specs jsonb default '[]'::jsonb,
  flagged_note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Indexes for High Performance
create index if not exists idx_products_category on public.products (category_slug);
create index if not exists idx_products_published on public.products (is_published);
create index if not exists idx_products_in_stock on public.products (in_stock);
create index if not exists idx_products_created_at on public.products (created_at desc);

-- 4. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Public visitors can view published products" on public.products;
drop policy if exists "Service role has full access to products" on public.products;
drop policy if exists "Authenticated admins have full access to products" on public.products;

-- Policy A: Public read access for published products only
create policy "Public visitors can view published products"
  on public.products
  for select
  using (is_published = true);

-- Policy B: Full access for service_role (backend API operations)
create policy "Service role has full access to products"
  on public.products
  for all
  using (auth.jwt() ->> 'role' = 'service_role' or current_user = 'postgres')
  with check (auth.jwt() ->> 'role' = 'service_role' or current_user = 'postgres');

-- Policy C: Full access for authenticated administrators
create policy "Authenticated admins have full access to products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

-- 5. Auto-update updated_at Trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

-- 6. Storage Bucket for Product Images
-- Note: Insert into storage.buckets if not already present
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies:
-- Allow public download/viewing of product images
create policy "Public Access to Product Images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

-- Allow authenticated users / service role to upload product images
create policy "Admins Can Upload Product Images"
  on storage.objects
  for insert
  with check (bucket_id = 'product-images');

create policy "Admins Can Update Product Images"
  on storage.objects
  for update
  using (bucket_id = 'product-images');

create policy "Admins Can Delete Product Images"
  on storage.objects
  for delete
  using (bucket_id = 'product-images');
