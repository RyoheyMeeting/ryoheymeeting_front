import { PresenterWithUser } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useGrandPrixInfo } from "pages/Reaction/hooks/useGrandPrixInfo";
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
  currentPresenter?: PresenterWithUser;
  nextPresenter?: PresenterWithUser;
  isNextPresenter: boolean;
  execBoostBtn: ButtonOpts;
  execMuteBtn: ButtonOpts;
};

export const usePresenterPanelState = (): IResponse => {
  const { realtimeGrandPrix, addBoostAction, addMuteAction } = useRealtimeGrandPrix();
  const {
    plainReactions,
    messageReactions,
    boostActions,
    muteActions,
    currentPresenter,
    nextPresenter,
    isNextPresenter,
  } = useGrandPrixInfo();

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
    plainReactions,
    messageReactions,
    boostActions,
    muteActions,
    currentPresenter,
    nextPresenter,
    isNextPresenter,
    execBoostBtn: {
      disabled: useMemo(
        () => realtimeGrandPrix.boostActions.sortedKey.length > 0,
        [realtimeGrandPrix.boostActions.sortedKey]
      ),
      handler: _execBoostBtnHandler,
    },
    execMuteBtn: {
      disabled: false,
      handler: _execMuteBtnHandler,
    },
  };
};
