import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLLVO_POINT } from "styles/constants/constants";
import { loadAllActionsAsync, PresenterAction } from "services/RealtimeGrandPrix/StatsGrandPrix";
import { RootState } from "store";
import { PresenterCollvoPoint } from "./useCollvoPoints";

export type IndividualPresenterCollvoPoint = Pick<PresenterCollvoPoint, "reactionPoint" | "boostPoint">;

export type IResponse = {
  calculate: (presenterId: string) => IndividualPresenterCollvoPoint;
};

export const calculatePresenterCollvoPoint = ({
  plainReactions,
  messageReactions,
  boostActions,
}: PresenterAction): IndividualPresenterCollvoPoint => {
  const reactionPoint =
    plainReactions.sortedKey.length * COLLVO_POINT.PLAIN_REACTION +
    messageReactions.sortedKey.length * COLLVO_POINT.MESSAGE_REACTION;

  const boostPoints = Object.values(boostActions.data).map((boostAction) => {
    const boostStart = boostAction.sendAt;
    const boostEnd = new Date(boostStart.getTime() + COLLVO_POINT.BOOST_ACTION.DURATION * 1000);

    const plainReaction =
      Object.values(plainReactions.data).filter(
        (plainReaction) =>
          boostStart.getTime() <= plainReaction.sendAt.getTime() && plainReaction.sendAt.getTime() <= boostEnd.getTime()
      ).length *
      COLLVO_POINT.PLAIN_REACTION *
      COLLVO_POINT.BOOST_ACTION.CP_MAG;

    const messageReaction =
      Object.values(messageReactions.data).filter(
        (messageReaction) =>
          boostStart.getTime() <= messageReaction.sendAt.getTime() &&
          messageReaction.sendAt.getTime() <= boostEnd.getTime()
      ).length *
      COLLVO_POINT.MESSAGE_REACTION *
      COLLVO_POINT.BOOST_ACTION.CP_MAG;

    return plainReaction + messageReaction;
  });

  const boostPoint = boostPoints.reduce((sum, value) => {
    return sum + value;
  }, 0);

  return {
    reactionPoint,
    boostPoint,
  };
};

/**
 * 指定したグランプリID、プレゼンターID（ユーザID）のコルボポイントを計算する
 */
export const useCollvoPoint = (grandPrixId: string): IResponse => {
  const statsGrandPrix = useSelector((state: RootState) => state.statsGrandPrix);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllActionsAsync(grandPrixId));
  }, [grandPrixId]);

  const calculate = useCallback(
    (presenterId: string) => {
      if (!(grandPrixId in statsGrandPrix) || !(presenterId in statsGrandPrix[grandPrixId]))
        return {
          reactionPoint: 0,
          boostPoint: 0,
        };
      return calculatePresenterCollvoPoint(statsGrandPrix[grandPrixId][presenterId]);
    },
    [grandPrixId, statsGrandPrix]
  );

  return {
    calculate,
  };
};
