import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, UpdateData, WithFieldValue } from "firebase/firestore";
import { getFirestore } from "firebase_config";
import { PartialFieldValue, PayloadWithId, ThunkResult } from "services/Utils/Types";
import { getStampsAsync, setStampAsync, updateStampAsync, removeStampAsync } from "./FSOperator/FSOperator";

export const StampsRef = () => collection(getFirestore(), "stamps");

export type Stamp = {
  name: string;
  typeId: string;
  imageURL: string;
  soundURL: string;
};

export const isStamp = (instance: any): instance is Stamp => {
  return (
    instance !== undefined &&
    "name" in instance &&
    "typeId" in instance &&
    "imageURL" in instance &&
    "soundURL" in instance
  );
};

export type StampsState = {
  stamps: { [key: string]: Stamp };
};

export type StampAddedToFirestore = WithFieldValue<Stamp>;
export type StampUpdatedToFirestore = UpdateData<Stamp>;
export type StampOperationOfFirestore = PartialFieldValue<Stamp>;
export type StampPartial = Partial<Stamp>;

type StampsPayload = PayloadAction<{ [key: string]: Stamp }>;
type StampPayload = PayloadWithId<Stamp>;

const initialState: StampsState = {
  stamps: {},
};

const stampsSlice = createSlice({
  name: "stamps",
  initialState: { ...initialState } as StampsState,
  reducers: {
    setStamps: (state, action: StampsPayload) => {
      state.stamps = action.payload;
    },
    addStamp: (state, action: StampPayload) => {
      const { id, data } = action.payload;
      state.stamps[id] = data;
    },
    updateStamp: (state, action: StampPayload) => {
      const { id, data } = action.payload;
      state.stamps[id] = data;
    },
    removeStamp: (state, action: PayloadAction<string>) => {
      delete state.stamps[action.payload];
    },
  },
});

export const { setStamps, addStamp, updateStamp, removeStamp } = stampsSlice.actions;

export const reloadStampsAsync = (): ThunkResult<void> => {
  return async (dispatch) => {
    const stamps = await getStampsAsync();
    if (stamps) await dispatch(setStamps(stamps));
  };
};

export const generateId = () => {
  return doc(StampsRef()).id;
};

export const addStampWithSaving = (
  stampId: string,
  stampData: Stamp,
  operate?: StampOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const stampKeys = Object.keys(stampData) as [keyof Stamp];
    stampKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : stampData[key];
    });

    //Firestoreに追加
    return setStampAsync(stampId, data as StampAddedToFirestore).then(async () => {
      // storeに追加
      await dispatch(
        addStamp({
          id: stampId,
          data: stampData,
        })
      );
    });
  };
};

export const updateStampWithSaving = (
  stampId: string,
  stampData: StampPartial,
  operate?: StampOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const stampKeys = Object.keys(stampData) as [keyof Stamp];
    stampKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : stampData[key];
    });

    //Firestoreに追加
    return updateStampAsync(stampId, data as StampUpdatedToFirestore).then(async () => {
      // 前の状態を取得
      const preStamp = getState().stamps.stamps[stampId];

      // 分割データを補完
      const updateData: { [key: string]: any } = {};
      const stampKeys = Object.keys(preStamp) as [keyof Stamp];
      stampKeys.forEach((key) => {
        updateData[key] = stampData[key] ? stampData[key] : preStamp[key];
      });

      // 即時反映するため仮想更新
      await dispatch(
        updateStamp({
          id: stampId,
          data: updateData as Stamp,
        })
      );
    });
  };
};

export const removeStampWithSaving = (stampId: string): ThunkResult<void> => {
  return async (dispatch) => {
    // Firesotreから削除
    return removeStampAsync(stampId).then(async () => {
      await dispatch(removeStamp(stampId));
    });
  };
};

export default stampsSlice.reducer;
