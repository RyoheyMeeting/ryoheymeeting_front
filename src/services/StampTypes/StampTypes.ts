import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, UpdateData, WithFieldValue } from "firebase/firestore";
import { getFirestore } from "firebase_config";
import { PartialFieldValue, PayloadWithId, ThunkResult } from "services/Utils/Types";
import {
  getStampTypesAsync,
  removeStampTypeAsync,
  setStampTypeAsync,
  updateStampTypeAsync,
} from "./FSOperator/FSOperator";

export const StampTypesRef = () => collection(getFirestore(), "stampTypes");

export type StampType = {
  name: string;
  description: string;
};

export const isStampType = (instance: any): instance is StampType => {
  return instance !== undefined && "name" in instance && "description" in instance;
};

export type StampTypesState = {
  stampTypes: { [key: string]: StampType };
};

export type StampTypeAddedToFirestore = WithFieldValue<StampType>;
export type StampTypeUpdatedToFirestore = UpdateData<StampType>;
export type StampTypeOperationOfFirestore = PartialFieldValue<StampType>;
export type StampTypePartial = Partial<StampType>;

type StampTypesPayload = PayloadAction<{ [key: string]: StampType }>;
type StampTypePayload = PayloadWithId<StampType>;

const initialState: StampTypesState = {
  stampTypes: {},
};

const stampTypesSlice = createSlice({
  name: "stampTypes",
  initialState: { ...initialState } as StampTypesState,
  reducers: {
    setStampTypes: (state, action: StampTypesPayload) => {
      state.stampTypes = action.payload;
    },
    addStampType: (state, action: StampTypePayload) => {
      const { id, data } = action.payload;
      state.stampTypes[id] = data;
    },
    updateStampType: (state, action: StampTypePayload) => {
      const { id, data } = action.payload;
      state.stampTypes[id] = data;
    },
    removeStampType: (state, action: PayloadAction<string>) => {
      delete state.stampTypes[action.payload];
    },
  },
});

export const { setStampTypes, addStampType, updateStampType, removeStampType } = stampTypesSlice.actions;

export const reloadStampTypesAsync = (): ThunkResult<void> => {
  return async (dispatch) => {
    const stampTypes = await getStampTypesAsync();
    if (stampTypes) await dispatch(setStampTypes(stampTypes));
  };
};

export const generateId = () => {
  return doc(StampTypesRef()).id;
};

export const addStampTypeWithSaving = (
  stampTypeId: string,
  stampTypeData: StampType,
  operate?: StampTypeOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const stampTypeKeys = Object.keys(stampTypeData) as [keyof StampType];
    stampTypeKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : stampTypeData[key];
    });

    //Firestoreに追加
    return setStampTypeAsync(stampTypeId, data as StampTypeAddedToFirestore).then(async () => {
      await dispatch(
        addStampType({
          id: stampTypeId,
          data: stampTypeData,
        })
      );
    });
  };
};

export const updateStampTypeWithSaving = (
  stampTypeId: string,
  stampTypeData: StampTypePartial,
  operate?: StampTypeOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const stampTypeKeys = Object.keys(stampTypeData) as [keyof StampType];
    stampTypeKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : stampTypeData[key];
    });

    //Firestoreに追加
    return updateStampTypeAsync(stampTypeId, data as StampTypeUpdatedToFirestore).then(async () => {
      // 前の状態を保持
      const preStampType = getState().stampTypes.stampTypes[stampTypeId];

      // 分割データで来るので足りない部分をpreStampからコピーする
      const updateData: { [key: string]: any } = {};
      const stampTypeKeys = Object.keys(preStampType) as [keyof StampType];
      stampTypeKeys.forEach((key) => {
        updateData[key] = stampTypeData[key] ? stampTypeData[key] : preStampType[key];
      });
      await dispatch(
        updateStampType({
          id: stampTypeId,
          data: updateData as StampType,
        })
      );
    });
  };
};

export const removeStampTypeWithSaving = (stampTypeId: string): ThunkResult<void> => {
  return async (dispatch) => {
    // Firesotreから削除
    return removeStampTypeAsync(stampTypeId).then(async () => {
      await dispatch(removeStampType(stampTypeId));
    });
  };
};

export default stampTypesSlice.reducer;
