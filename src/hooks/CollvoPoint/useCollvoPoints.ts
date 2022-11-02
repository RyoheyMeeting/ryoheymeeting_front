import { useCallback, useEffect, useState } from "react";
import { usePresenters } from "hooks/Presenters/usePresenters";
import { IndividualPresenterCollvoPoint, useCollvoPoint } from "./useCollvoPoint";
import { COLLVO_POINT } from "styles/constants/constants";
import { Dict } from "Types/Utils";
import { ActionList } from "services/RealtimeGrandPrix/RealtimeGrandPrix";

export type PresenterCollvoPoint = {
  presenterId: string;
  reactionPoint: number;
  boostPoint: number;
  rank: number;
  rankPoint: number;
  totalPoint: number;
};

export type IResponse = {
  /**
   * プレゼンターが所有するコルボポイント
   */
  presenterCollvoPoints: ActionList<PresenterCollvoPoint>;
  reload: () => void;
};

/**
 * 指定したグランプリの全プレゼンターのコルボポイントを計算するフック
 * reload関数を呼ぶと値が更新される
 */
export const useCollvoPoints = (grandPrixId: string): IResponse => {
  const { presenters, setGrandPrixId } = usePresenters();
  const { calculate } = useCollvoPoint(grandPrixId);
  const [presenterCollvoPoints, setPresenterCollvoPoints] = useState<ActionList<PresenterCollvoPoint>>({
    sortedKey: [],
    data: {},
  });

  useEffect(() => {
    setGrandPrixId(grandPrixId);
  }, [grandPrixId]);

  const reload = useCallback(() => {
    const presenterIds = Object.keys(presenters);
    if (!presenters || presenterIds.length == 0) return;

    const flatCPs = presenterIds.reduce<Dict<IndividualPresenterCollvoPoint>>((arr, pId) => {
      arr[pId] = calculate(pId);
      return arr;
    }, {});

    // ランキングを計算
    const ranking = presenterIds.sort((pId1, pId2) => {
      const total1 = flatCPs[pId1].reactionPoint + flatCPs[pId1].boostPoint;
      const total2 = flatCPs[pId2].reactionPoint + flatCPs[pId2].boostPoint;
      return total1 < total2 ? 1 : total1 > total2 ? -1 : 0;
    });

    // ランクポイントの振り分け
    let currentPoint = flatCPs[ranking[0]].reactionPoint + flatCPs[ranking[0]].boostPoint;
    let currentRank = 0;
    const rankPoints = [COLLVO_POINT.RANKING.one, COLLVO_POINT.RANKING.two, COLLVO_POINT.RANKING.three];
    const rankOutPoint = COLLVO_POINT.RANKING.other;
    const newPresenterCollvoPoints = ranking.reduce<Dict<PresenterCollvoPoint>>((dict, pId, index) => {
      const totalPointWithoutRank = flatCPs[pId].reactionPoint + flatCPs[pId].boostPoint;

      // 同順位でなければ次のランクに進める
      if (totalPointWithoutRank !== currentPoint) {
        currentPoint = totalPointWithoutRank;
        currentRank = index;
      }

      const rankPoint = currentRank < rankPoints.length ? rankPoints[currentRank] : rankOutPoint;

      const totalPoint = totalPointWithoutRank + rankPoint;

      dict[pId] = {
        presenterId: pId,
        reactionPoint: flatCPs[pId].reactionPoint,
        boostPoint: flatCPs[pId].boostPoint,
        rank: currentRank + 1,
        rankPoint: rankPoint,
        totalPoint: totalPoint,
      };
      return dict;
    }, {});

    setPresenterCollvoPoints({
      sortedKey: ranking,
      data: newPresenterCollvoPoints,
    });
  }, [presenters, calculate]);

  return {
    presenterCollvoPoints,
    reload,
  };
};
