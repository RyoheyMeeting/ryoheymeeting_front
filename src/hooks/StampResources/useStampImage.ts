import { useDispatch, useSelector } from "react-redux";
import { loadImageUrl } from "services/StampResources/StampResources";
import { RootState } from "store";

export type IResponse = {
  urls: { [key: string]: string };
  loadUrl: (stampId: string) => void;
};

export const useStampImage = (): IResponse => {
  const { imageUrls } = useSelector((state: RootState) => state.stampResources);
  const dispatch = useDispatch();

  const _loadUrl = (stampId: string) => {
    dispatch(loadImageUrl(stampId));
  };

  return {
    urls: imageUrls,
    loadUrl: _loadUrl,
  };
};
