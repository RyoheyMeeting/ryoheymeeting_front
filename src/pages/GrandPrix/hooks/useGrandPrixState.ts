import { PresenterWithUser, usePresenters } from "hooks/Presenters/usePresenters";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addPresenterWithSaving,
  GrandPrix,
  GrandPrixStatus,
  removePresenterWithSaving,
} from "services/GrandPrixes/GrandPrixes";
import { User } from "services/User/User";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  id?: string;
  error?: string;
  grandPrix?: GrandPrix;
  presenters: Dict<PresenterWithUser>;
  sortedPresentersKey: string[];
  isParticipated?: boolean;
  user?: User;
  participateBtn: {
    disabled?: boolean;
    handler?: () => void;
  };
  unparticipateBtn: {
    disabled?: boolean;
    handler?: () => void;
  };
};

export const useGrandPrixState = (): IResponse => {
  const { user, id: userId } = useSelector((state: RootState) => state.user);
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const [error, setError] = useState<string>();
  const { presenters, isParticipated, setGrandPrixId } = usePresenters();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setGrandPrixId(id);
    } else {
      setError("idが不正です");
    }
  }, []);

  const _participate = () => {
    if (id && userId) {
      dispatch(
        addPresenterWithSaving(id, userId, {
          index: -1,
          earnedCollvoPoint: 0,
          nextDescription: "",
        })
      );
    }
  };

  const _unparticipate = () => {
    if (id && userId) {
      dispatch(removePresenterWithSaving(id, userId));
    }
  };

  return {
    id: id,
    error: error,
    grandPrix: id && grandPrixes[id] ? grandPrixes[id] : undefined,
    presenters: presenters,
    sortedPresentersKey: useMemo(
      () => Object.keys(presenters).sort((a, b) => (presenters[a].index < presenters[b].index ? -1 : 1)),
      [presenters]
    ),
    isParticipated: isParticipated,
    user: user,
    participateBtn: {
      disabled: isParticipated || (!!id && grandPrixes[id]?.status === GrandPrixStatus.done),
      handler: _participate,
    },
    unparticipateBtn: {
      disabled: !isParticipated || (!!id && grandPrixes[id]?.status === GrandPrixStatus.done),
      handler: _unparticipate,
    },
  };
};
