import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGrandPrixDBSync, stopGrandPrixDBSync } from "services/RealtimeGrandPrix/DBListener/DBListener";
import {
  addBoostActionAsync,
  addMessageReactionAsync,
  addMuteActionAsync,
  addPlainReactionAsync,
  getGrandPrixAsync,
  setGrandPrixAsync,
  updateGrandPrixAsync,
} from "services/RealtimeGrandPrix/DBOperator/DBOperator";
import {
  BoostAction,
  exitGrandPrix,
  MessageReaction,
  MuteAction,
  PlainReaction,
  RTGrandPrix,
} from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { nullable, ThunkResult } from "services/Utils/Types";
import { RootState } from "store";
import { stopResourceDBSync } from "./useRealtimeGrandPrixSetup";

export const useRealtimeGrandPrix = () => {
  const realtimeGrandPrix = useSelector((state: RootState) => state.realtimeGrandPrix);
  const { id: userId, isLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return {
    realtimeGrandPrix: realtimeGrandPrix,
    isPresenter: useMemo(
      () => isPresenter(realtimeGrandPrix.grandPrix?.currentPresenterId, userId),
      [realtimeGrandPrix.grandPrix?.currentPresenterId, userId]
    ),
    isNextPresenter: useMemo(
      () => isPresenter(realtimeGrandPrix.grandPrix?.nextPresenterId, userId),
      [realtimeGrandPrix.grandPrix?.nextPresenterId, userId]
    ),
    createGrandPrix: async (grandPrixId: string) => {
      if (isLogin) await dispatch(createGrandPrixAsync(grandPrixId));
    },
    enterGrandPrix: async (grandPrixId: string) => {
      if (isLogin) await dispatch(enterGrandPrixAsync(grandPrixId));
    },
    exitGrandPrix: async () => {
      await dispatch(exitGrandPrixAsync());
    },
    updateGrandPrix: async (grandPrix: nullable<RTGrandPrix>) => {
      const gpid = realtimeGrandPrix.grandPrixId;
      if (gpid) await updateGrandPrixAsync(gpid, grandPrix);
    },
    addPlainReaction: async (data: PlainReaction) => {
      const gpid = realtimeGrandPrix.grandPrixId;
      const currentPresenterId = realtimeGrandPrix.grandPrix?.currentPresenterId;
      if (gpid && currentPresenterId) await addPlainReactionAsync(gpid, currentPresenterId, data);
    },
    addMessageReaction: async (data: MessageReaction) => {
      const gpid = realtimeGrandPrix.grandPrixId;
      const currentPresenterId = realtimeGrandPrix.grandPrix?.currentPresenterId;
      if (gpid && currentPresenterId) await addMessageReactionAsync(gpid, currentPresenterId, data);
    },
    addBoostAction: async (data: BoostAction) => {
      const gpid = realtimeGrandPrix.grandPrixId;
      const currentPresenterId = realtimeGrandPrix.grandPrix?.currentPresenterId;
      if (gpid && currentPresenterId) await addBoostActionAsync(gpid, currentPresenterId, data);
    },
    addMuteAction: async (data: MuteAction) => {
      const gpid = realtimeGrandPrix.grandPrixId;
      const currentPresenterId = realtimeGrandPrix.grandPrix?.currentPresenterId;
      if (gpid && currentPresenterId) await addMuteActionAsync(gpid, currentPresenterId, data);
    },
  };
};

export const isPresenter = (currentPresenterId?: string, userId?: string): boolean => {
  return currentPresenterId != undefined && userId != undefined && currentPresenterId == userId;
};

export const createGrandPrixAsync = (grandPrixId: string): ThunkResult<void> => {
  return async (dispatch) => {
    if (grandPrixId == "") return;
    //グランプリが存在しない場合作成
    const data = await getGrandPrixAsync(grandPrixId);
    if (!data) {
      await setGrandPrixAsync(grandPrixId, { enabled: true });
    }
    //グランプリが存在したら入室処理
    await dispatch(enterGrandPrixAsync(grandPrixId));
  };
};

/**
 * グランプリに入場できるか確認してからルームに入る
 * @param grandPrixId グランプリID
 * @returns dispatch用関数
 */
export const enterGrandPrixAsync = (grandPrixId: string): ThunkResult<void> => {
  return async (dispatch) => {
    if (grandPrixId == "") return;
    const data = await getGrandPrixAsync(grandPrixId);
    //グランプリが存在したら入室処理
    if (data) {
      await dispatch(startGrandPrixDBSync(grandPrixId));
    }
  };
};

/**
 * グランプリから退場する
 * @returns dispatch用関数
 */
export const exitGrandPrixAsync = (): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(stopGrandPrixDBSync());
    dispatch(stopResourceDBSync());
    dispatch(exitGrandPrix());
  };
};
