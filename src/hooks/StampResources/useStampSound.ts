import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StampResource, loadSoundUrl } from "services/StampResources/StampResources";
import { RootState } from "store";

export type IResponse = {
  resources: { [key: string]: StampResource };
  loadUrl: (stampId: string) => void;
};

export const useStampSound = (): IResponse => {
  const { soundResources } = useSelector((state: RootState) => state.stampResources);
  const dispatch = useDispatch();

  const loadUrl = useCallback((stampId: string) => {
    dispatch(loadSoundUrl(stampId));
  }, []);

  return {
    resources: soundResources,
    loadUrl,
  };
};
