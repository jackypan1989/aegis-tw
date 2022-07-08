-- POLICY: Users can insert their own profile.

-- DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profile;

CREATE POLICY "All users can read comments"
    ON public.comments
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
-- POLICY: Only authenticated users can insert comments

-- DROP POLICY IF EXISTS "Only authenticated users can insert comments" ON public.comment;

CREATE POLICY "Only authenticated users can insert comments"
    ON public.comments
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
-- POLICY: Users can delete their own comments

-- DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;

CREATE POLICY "Users can delete their own comments"
    ON public.comments
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = commenter_id));

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;

ALTER TABLE IF EXISTS public.comments
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.comments TO supabase_admin;

GRANT ALL ON TABLE public.comments TO authenticated;

GRANT ALL ON TABLE public.comments TO anon;

GRANT ALL ON TABLE public.comments TO postgres;

GRANT ALL ON TABLE public.comments TO service_role;