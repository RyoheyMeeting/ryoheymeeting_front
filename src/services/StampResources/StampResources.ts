import { createSlice } from "@reduxjs/toolkit";
import { ref } from "firebase/storage";
import { getStorage } from "firebase_config";
import { PayloadWithId, ThunkResult } from "services/Utils/Types";
import { getStampImageURLFromStorageAsync, getStampSoundURLFromStorageAsync } from "./SOperator/SOperator";

export const ImagesRef = () => ref(getStorage(), "StampImage");
export const SoundsRef = () => ref(getStorage(), "StampSound");

export type StampResourcesState = {
  imageUrls: { [key: string]: string };
  soundUrls: { [key: string]: string };
};

type ImagePayload = PayloadWithId<string>;
type SoundPayload = PayloadWithId<string>;

const initialState: StampResourcesState = {
  imageUrls: {},
  soundUrls: {},
};

const stampResourcesSlice = createSlice({
  name: "stamps",
  initialState: { ...initialState } as StampResourcesState,
  reducers: {
    setImageUrl: (state, action: ImagePayload) => {
      const { id, data } = action.payload;
      state.imageUrls[id] = data;
    },
    setSoundUrl: (state, action: SoundPayload) => {
      const { id, data } = action.payload;
      state.soundUrls[id] = data;
    },
  },
});

export const { setImageUrl, setSoundUrl } = stampResourcesSlice.actions;

export const loadImageUrl = (stampId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    if (stampId == "") return;
    if (!(stampId in getState().stampResources.imageUrls)) {
      await getStampImageURLFromStorageAsync(stampId)
        .then((url) => {
          if (url) {
            dispatch(
              setImageUrl({
                id: stampId,
                data: url,
              })
            );
          }
        })
        .catch(() => {
          console.log("ロードに失敗");
        });
    }
  };
};

export const loadSoundUrl = (stampId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    if (stampId == "") return;
    if (!(stampId in getState().stampResources.soundUrls)) {
      await getStampSoundURLFromStorageAsync(stampId)
        .then((url) => {
          if (url) {
            dispatch(
              setSoundUrl({
                id: stampId,
                data: url,
              })
            );
          }
        })
        .catch(() => {
          console.log("ロードに失敗");
        });
    }
  };
};

export default stampResourcesSlice.reducer;
