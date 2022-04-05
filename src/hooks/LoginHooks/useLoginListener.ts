import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCallBackToSyncUser } from "services/User/User";

export type IResponse = {};

export const useLoginListener = (): IResponse => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCallBackToSyncUser());
  }, []);
  return {};
};
