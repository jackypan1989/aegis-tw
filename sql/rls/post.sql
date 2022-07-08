-- POLICY: All users can read posts

-- DROP POLICY IF EXISTS "All users can read posts" ON public.posts;

CREATE POLICY "All users can read posts"
    ON public.posts
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
-- POLICY: Only authenticated users can insert posts

-- DROP POLICY IF EXISTS "Only authenticated users can insert posts" ON public.posts;

CREATE POLICY "Only authenticated users can insert posts"
    ON public.posts
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
-- POLICY: Users can delete their own posts

-- DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;

CREATE POLICY "Users can delete their own posts"
    ON public.posts
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = poster_id));

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

ALTER TABLE IF EXISTS public.posts
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.posts TO anon;

GRANT ALL ON TABLE public.posts TO postgres;

GRANT ALL ON TABLE public.posts TO supabase_admin;

GRANT ALL ON TABLE public.posts TO authenticated;

GRANT ALL ON TABLE public.posts TO service_role;