import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionList, BoostAction, HotItem, Reaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { reloadAllActionsAsync } from "services/RealtimeGrandPrix/StatsGrandPrix";
import { Stamp } from "services/Stamps/Stamps";
import { StampType } from "services/StampTypes/StampTypes";
import { RootState } from "store";
import { COLLVO_POINT } from "styles/constants/constants";
import { Dict } from "Types/Utils";

type ReactionCounts = {
  good: {
    reaction: number;
    boost: number;
  };
  psycho: {
    reaction: number;
    boost: number;
  };
  wait: {
    reaction: number;
    boost: number;
  };
};

type ReactionStat = {
  presenterId: string;
  stat?: {
    count: ReactionCounts;
    total: number;
  };
};

type Reactions = ActionList<HotItem<Reaction>>;

const countReactions = (
  reactions: Reactions,
  boostActions: ActionList<HotItem<BoostAction>>,
  stamps: Dict<Stamp>,
  stampTypes: Dict<StampType>
) => {
  return reactions.sortedKey.reduce<ReactionCounts>(
    (reactionStat, value) => {
      const reaction = reactions.data[value];
      const stamp = stamps[reaction.stampId];
      if (!stamp) throw Error("スタンプのデータが存在しないため、順位を計算できませんでした。");

      const stampType = stampTypes[stamp.typeId];
      if (!stampType) throw Error("スタンプタイプのデータが存在しないため、順位を計算できませんでした。");

      let isBoost = false;
      boostActions.sortedKey.forEach((bid) => {
        const boostAction = boostActions.data[bid];
        const boostStart = boostAction.sendAt;
        const boostEnd = new Date(boostStart.getTime() + COLLVO_POINT.BOOST_ACTION.DURATION * 1000);
        if (boostStart < reaction.sendAt && reaction.sendAt < boostEnd) {
          isBoost = true;
          return;
        }
      });

      const count = isBoost ? COLLVO_POINT.BOOST_ACTION.CP_MAG : 1;

      if (stampType.name === "good") {
        reactionStat.good = {
          reaction: reactionStat.good.reaction + count,
          boost: reactionStat.good.boost + (isBoost ? count : 0),
        };
      } else if (stampType.name === "psycho") {
        reactionStat.psycho = {
          reaction: reactionStat.psycho.reaction + count,
          boost: reactionStat.psycho.boost + (isBoost ? count : 0),
        };
      } else if (stampType.name === "wait") {
        reactionStat.wait = {
          reaction: reactionStat.wait.reaction + count,
          boost: reactionStat.wait.boost + (isBoost ? count : 0),
        };
      }

      return reactionStat;
    },
    {
      good: {
        reaction: 0,
        boost: 0,
      },
      psycho: {
        reaction: 0,
        boost: 0,
      },
      wait: {
        reaction: 0,
        boost: 0,
      },
    }
  );
};

const combineReactions = (a: Reactions, b: Reactions): Reactions => {
  return {
    sortedKey: a.sortedKey.concat(b.sortedKey),
    data: {
      ...a.data,
      ...b.data,
    },
  };
};

export const useReactionStats = (grandPrixId: string) => {
  const { stampTypes } = useSelector((state: RootState) => state.stampTypes);
  const { stamps } = useSelector((state: RootState) => state.stamps);

  const statsGrandPrix = useSelector((state: RootState) => state.statsGrandPrix);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reloadAllActionsAsync(grandPrixId));
  }, [grandPrixId]);

  const reactionStats = useMemo<ReactionStat[] | undefined>(() => {
    if (!statsGrandPrix[grandPrixId] || !stamps || !stampTypes) return undefined;
    const stats = Object.keys(statsGrandPrix[grandPrixId])
      .map((pid) => {
        const plainReactions = statsGrandPrix[grandPrixId][pid].plainReactions;
        const messageReactions = statsGrandPrix[grandPrixId][pid].messageReactions;
        const boostActions = statsGrandPrix[grandPrixId][pid].boostActions;

        const reactions = combineReactions(plainReactions, messageReactions);
        try {
          const stat = countReactions(reactions, boostActions, stamps, stampTypes);

          return {
            presenterId: pid,
            stat: {
              count: stat,
              total: stat.good.reaction + stat.psycho.reaction + stat.wait.reaction,
            },
          };
        } catch (e) {
          console.error(e);
          return {
            presenterId: pid,
          };
        }
      })
      .filter((e) => e);

    return stats;
  }, [statsGrandPrix, stamps, stampTypes, grandPrixId]);

  return {
    /** 集計されたリアクション数を返す */
    reactionStats,
  };
};
