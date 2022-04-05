import { useUsers } from "hooks/Users/Users";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Presenter, reloadPresentersAsync } from "services/GrandPrixes/GrandPrixes";
import { User } from "services/User/User";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type PresenterWithUser = Presenter & { user?: User };

export type IResponse = {
  presenters: Dict<PresenterWithUser>;
  isParticipated?: boolean;
  setGrandPrixId: (grandPrixId: string) => void;
};

export const usePresenters = (): IResponse => {
  const { id: userId } = useSelector((state: RootState) => state.user);
  const { presenters } = useSelector((state: RootState) => state.grandPrixes);
  const [presentersWithUser, setPresentersWithUser] = useState<Dict<PresenterWithUser>>({});
  const { users, load } = useUsers();
  const [gpid, setGpid] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (presenters[gpid]) {
      Object.keys(presenters[gpid]).forEach((key) => {
        load(key);
      });
    }
  }, [presenters[gpid]]);

  useEffect(() => {
    if (presenters[gpid]) {
      const data: Dict<PresenterWithUser> = {};
      Object.keys(presenters[gpid]).forEach((key) => {
        data[key] = {
          ...presenters[gpid][key],
          user: users[key],
        };
      });
      setPresentersWithUser(data);
    }
  }, [presenters[gpid], users]);

  const _setGrandPrixId = useCallback(
    (grandPrixId: string) => {
      setGpid(grandPrixId);
      if (!(grandPrixId in presenters)) {
        dispatch(reloadPresentersAsync(grandPrixId));
      }
    },
    [presenters]
  );

  return {
    presenters: presentersWithUser,
    isParticipated: userId ? userId in presentersWithUser : undefined,
    setGrandPrixId: _setGrandPrixId,
  };
};
