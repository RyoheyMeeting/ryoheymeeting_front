import { useMemo, useEffect } from "react";
import { useReactionStats } from "hooks/ReactionStats/useReactionStats";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { usePresenters } from "hooks/Presenters/usePresenters";

export const useResultState = (grandPrixId: string) => {
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const { presenters, setGrandPrixId } = usePresenters();
  const { reactionStats } = useReactionStats(grandPrixId);

  useEffect(() => {
    setGrandPrixId(grandPrixId);
  }, [grandPrixId]);

  const sortedReactionStats = useMemo(() => {
    return reactionStats?.sort((a, b) => {
      if (!a.stat) return 1;
      if (!b.stat) return -1;
      return b.stat.total - a.stat.total;
    });
  }, [reactionStats]);

  return {
    grandPrix: grandPrixes[grandPrixId],
    presenters,
    sortedReactionStats,
  };
};
