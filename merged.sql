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

GRANT ALL ON TABLE public.comments TO service_role;-- POLICY: All users can read posts

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

GRANT ALL ON TABLE public.posts TO service_role;-- POLICY: Users can insert their own profile.

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

GRANT ALL ON TABLE public.profiles TO service_role;-- POLICY: All users can read votes

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

GRANT ALL ON TABLE public.votes TO service_role;-- FUNCTION: public.handle_new_user()

-- DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1) || '-' || floor(random() * 10000));
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

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO PUBLIC;-- Trigger: on_auth_user_created

-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created 
    AFTER INSERT ON auth.users 
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();