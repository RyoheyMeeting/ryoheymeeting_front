import { useCallback, useEffect, useState } from "react";
import { usePresenters } from "hooks/Presenters/usePresenters";
import { IndividualPresenterCollvoPoint, useCollvoPoint } from "./useCollvoPoint";
import { COLLVO_POINT } from "styles/constants/constants";
import { Dict } from "Types/Utils";
import { ActionList } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { runFirestoreTransaction } from "firebase_config";
import {
  getGrandPrixWithTransaction,
  updateGrandPrixWithTransaction,
  updatePresenterWithTransaction,
} from "services/GrandPrixes/FSOperator/FSOperator";
import { updateUserWithTransaction } from "services/Users/FSOperator/FSOperator";
import { increment } from "firebase/firestore";

export type PresenterCollvoPoint = {
  presenterId: string;
  reactionPoint: number;
  boostPoint: number;
  rank: number;
  rankPoint: number;
  totalPoint: number;
};

/**
 * 指定したグランプリの全プレゼンターのコルボポイントを計算するフック
 * reload関数を呼ぶと値が更新される
 */
export const useCollvoPoints = (grandPrixId: string) => {
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const { presenters, setGrandPrixId } = usePresenters();
  const { calculate } = useCollvoPoint(grandPrixId);
  const [presenterCollvoPoints, setPresenterCollvoPoints] = useState<ActionList<PresenterCollvoPoint>>({
    sortedKey: [],
    data: {},
  });

  useEffect(() => {
    setGrandPrixId(grandPrixId);
  }, [grandPrixId]);

  const canDistribute = !grandPrixes[grandPrixId].isDistributed || false;

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

  const distributeCollvoPoint = useCallback(async () => {
    // トランザクションを作成して
    await runFirestoreTransaction(async (transaction) => {
      // 配布可能かチェック
      const ss = await getGrandPrixWithTransaction(grandPrixId, transaction);
      if (!ss.exists() || ss.data().isDistributed) return;

      updateGrandPrixWithTransaction(
        grandPrixId,
        {
          isDistributed: true,
        },
        transaction
      );

      presenterCollvoPoints.sortedKey.map((pId) => {
        const earnedCP = presenterCollvoPoints.data[pId].totalPoint;

        // Presenter情報に登録する
        const t1 = updatePresenterWithTransaction(
          grandPrixId,
          pId,
          {
            earnedCollvoPoint: earnedCP,
          },
          transaction
        );

        // ユーザーのCollvoPointを更新する
        const t2 = updateUserWithTransaction(
          pId,
          {
            collvoPoint: increment(earnedCP),
          },
          transaction
        );

        if (!t1 || !t2) throw new Error("CPの配布に失敗しました");
      });
    });
  }, [grandPrixId, presenterCollvoPoints]);

  return {
    /** プレゼンターが所有するコルボポイント */
    presenterCollvoPoints,
    /** CollvoPointを再計算するメソッド */
    reload,
    /** CollvoPointが配布可能かどうか */
    canDistribute,
    /** CollvoPointを配布するメソッド */
    distributeCollvoPoint,
  };
};
