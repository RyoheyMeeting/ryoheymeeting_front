import { useMemo } from "react";
import { useReactionStats } from "hooks/ReactionStats/useReactionStats";

export const useResultState = (grandPrixId: string) => {
  const { reactionStats } = useReactionStats(grandPrixId);

  const sortedReactionStats = useMemo(() => {
    return reactionStats?.sort((a, b) => {
      if (!a.stat) return 1;
      if (!b.stat) return -1;
      return a.stat.total - b.stat.total;
    });
  }, [reactionStats]);

  return {
    sortedReactionStats,
  };
};
