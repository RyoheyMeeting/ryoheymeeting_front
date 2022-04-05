import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, UpdateData, WithFieldValue } from "firebase/firestore";
import { getFirestore } from "firebase_config";
import { PartialFieldValue, PayloadWithId, ThunkResult } from "services/Utils/Types";
import {
  getGrandPrixesAsync,
  getPresentersAsync,
  removeGrandPrixAsync,
  removePresenterAsync,
  setGrandPrixAsync,
  setPresenterAsync,
  updateGrandPrixAsync,
  updatePresenterAsync,
} from "./FSOperator/FSOperator";

export const GrandPrixesRef = () => collection(getFirestore(), "grandPrixes");
export const PresentersRef = (grandPrixId: string) => collection(doc(GrandPrixesRef(), grandPrixId), "presenters");

export type Presenter = {
  earnedCollvoPoint: number;
  index: number;
  nextDescription: string;
};

export const isPresenter = (instance: any): instance is Presenter => {
  return (
    instance !== undefined && "earnedCollvoPoint" in instance && "index" in instance && "nextDescription" in instance
  );
};

export const GrandPrixStatus = {
  yet: 0,
  doing: 1,
  done: 2,
} as const;
export type GrandPrixStatusType = typeof GrandPrixStatus[keyof typeof GrandPrixStatus];

export type GrandPrix = {
  subtitle: string;
  number: number;
  eventDate: Date;
  status: GrandPrixStatusType;
  description: string;
  isDraft: boolean;
};

export const isGrandPrix = (instance: any): instance is GrandPrix => {
  return (
    instance !== undefined &&
    "subtitle" in instance &&
    "number" in instance &&
    "eventDate" in instance &&
    "status" in instance &&
    "description" in instance &&
    "isDraft" in instance
  );
};

export type GrandPrixesState = {
  grandPrixes: { [key: string]: GrandPrix };
  presenters: {
    [grandPrixId: string]: {
      [presenterId: string]: Presenter;
    };
  };
};

export type GrandPrixAddedToFirestore = WithFieldValue<GrandPrix>;
export type GrandPrixUpdatedToFirestore = UpdateData<GrandPrix>;
export type GrandPrixOperationOfFirestore = PartialFieldValue<GrandPrix>;
export type GrandPrixPartial = Partial<GrandPrix>;

export type PresenterAddedToFirestore = WithFieldValue<Presenter>;
export type PresenterUpdatedToFirestore = UpdateData<Presenter>;
export type PresenterOperationOfFirestore = PartialFieldValue<Presenter>;
export type PresenterPartial = Partial<Presenter>;

type GrandPrixesPayload = PayloadAction<{ [key: string]: GrandPrix }>;
type GrandPrixPayload = PayloadWithId<GrandPrix>;

type PayloadWithTwoIds<T> = PayloadAction<{
  id1: string;
  id2: string;
  data: T;
}>;

type PresentersPayload = PayloadAction<{
  id: string;
  data: { [key: string]: Presenter };
}>;
type PresenterPayload = PayloadWithTwoIds<Presenter>;
type PresenterRemovePayload = PayloadAction<{
  id1: string;
  id2: string;
}>;

const initialState: GrandPrixesState = {
  grandPrixes: {},
  presenters: {},
};

const grandPrixesSlice = createSlice({
  name: "grandPrixes",
  initialState: { ...initialState } as GrandPrixesState,
  reducers: {
    // ---- grandPrixes ---- //
    setGrandPrixes: (state, action: GrandPrixesPayload) => {
      state.grandPrixes = action.payload;
    },
    addGrandPrix: (state, action: GrandPrixPayload) => {
      const { id, data } = action.payload;
      state.grandPrixes[id] = data;
    },
    updateGrandPrix: (state, action: GrandPrixPayload) => {
      const { id, data } = action.payload;
      state.grandPrixes[id] = data;
    },
    removeGrandPrix: (state, action: PayloadAction<string>) => {
      delete state.grandPrixes[action.payload];
    },

    // ---- presenters ---- //
    setPresenters: (state, action: PresentersPayload) => {
      const { id, data } = action.payload;
      state.presenters[id] = data;
    },
    addPresenter: (state, action: PresenterPayload) => {
      const { id1, id2, data } = action.payload;
      if (!state.presenters[id1]) state.presenters[id1] = {};
      state.presenters[id1][id2] = data;
    },
    updatePresenter: (state, action: PresenterPayload) => {
      const { id1, id2, data } = action.payload;
      if (!state.presenters[id1]) state.presenters[id1] = {};
      state.presenters[id1][id2] = data;
    },
    removePresenter: (state, action: PresenterRemovePayload) => {
      const { id1, id2 } = action.payload;
      delete state.presenters[id1][id2];
    },
  },
});

export const {
  setGrandPrixes,
  addGrandPrix,
  updateGrandPrix,
  removeGrandPrix,
  setPresenters,
  addPresenter,
  updatePresenter,
  removePresenter,
} = grandPrixesSlice.actions;

