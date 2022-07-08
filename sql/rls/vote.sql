-- POLICY: All users can read votes

-- DROP POLICY IF EXISTS "All users can read votes" ON public.votes;

CREATE POLICY "All users can read votes"
    ON public.votes
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
-- POLICY: Only authenticated users can insert votes

-- DROP POLICY IF EXISTS "Only authenticated users can insert votes" ON public.votes;

CREATE POLICY "Only authenticated users can insert votes"
    ON public.votes
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
-- POLICY: Users can delete their own votes

-- DROP POLICY IF EXISTS "Users can delete their own votes" ON public.votes;

CREATE POLICY "Users can delete their own votes"
    ON public.votes
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = voter_id));

ALTER TABLE IF EXISTS public.votes
    OWNER to postgres;

ALTER TABLE IF EXISTS public.votes
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.votes TO supabase_admin;

GRANT ALL ON TABLE public.votes TO authenticated;

GRANT ALL ON TABLE public.votes TO anon;

GRANT ALL ON TABLE public.votes TO postgres;

GRANT ALL ON TABLE public.votes TO service_role;