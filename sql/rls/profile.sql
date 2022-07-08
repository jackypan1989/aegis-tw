-- POLICY: Users can insert their own profile.

-- DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;

CREATE POLICY "Users can insert their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((auth.uid() = id));
-- POLICY: Users can read everyone's profiles

-- DROP POLICY IF EXISTS "Users can read everyone's profiles" ON public.profiles;

CREATE POLICY "Users can read everyone's profiles"
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
-- POLICY: Users can update own profile.

-- DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

CREATE POLICY "Users can update own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = id));

ALTER TABLE IF EXISTS public.profiles
    OWNER to postgres;

ALTER TABLE IF EXISTS public.profiles
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.profiles TO supabase_admin;

GRANT ALL ON TABLE public.profiles TO authenticated;

GRANT ALL ON TABLE public.profiles TO anon;

GRANT ALL ON TABLE public.profiles TO postgres;

GRANT ALL ON TABLE public.profiles TO service_role;