// ---- GrandPrixes ---- //

export const reloadGrandPrixesAsync = (): ThunkResult<void> => {
  return async (dispatch) => {
    const grandPrixes = await getGrandPrixesAsync();
    if (grandPrixes) {
      await dispatch(setGrandPrixes(grandPrixes));
    }
  };
};

export const generateGrandPrixId = () => {
  return doc(GrandPrixesRef()).id;
};

export const addGrandPrixWithSaving = (
  grandPrixId: string,
  grandPrixData: GrandPrix,
  operate?: GrandPrixOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const grandPrixKeys = Object.keys(grandPrixData) as [keyof GrandPrix];
    grandPrixKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : grandPrixData[key];
    });

    //Firestoreに追加
    return setGrandPrixAsync(grandPrixId, data as GrandPrixAddedToFirestore).then(async () => {
      await dispatch(
        addGrandPrix({
          id: grandPrixId,
          data: grandPrixData,
        })
      );
    });
  };
};

export const updateGrandPrixWithSaving = (
  grandPrixId: string,
  grandPrixData: GrandPrixPartial,
  operate?: GrandPrixOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const grandPrixKeys = Object.keys(grandPrixData) as [keyof GrandPrix];
    grandPrixKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : grandPrixData[key];
    });

    //Firestoreに追加
    return updateGrandPrixAsync(grandPrixId, data as GrandPrixUpdatedToFirestore).then(async () => {
      // 前の状態を保持
      const preGrandPrix = getState().grandPrixes.grandPrixes[grandPrixId];

      // 分割データで来るので足りない部分をpreStampからコピーする
      const updateData: { [key: string]: any } = {};
      const grandPrixKeys = Object.keys(preGrandPrix) as [keyof GrandPrix];
      grandPrixKeys.forEach((key) => {
        updateData[key] = grandPrixData[key] ? grandPrixData[key] : preGrandPrix[key];
      });

      // 即時反映するため仮想更新
      await dispatch(
        updateGrandPrix({
          id: grandPrixId,
          data: updateData as GrandPrix,
        })
      );
    });
  };
};

export const removeGrandPrixWithSaving = (grandPrixId: string): ThunkResult<void> => {
  return async (dispatch) => {
    // Firesotreから削除
    return removeGrandPrixAsync(grandPrixId).then(async () => {
      await dispatch(removeGrandPrix(grandPrixId));
    });
  };
};

// ---- Presenters ---- //

export const reloadPresentersAsync = (grandPrixId: string): ThunkResult<void> => {
  return async (dispatch) => {
    const presenters = await getPresentersAsync(grandPrixId);
    if (presenters)
      await dispatch(
        setPresenters({
          id: grandPrixId,
          data: presenters,
        })
      );
  };
};

export const generatePresenterId = (grandPrixId: string) => {
  return doc(PresentersRef(grandPrixId)).id;
};

export const addPresenterWithSaving = (
  grandPrixId: string,
  presenterId: string,
  presenterData: Presenter,
  operate?: PresenterOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const presenterKeys = Object.keys(presenterData) as [keyof Presenter];
    presenterKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : presenterData[key];
    });

    //Firestoreに追加
    return setPresenterAsync(grandPrixId, presenterId, data as PresenterAddedToFirestore).then(async () => {
      await dispatch(
        addPresenter({
          id1: grandPrixId,
          id2: presenterId,
          data: presenterData,
        })
      );
    });
  };
};

export const updatePresenterWithSaving = (
  grandPrixId: string,
  presenterId: string,
  presenterData: PresenterPartial,
  operate?: PresenterOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const presenterKeys = Object.keys(presenterData) as [keyof Presenter];
    presenterKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : presenterData[key];
    });

    //Firestoreに追加
    return updatePresenterAsync(grandPrixId, presenterId, data as PresenterUpdatedToFirestore).then(async () => {
      // 前の状態を保持
      const prePresenter = getState().grandPrixes.presenters[grandPrixId][presenterId];

      // 分割データで来るので足りない部分をpreStampからコピーする
      const updateData: { [key: string]: any } = {};
      const presenterKeys = Object.keys(prePresenter) as [keyof Presenter];
      presenterKeys.forEach((key) => {
        updateData[key] = presenterData[key] ? presenterData[key] : prePresenter[key];
      });

      // 即時反映するため仮想更新
      await dispatch(
        updatePresenter({
          id1: grandPrixId,
          id2: presenterId,
          data: updateData as Presenter,
        })
      );
    });
  };
};

export const removePresenterWithSaving = (grandPrixId: string, presenterId: string): ThunkResult<void> => {
  return async (dispatch) => {
    // Firesotreから削除
    return removePresenterAsync(grandPrixId, presenterId).then(async () => {
      await dispatch(
        removePresenter({
          id1: grandPrixId,
          id2: presenterId,
        })
      );
    });
  };
};

export default grandPrixesSlice.reducer;
