import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HotItem, BoostAction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";

export type SerializedBoostAction = HotItem<BoostAction>;

export type IResponse = {
  serializedBoostAction?: SerializedBoostAction;
};

/**
 * BoostActionをシリアライズする
 * @param boostActionId BoostActionID
 * @returns シリアライズされたBoostAction
 */
export const useBoostActionSerializer = (boostActionId?: string): IResponse => {
  // グランプリ情報を取得
  const realtimeGrandPrix = useSelector((state: RootState) => state.realtimeGrandPrix);

  // BoostActionを取得
  const boostAction = useMemo(() => {
    if (boostActionId && realtimeGrandPrix.boostActions.data[boostActionId])
      return realtimeGrandPrix.boostActions.data[boostActionId];
    else return undefined;
  }, []);

  return {
    serializedBoostAction: boostAction,
  };
};
