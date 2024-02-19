import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, UpdateData, WithFieldValue } from "firebase/firestore";
import { ref } from "firebase/storage";
import { getFirestore, getStorage } from "firebase_config";
import { PartialFieldValue, PayloadWithId, ThunkResult } from "services/Utils/Types";
import { Dict } from "Types/Utils";
import {
  getModerateSoundBlobFromStorageAsync,
  getModerateSoundsAsync,
  removeModerateSoundAsync,
  removeModerateSoundFromStorageAsync,
  setModerateSoundAsync,
  updateModerateSoundAsync,
  uploadModerateSoundURLFromStorageAsync,
} from "./SOperator/SOperator";
import { convertToDataUrlFromBlob } from "Utils/funcs";

export const ModerateSoundsRef = () => collection(getFirestore(), "ModerateSounds");
export const ModerateSoundFilesRef = () => ref(getStorage(), "ModerateSound");

export type ModerateSound = {
  name: string;
  type: "start" | "remain5" | "finish";
  filename: string;
  resource?: ModerateSoundResource;
};

export type ModerateSoundResource = {
  isDownloading: boolean;
  dataUrl?: string;
  dataSize?: number;
}

export type UploadModerateSoundFile = Blob | Uint8Array | ArrayBuffer;
export type ModerateSoundOnDB = Omit<ModerateSound, "resource">;
export type SavedModerateSound = ModerateSoundOnDB & {
  file: UploadModerateSoundFile;
};
export type SavedModerateSoundPartial = Partial<SavedModerateSound>;

export const isModerateSound = (instance: any): instance is ModerateSound =>
  instance !== undefined &&
  "name" in instance &&
  "type" in instance &&
  ["start", "remain5", "finish"].includes(instance["type"]) &&
  "filename" in instance;

type UpdateModerateSound = Partial<ModerateSound>;

export type ModerateSoundsState = {
  moderateSounds: Dict<ModerateSound>;
};

export type ModerateSoundAddedToFirestore = WithFieldValue<ModerateSoundOnDB>;
export type ModerateSoundUpdatedToFirestore = UpdateData<ModerateSoundOnDB>;
export type ModerateSoundOperationOfFirestore = PartialFieldValue<ModerateSoundOnDB>;
export type ModerateSoundPartial = Partial<ModerateSoundOnDB>;

type ModerateSoundsPayload = PayloadAction<Dict<ModerateSound>>;
type ModerateSoundPayload = PayloadWithId<ModerateSound>;
type UpdateModerateSoundPayload = PayloadWithId<UpdateModerateSound>;

const initialState: ModerateSoundsState = {
  moderateSounds: {},
};

const moderateSoundsSlice = createSlice({
  name: "moderateSounds",
  initialState: { ...initialState } as ModerateSoundsState,
  reducers: {
    setModerateSounds: (state, action: ModerateSoundsPayload) => {
      const moderateSounds = action.payload;
      state.moderateSounds = moderateSounds;
    },
    setModerateSound: (state, action: ModerateSoundPayload) => {
      const { id, data } = action.payload;
      state.moderateSounds[id] = data;
    },
    updateModerateSound: (state, action: UpdateModerateSoundPayload) => {
      const { id, data } = action.payload;
      state.moderateSounds[id] = {
        ...state.moderateSounds[id],
        ...data,
      };
    },
    removeModerateSound: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.moderateSounds[id];
    },
    clearModerateSounds: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setModerateSounds, setModerateSound, updateModerateSound, removeModerateSound, clearModerateSounds } =
  moderateSoundsSlice.actions;

// ---- Firestore ---- //

export const reloadModerateSoundsAsync = (): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(clearModerateSounds());
    const moderateSounds = await getModerateSoundsAsync();
    if (moderateSounds) {
      dispatch(setModerateSounds(moderateSounds));
    }
  };
};

export const generateModerateSoundId = () => {
  return doc(ModerateSoundsRef()).id;
};

