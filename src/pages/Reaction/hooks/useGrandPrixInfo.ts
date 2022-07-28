import { PresenterWithUser, usePresenters } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useRealtimeGrandPrixSetup } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrixSetup";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ActionList,
  BoostAction,
  HotItem,
  MessageReaction,
  MuteAction,
  PlainReaction,
} from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";

export type IResponse = {
  plainReactions: ActionList<HotItem<PlainReaction>>;
  messageReactions: ActionList<HotItem<MessageReaction>>;
  boostActions: ActionList<HotItem<BoostAction>>;
  muteActions: ActionList<HotItem<MuteAction>>;
  currentPresenter?: PresenterWithUser;
  nextPresenter?: PresenterWithUser;
  isPresenter: boolean;
  isNextPresenter: boolean;
};

/**
 * グランプリ情報を一度に取得する
 * @returns グランプリ情報
 */
export const useGrandPrixInfo = (): IResponse => {
  useRealtimeGrandPrixSetup();
  const { realtimeGrandPrix, isPresenter, isNextPresenter } = useRealtimeGrandPrix();
  const { presenters, setGrandPrixId } = usePresenters();
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const { id } = useParams();

  useEffect(() => {
    if (id && id in grandPrixes) {
      setGrandPrixId(id);
    }
  }, [id, grandPrixes]);

  return {
    plainReactions: realtimeGrandPrix.plainReactions,
    messageReactions: realtimeGrandPrix.messageReactions,
    boostActions: realtimeGrandPrix.boostActions,
    muteActions: realtimeGrandPrix.muteActions,
    currentPresenter: realtimeGrandPrix.grandPrix?.currentPresenterId
      ? presenters[realtimeGrandPrix.grandPrix?.currentPresenterId]
      : undefined,
    nextPresenter: realtimeGrandPrix.grandPrix?.nextPresenterId
      ? presenters[realtimeGrandPrix.grandPrix?.nextPresenterId]
      : undefined,
    isPresenter: isPresenter,
    isNextPresenter: isNextPresenter,
  };
};
