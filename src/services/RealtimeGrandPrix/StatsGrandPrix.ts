import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import "firebase_config";
import { ThunkResult } from "services/Utils/Types";
import { Dict } from "Types/Utils";
import { getAllActions } from "./DBOperator/DBOperator";
import {
  ActionList,
  BoostAction,
  BoostActionOnDB,
  HotItem,
  MessageReaction,
  MessageReactionOnDB,
  MuteAction,
  MuteActionOnDB,
  PlainReaction,
  PlainReactionOnDB,
} from "./RealtimeGrandPrix";

// ---- DB上での構造 ---- //

export type PresenterActionsOnDB = {
  plainReactions?: Dict<PlainReactionOnDB>;
  messageReactions?: Dict<MessageReactionOnDB>;
  boostActions?: Dict<BoostActionOnDB>;
  muteActions?: Dict<MuteActionOnDB>;
};

export type PresenterAction = {
  plainReactions: ActionList<HotItem<PlainReaction>>;
  messageReactions: ActionList<HotItem<MessageReaction>>;
  boostActions: ActionList<HotItem<BoostAction>>;
  muteActions: ActionList<HotItem<MuteAction>>;
};

export type StatsGrandPrix = {
  [grandPrixId: string]: {
    [presenterId: string]: PresenterAction;
  };
};

export type StatsGrandPrixState = StatsGrandPrix;

// ---- Payloadの定義 ---- //
type SetActionsPayload = PayloadAction<{
  grandPrixId: string;
  actions: Dict<PresenterAction>;
}>;

const initialState: StatsGrandPrixState = {};

const statsGrandPrixSlice = createSlice({
  name: "statsGrandPrix",
  initialState: { ...initialState } as StatsGrandPrixState,
  reducers: {
    setActions: (state, action: SetActionsPayload) => {
      const { grandPrixId, actions } = action.payload;
      state[grandPrixId] = actions;
    },
  },
});

export const { setActions } = statsGrandPrixSlice.actions;

export default statsGrandPrixSlice.reducer;

export const loadAllActionsAsync = (grandPrixId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    if (grandPrixId == "") return;
    if (grandPrixId in getState().statsGrandPrix) return;

    await dispatch(reloadAllActionsAsync(grandPrixId));
  };
};

export const reloadAllActionsAsync = (grandPrixId: string): ThunkResult<void> => {
  return async (dispatch) => {
    if (grandPrixId == "") return;

    const actions = await getAllActions(grandPrixId);
    if (actions) {
      dispatch(
        setActions({
          grandPrixId,
          actions,
        })
      );
    }
  };
};
