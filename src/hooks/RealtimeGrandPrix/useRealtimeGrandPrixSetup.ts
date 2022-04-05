import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startBoostActionsDBSync,
  startMessageReactionsDBSync,
  startMuteActionsDBSync,
  startPlainReactionsDBSync,
  stopBoostActionsDBSync,
  stopMessageReactionsDBSync,
  stopMuteActionsDBSync,
  stopPlainReactionsDBSync,
} from "services/RealtimeGrandPrix/DBListener/DBListener";
import {
  resetBoostActions,
  resetMessageReactions,
  resetMuteActions,
  resetPlainReactions,
} from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { ThunkResult } from "services/Utils/Types";
import { RootState } from "store";

export const useRealtimeGrandPrixSetup = () => {
  const realtimeGrandPrix = useSelector((state: RootState) => state.realtimeGrandPrix);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPlainReactions());
    dispatch(resetMessageReactions());
    dispatch(resetBoostActions());
    dispatch(resetMuteActions());

    if (realtimeGrandPrix.grandPrixId) {
      if (realtimeGrandPrix.grandPrix?.currentPresenterId) {
        const pgid = realtimeGrandPrix.grandPrixId;
        const current = realtimeGrandPrix.grandPrix?.currentPresenterId;
        dispatch(startResrouceDBSync(pgid, current));
      } else {
        dispatch(stopResourceDBSync());
      }
    }
  }, [realtimeGrandPrix.grandPrixId, realtimeGrandPrix.grandPrix?.currentPresenterId]);

  return {};
};

/**
 * 前リソースのDB同期を開始する
 * @param grandPrixId グランプリID
 * @param presenterId プレゼンタID
 * @returns dispatch用関数
 */
export const startResrouceDBSync = (grandPrixId: string, presenterId: string): ThunkResult<void> => {
  return async (dispatch) => {
    if (grandPrixId == "" || presenterId == "") return;
    dispatch(startPlainReactionsDBSync(grandPrixId, presenterId));
    dispatch(startMessageReactionsDBSync(grandPrixId, presenterId));
    dispatch(startBoostActionsDBSync(grandPrixId, presenterId));
    dispatch(startMuteActionsDBSync(grandPrixId, presenterId));
  };
};

/**
 * 全リソースのDB同期を停止する
 * @returns dispatch用関数
 */
export const stopResourceDBSync = (): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(stopPlainReactionsDBSync());
    dispatch(stopMessageReactionsDBSync());
    dispatch(stopBoostActionsDBSync());
    dispatch(stopMuteActionsDBSync());
  };
};
