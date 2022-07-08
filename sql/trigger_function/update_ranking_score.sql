-- FUNCTION: public.update_ranking_score()

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