export const addModerateSoundWithSaving = (
  moderateSoundId: string,
  savedModerateSoundData: SavedModerateSound,
  operate?: ModerateSoundOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch) => {
    // FirestoreとStorageのデータを分ける
    const { file: moderateSoundFile, ...moderateSoundData } = savedModerateSoundData;

    // 新データを作成
    const data: { [key: string]: any } = {};
    const moderateSoundKeys = Object.keys(moderateSoundData) as [keyof ModerateSoundOnDB];
    moderateSoundKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : moderateSoundData[key];
    });

    //Firestoreに追加
    await setModerateSoundAsync(moderateSoundId, data as ModerateSoundAddedToFirestore).then(() => {
      dispatch(
        setModerateSound({
          id: moderateSoundId,
          data: moderateSoundData,
        })
      );
    });

    // データをアップロード
    await uploadModerateSoundURLFromStorageAsync(moderateSoundId, moderateSoundFile).catch(async () => {
      // 失敗したらデータも削除
      await removeModerateSoundAsync(moderateSoundId).then(async () => {
        dispatch(removeModerateSound(moderateSoundId));
      });
    });
  };
};

export const updateModerateSoundWithSaving = (
  moderateSoundId: string,
  savedModerateSoundData: SavedModerateSoundPartial,
  operate?: ModerateSoundOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // FirestoreとStorageのデータを分ける
    const { file: moderateSoundFile, ...moderateSoundData } = savedModerateSoundData;

    // 新データを作成
    const data: { [key: string]: any } = {};
    const moderateSoundKeys = Object.keys(moderateSoundData) as [keyof ModerateSoundOnDB];
    moderateSoundKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : moderateSoundData[key];
    });

    //Firestoreに追加
    await updateModerateSoundAsync(moderateSoundId, data as ModerateSoundUpdatedToFirestore).then(async () => {
      // 前の状態を保持
      const preModerateSound = getState().moderateSounds.moderateSounds[moderateSoundId];

      // 分割データで来るので足りない部分をpreModerateSoundからコピーする
      const updateData: { [key: string]: any } = {};
      const moderateSoundKeys = Object.keys(preModerateSound) as [keyof ModerateSoundOnDB];
      moderateSoundKeys.forEach((key) => {
        updateData[key] = moderateSoundData[key] ? moderateSoundData[key] : preModerateSound[key];
      });

      // 即時反映するため仮想更新
      dispatch(
        updateModerateSound({
          id: moderateSoundId,
          data: updateData as ModerateSoundOnDB,
        })
      );
    });

    if (moderateSoundFile) {
      await uploadModerateSoundURLFromStorageAsync(moderateSoundId, moderateSoundFile);
    }
  };
};

export const removeModerateSoundWithSaving = (moderateSoundId: string): ThunkResult<void> => {
  return async (dispatch) => {
    // Storageから削除
    await removeModerateSoundFromStorageAsync(moderateSoundId).then(async () => {
      // Firesotreから削除
      await removeModerateSoundAsync(moderateSoundId).then(async () => {
        dispatch(removeModerateSound(moderateSoundId));
      });
    });
  };
};

// ---- Storage ---- //

export const loadModerateSoundUrl = (moderateSoundId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    if (moderateSoundId === "") return;

    const preModerateSound = getState().moderateSounds.moderateSounds[moderateSoundId];

    // ダウンロード中の場合は弾く
    if (preModerateSound?.resource && preModerateSound.resource.isDownloading) return;

    if (!preModerateSound || !preModerateSound.resource?.dataUrl) {
      dispatch(
        updateModerateSound({
          id: moderateSoundId,
          data: {
            resource: {
              isDownloading: true,
            }
          },
        })
      );

      await getModerateSoundBlobFromStorageAsync(moderateSoundId)
        .then(async (dataBlob) => {
          if (dataBlob) {
            const dataUrl = await convertToDataUrlFromBlob(dataBlob);

            dispatch(
              updateModerateSound({
                id: moderateSoundId,
                data: {
                  resource: {
                    isDownloading: false,
                    dataUrl,
                    dataSize: dataBlob.size
                  }
                },
              })
            );
          } else {
            console.error("データが取得できませんでした moderateSoundId:", moderateSoundId);
          }
        })
        .catch(() => {
          console.error("進行音声のロードに失敗 moderateSoundId:", moderateSoundId);

          updateModerateSound({
            id: moderateSoundId,
            data: {
              resource: {
                isDownloading: false,
              }
            },
          })
        });
    }
  };
};

export default moderateSoundsSlice.reducer;
