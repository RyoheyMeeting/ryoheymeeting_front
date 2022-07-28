import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HotItem, MuteAction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";

export type SerializedMuteAction = HotItem<MuteAction>;

export type IResponse = {
  serializedMuteAction?: SerializedMuteAction;
};

/**
 * MuteActionをシリアライズする
 * @param muteActionId MuteActionID
 * @returns シリアライズされたMuteAction
 */
export const useMuteActionSerializer = (muteActionId?: string): IResponse => {
  // グランプリ情報を取得
  const realtimeGrandPrix = useSelector((state: RootState) => state.realtimeGrandPrix);

  // MuteActionを取得
  const muteAction = useMemo(() => {
    if (muteActionId && realtimeGrandPrix.muteActions.data[muteActionId])
      return realtimeGrandPrix.muteActions.data[muteActionId];
    else return undefined;
  }, []);

  return {
    serializedMuteAction: muteAction,
  };
};
