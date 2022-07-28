import { ReactionMetersHandler } from "components/ReactionMeters/hooks/useReactionMetersState";
import { PresenterWithUser } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useGrandPrixInfo } from "pages/Reaction/hooks/useGrandPrixInfo";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import {
  ActionList,
  BoostAction,
  HotItem,
  MessageReaction,
  MuteAction,
  PlainReaction,
} from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";
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
  reactionMetersRef: RefObject<ReactionMetersHandler>;
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
  const { stamps } = useSelector((state: RootState) => state.stamps);
  const { stampTypes } = useSelector((state: RootState) => state.stampTypes);
  const reactionMetersRef = useRef<ReactionMetersHandler>(null);

  useEffect(() => {
    if (!reactionMetersRef.current) return;

    const yetPlainReactionKeys = realtimeGrandPrix.plainReactions.sortedKey.filter(
      (key) => !realtimeGrandPrix.plainReactions.data[key].done
    );

    yetPlainReactionKeys.forEach((yetPlainReactionKey) => {
      const plainReaction = realtimeGrandPrix.plainReactions.data[yetPlainReactionKey];
      const stamp = stamps[plainReaction?.stampId];
      const stampType = stampTypes[stamp?.typeId];
      reactionMetersRef.current?.showStamp(stampType?.name, yetPlainReactionKey);
    });
  }, [reactionMetersRef, realtimeGrandPrix.plainReactions]);

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
    reactionMetersRef,
  };
};
