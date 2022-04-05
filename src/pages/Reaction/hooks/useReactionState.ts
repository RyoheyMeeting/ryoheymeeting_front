import { PresenterWithUser, usePresenters } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useRealtimeGrandPrixSetup } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrixSetup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GrandPrix } from "services/GrandPrixes/GrandPrixes";
import { RTGrandPrixState } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";

export type IResponse = {
  isEntered: boolean;
  grandPrix?: GrandPrix;
  currentPresenter?: PresenterWithUser;
  nextPresenter?: PresenterWithUser;
  realtimeGrandPrix: RTGrandPrixState;
  isPresenter: boolean;
  isNextPresenter: boolean;
  error?: string;
};

export const Status = {
  loading: 0,
  standby: 1,
  entered: 2,
  error: 3,
} as const;
export type StatusType = typeof Status[keyof typeof Status];

export const useReactionState = (): IResponse => {
  useRealtimeGrandPrixSetup();
  const { realtimeGrandPrix, isPresenter, isNextPresenter, enterGrandPrix, exitGrandPrix } = useRealtimeGrandPrix();
  const { presenters, setGrandPrixId } = usePresenters();
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const [status, setStatus] = useState<StatusType>(Status.loading);
  const [error, setError] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    if (!(id && id in grandPrixes)) {
      setError("idが不適切");
    } else {
      setStatus(Status.standby);
      setGrandPrixId(id);
    }
  }, [id, grandPrixes]);

  useEffect(() => {
    if (id) {
      if (status == Status.standby) {
        // 入場
        enterGrandPrix(id);
      } else if (status == Status.entered) {
        // ページを離れるときは退場処理をする
        return () => {
          exitGrandPrix();
        };
      }
    }
  }, [status]);

  return {
    isEntered: realtimeGrandPrix.isEntered,
    grandPrix: id ? grandPrixes[id] : undefined,
    currentPresenter: realtimeGrandPrix.grandPrix?.currentPresenterId
      ? presenters[realtimeGrandPrix.grandPrix?.currentPresenterId]
      : undefined,
    nextPresenter: realtimeGrandPrix.grandPrix?.nextPresenterId
      ? presenters[realtimeGrandPrix.grandPrix?.nextPresenterId]
      : undefined,
    realtimeGrandPrix: realtimeGrandPrix,
    isPresenter: isPresenter,
    isNextPresenter: isNextPresenter,
    error: error,
  };
};
