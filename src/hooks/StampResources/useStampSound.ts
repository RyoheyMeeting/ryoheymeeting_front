import { useDispatch, useSelector } from "react-redux";
import { loadSoundUrl } from "services/StampResources/StampResources";
import { RootState } from "store";

export type IResponse = {
  urls: { [key: string]: string };
  loadUrl: (stampId: string) => void;
};

export const useStampSound = (): IResponse => {
  const { soundUrls } = useSelector((state: RootState) => state.stampResources);
  const dispatch = useDispatch();

  const _loadUrl = (stampId: string) => {
    dispatch(loadSoundUrl(stampId));
  };

  return {
    urls: soundUrls,
    loadUrl: _loadUrl,
  };
};
