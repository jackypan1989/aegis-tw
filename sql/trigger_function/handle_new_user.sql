-- FUNCTION: public.handle_new_user()

-- DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
begin
  insert into public.profiles (id, "avatarUrl", username)
  values (new.id, 'https://www.gravatar.com/avatar/' || md5(new.email) || '?d=mp', split_part(new.email, '@', 1) || '-' || floor(random() * 10000));
  return new;
end;
$BODY$;

ALTER FUNCTION public.handle_new_user()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO PUBLIC;