-- Secure public registration setup. Run once in Supabase SQL Editor.
-- RLS stays enabled; the browser receives only the RPC result.

alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.team_members
	add column if not exists leader_whatsapp_no text;
alter table public.team_members
	alter column leader_whatsapp_no type text
	using leader_whatsapp_no::text;
grant usage on schema public to anon;

revoke all on table public.teams from anon;
revoke all on table public.team_members from anon;

drop policy if exists "Public can register teams" on public.teams;
drop policy if exists "Public can read registered team id" on public.teams;
drop policy if exists "Public can register team members" on public.team_members;

drop function if exists public.register_team(text, integer, jsonb);
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

-- Refresh PostgREST's function schema cache immediately.
notify pgrst, 'reload schema';

-- Verify that RLS remains enabled and the RPC is callable by anon.
select relname, relrowsecurity
from pg_class
where oid in ('public.teams'::regclass, 'public.team_members'::regclass);

select routine_schema, routine_name, grantee, privilege_type
from information_schema.routine_privileges
where routine_schema = 'public'
	and routine_name = 'register_team';
