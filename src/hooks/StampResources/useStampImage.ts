import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StampResource, loadImageUrl } from "services/StampResources/StampResources";
import { RootState } from "store";

export type IResponse = {
  resources: { [key: string]: StampResource };
  loadUrl: (stampId: string) => void;
};

export const useStampImage = (): IResponse => {
  const { imageResources } = useSelector((state: RootState) => state.stampResources);
  const dispatch = useDispatch();

  const loadUrl = useCallback((stampId: string) => {
    dispatch(loadImageUrl(stampId));
  }, []);

  return {
    resources: imageResources,
    loadUrl,
  };
};
