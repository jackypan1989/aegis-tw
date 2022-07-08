-- Trigger: on_vote_created

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