-- Persist the leader WhatsApp number sent in p_members.leader_whatsapp_no.
-- Run this once in the Supabase SQL Editor if migrations are not automated.

alter table public.team_members
  add column if not exists leader_whatsapp_no text;

alter table public.team_members
  alter column leader_whatsapp_no type text
  using leader_whatsapp_no::text;

create or replace function public.register_team(
  p_team_name text,
  p_member_count integer,
  p_members jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  new_team_id public.teams.id%type;
  actual_member_count integer;
begin
  actual_member_count := jsonb_array_length(p_members);

  if nullif(btrim(p_team_name), '') is null then
    raise exception 'Team name is required';
  end if;

  if p_member_count < 1 or p_member_count > 3
     or actual_member_count <> p_member_count then
    raise exception 'A team must contain between 1 and 3 members';
  end if;

  if nullif(btrim(p_members->0->>'leader_whatsapp_no'), '') is null then
    raise exception 'Leader WhatsApp number is required';
  end if;

  insert into public.teams (team_name, member_count)
  values (btrim(p_team_name), p_member_count)
  returning id into new_team_id;

  insert into public.team_members (
    team_id,
    name,
    registration_number,
    email,
    role,
    hackerrank_email,
    leader_whatsapp_no
  )
  select
    new_team_id,
    member.name,
    member.registration_number,
    lower(member.email),
    member.role,
    nullif(lower(member.hackerrank_email), ''),
    btrim(member.leader_whatsapp_no)
  from jsonb_to_recordset(p_members) as member(
    name text,
    registration_number text,
    email text,
    role text,
    hackerrank_email text,
    leader_whatsapp_no text
  );

  return jsonb_build_object('team_id', new_team_id);
end;
$$;

revoke all on function public.register_team(text, integer, jsonb) from public;
grant execute on function public.register_team(text, integer, jsonb) to anon;

notify pgrst, 'reload schema';

select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'team_members'
  and column_name = 'leader_whatsapp_no';
