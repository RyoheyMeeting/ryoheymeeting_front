import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ref } from "firebase/storage";
import { getStorage } from "firebase_config";
import { PayloadWithId, ThunkResult } from "services/Utils/Types";
import { getStampImageBlobFromStorageAsync, getStampSoundBlobFromStorageAsync } from "./SOperator/SOperator";
import { convertToDataUrlFromBlob } from "Utils/funcs";

export const ImagesRef = () => ref(getStorage(), "StampImage");
export const SoundsRef = () => ref(getStorage(), "StampSound");

export type StampResource = {
  isDownloading: boolean;
  dataUrl?: string;
  dataSize?: number;
};

export type StampResourcesState = {
  imageResources: { [key: string]: StampResource };
  soundResources: { [key: string]: StampResource };
};

type ImagePayload = PayloadWithId<StampResource>;
type SoundPayload = PayloadWithId<StampResource>;

const initialState: StampResourcesState = {
  imageResources: {},
  soundResources: {},
};

const stampResourcesSlice = createSlice({
  name: "stamps",
  initialState: { ...initialState } as StampResourcesState,
  reducers: {
    setImageUrl: (state, action: ImagePayload) => {
      const { id, data } = action.payload;
      state.imageResources[id] = data;
    },
    removeImageUrl: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.imageResources[id];
    },
    setSoundUrl: (state, action: SoundPayload) => {
      const { id, data } = action.payload;
      state.soundResources[id] = data;
    },
    removeSoundUrl: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.soundResources[id];
    },
  },
});

export const { setImageUrl, removeImageUrl, setSoundUrl, removeSoundUrl } = stampResourcesSlice.actions;

export const loadImageUrl = (stampId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    if (stampId == "") return;

    const imageResource = getState().stampResources.imageResources[stampId];

    // ダウンロード中の場合は弾く
    if (imageResource && imageResource.isDownloading) return;

    if (!imageResource?.dataUrl) {
      dispatch(
        setImageUrl({
          id: stampId,
          data: {
            isDownloading: true,
          },
        })
      );
      await getStampImageBlobFromStorageAsync(stampId)
        .then(async (dataBlob) => {
          if (dataBlob) {
            const dataUrl = await convertToDataUrlFromBlob(dataBlob);

            dispatch(
              setImageUrl({
                id: stampId,
                data: {
                  isDownloading: false,
                  dataUrl,
                  dataSize: dataBlob.size,
                },
              })
            );
          }
        })
        .catch(() => {
          console.error("画像のロードに失敗 stampId:", stampId);
          dispatch(
            setImageUrl({
              id: stampId,
              data: {
                isDownloading: false,
              },
            })
          );
        });
    }
  };
};

export const loadSoundUrl = (stampId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    if (stampId == "") return;

    const soundResource = getState().stampResources.soundResources[stampId];

    // ダウンロード中の場合は弾く
    if (soundResource && soundResource.isDownloading) return;

    if (!soundResource?.dataUrl) {
      dispatch(
        setImageUrl({
          id: stampId,
          data: {
            isDownloading: true,
          },
        })
      );
      await getStampSoundBlobFromStorageAsync(stampId)
        .then(async (dataBlob) => {
          if (dataBlob) {
            const dataUrl = await convertToDataUrlFromBlob(dataBlob);

            dispatch(
              setSoundUrl({
                id: stampId,
                data: {
                  isDownloading: false,
                  dataUrl,
                  dataSize: dataBlob.size,
                },
              })
            );
          }
        })
        .catch(() => {
          console.error("音声のロードに失敗 stampId:", stampId);
          dispatch(
            setSoundUrl({
              id: stampId,
              data: {
                isDownloading: false,
              },
            })
          );
        });
    }
  };
};

export default stampResourcesSlice.reducer;
