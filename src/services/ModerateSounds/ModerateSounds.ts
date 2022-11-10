import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, UpdateData, WithFieldValue } from "firebase/firestore";
import { ref } from "firebase/storage";
import { getFirestore, getStorage } from "firebase_config";
import { PartialFieldValue, PayloadWithId, ThunkResult } from "services/Utils/Types";
import { Dict } from "Types/Utils";
import {
  getModerateSoundsAsync,
  getModerateSoundURLFromStorageAsync,
  removeModerateSoundAsync,
  removeModerateSoundFromStorageAsync,
  setModerateSoundAsync,
  updateModerateSoundAsync,
  uploadModerateSoundURLFromStorageAsync,
} from "./SOperator/SOperator";

export const ModerateSoundsRef = () => collection(getFirestore(), "ModerateSounds");
export const ModerateSoundFilesRef = () => ref(getStorage(), "ModerateSound");

export type ModerateSound = {
  name: string;
  type: "start" | "remain5" | "finish";
  filename: string;
  downloadURL?: string;
};

export type ModerateSoundOnDB = Omit<ModerateSound, "downloadURL">;

export const isModerateSound = (instance: any): instance is ModerateSound =>
  instance !== undefined &&
  "name" in instance &&
  "type" in instance &&
  instance["type"] in ["start", "remain5", "finish"] &&
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

export type UploadModerateSoundFile = Blob | Uint8Array | ArrayBuffer;

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
  moderateSoundData: ModerateSoundOnDB,
  moderateSoundFile: UploadModerateSoundFile,
  operate?: ModerateSoundOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch) => {
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
  moderateSoundData: ModerateSoundPartial,
  moderateSoundFile?: UploadModerateSoundFile,
  operate?: ModerateSoundOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
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

    if (!(moderateSoundId in getState().moderateSounds.moderateSounds)) {
      await getModerateSoundURLFromStorageAsync(moderateSoundId)
        .then((url) => {
          if (url) {
            dispatch(
              updateModerateSound({
                id: moderateSoundId,
                data: {
                  downloadURL: url,
                },
              })
            );
          }
        })
        .catch(() => {
          console.error("ロードに失敗 moderateSoundId:", moderateSoundId);
        });
    }
  };
};

export default moderateSoundsSlice.reducer;
