import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useMemo } from "react";
import {
  ActionList,
  BoostAction,
  HotItem,
  MessageReaction,
  MuteAction,
  PlainReaction,
} from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { ButtonOpts } from "Types/Utils";

export type IResponse = {
  plainReactions: ActionList<HotItem<PlainReaction>>;
  messageReactions: ActionList<HotItem<MessageReaction>>;
  boostActions: ActionList<HotItem<BoostAction>>;
  muteActions: ActionList<HotItem<MuteAction>>;
  execBoostBtn: ButtonOpts;
  execMuteBtn: ButtonOpts;
};

export const usePresenterPanelState = (): IResponse => {
  const { realtimeGrandPrix, addBoostAction, addMuteAction } = useRealtimeGrandPrix();

  const _execBoostBtnHandler = () => {
    addBoostAction({
      sendAt: new Date(Date.now()),
    });
  };

  const _execMuteBtnHandler = () => {
    addMuteAction({
      sendAt: new Date(Date.now()),
    });
  };

  return {
    plainReactions: realtimeGrandPrix.plainReactions,
    messageReactions: realtimeGrandPrix.messageReactions,
    boostActions: realtimeGrandPrix.boostActions,
    muteActions: realtimeGrandPrix.muteActions,
    execBoostBtn: {
      disabled: useMemo(
        () => realtimeGrandPrix.boostActions.sortedKey.length > 0,
        [realtimeGrandPrix.boostActions.sortedKey]
      ),
      handler: _execBoostBtnHandler,
    },
    execMuteBtn: {
      disabled: useMemo(
        () => realtimeGrandPrix.muteActions.sortedKey.length > 0,
        [realtimeGrandPrix.muteActions.sortedKey]
      ),
      handler: _execMuteBtnHandler,
    },
  };
};
