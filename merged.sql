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

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO PUBLIC;-- FUNCTION: public.update_ranking_score()

-- DROP FUNCTION IF EXISTS public.update_ranking_score();

CREATE OR REPLACE FUNCTION public.update_ranking_score()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
BEGIN

WITH r AS (
SELECT
	coalesce(votes.post_id, posts.id) AS post_id,
	coalesce(sum(1), 0) AS vote_count,
    round(
        coalesce(
            power(coalesce(sum(1), 0), 0.8) / power((DATE_PART('day', now() - posts.created_at) * 24 + DATE_PART('hour', now() - posts.created_at) + 2), 1.8) * 1000000 / (posts.view_count + 1)
            , -2147483648
        )::numeric 
    , 0) AS ranking_score
FROM
	votes
	RIGHT JOIN posts ON votes.post_id = posts.id
GROUP BY
	posts.id,
	votes.post_id
)

UPDATE
	public.posts
SET
	vote_count = r.vote_count,
    ranking_score = r.ranking_score
FROM
	r
WHERE
	r.post_id = public.posts.id;

RETURN new;
END;
$BODY$;

ALTER FUNCTION public.update_ranking_score()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.update_ranking_score() TO authenticated;

GRANT EXECUTE ON FUNCTION public.update_ranking_score() TO postgres;

GRANT EXECUTE ON FUNCTION public.update_ranking_score() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.update_ranking_score() TO anon;

GRANT EXECUTE ON FUNCTION public.update_ranking_score() TO service_role;

-- Trigger: on_auth_user_created

-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created 
    AFTER INSERT ON auth.users 
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();-- Trigger: on_vote_created

-- DROP TRIGGER IF EXISTS on_vote_created ON public.vote;

CREATE TRIGGER on_vote_created
    AFTER INSERT
    ON public.votes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_ranking_score();

-- Trigger: on_vote_deleted

-- DROP TRIGGER IF EXISTS on_vote_deleted ON public.vote;

CREATE TRIGGER on_vote_deleted
    AFTER DELETE
    ON public.votes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_ranking_score();