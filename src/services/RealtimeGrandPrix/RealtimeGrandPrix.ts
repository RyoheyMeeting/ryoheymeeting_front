import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, child, getDatabase } from "firebase/database";
import "firebase_config";
import { addChild, moveChild, removeChild } from "services/Utils/realtimeDatabase/InsertSortOfKeys";
import { DBConverter, ListPayload, ValuePayload } from "services/Utils/realtimeDatabase/RealtimeDBListener";
import { nullable } from "services/Utils/Types";
import { PRESENTATION_TIME } from "styles/constants/constants";

export const RootRef = () => ref(getDatabase(), "/GrandPrixApp");
export const GrandPrixesRef = () => child(RootRef(), "grandPrixes");
export const ActionsRef = () => child(RootRef(), "actions");
export const PlainReactionsRef = (grandPrixId: string, presenterId: string) =>
  child(ActionsRef(), `${grandPrixId}/${presenterId}/plainReactions`);
export const MessageReactionsRef = (grandPrixId: string, presenterId: string) =>
  child(ActionsRef(), `${grandPrixId}/${presenterId}/messageReactions`);
export const BoostActionsRef = (grandPrixId: string, presenterId: string) =>
  child(ActionsRef(), `${grandPrixId}/${presenterId}/boostActions`);
export const MuteActionsRef = (grandPrixId: string, presenterId: string) =>
  child(ActionsRef(), `${grandPrixId}/${presenterId}/muteActions`);

// ---- RealtimeGrandPrixの型宣言 ---- //

export type RTGrandPrix = {
  enabled: boolean;
  currentPresenterId?: string;
  nextPresenterId?: string;
  presentationTime: Date;
  startTime?: Date;
};
export type RTGrandPrixOnDB = Omit<RTGrandPrix, "presentationTime" | "startTime"> & {
  presentationTime: string;
  startTime?: string;
};

export const isGrandPrix = (instance: any): instance is RTGrandPrix => {
  return instance !== undefined && "enabled" in instance && "presentationTime" in instance;
};

export const RTGrandPrixConverter: DBConverter<RTGrandPrix, RTGrandPrixOnDB> = {
  toDB: (data) => {
    const result: nullable<RTGrandPrixOnDB> = {};
    const keys = Object.keys(data) as [keyof RTGrandPrixOnDB];
    keys.forEach((key) => {
      if (data[key]) {
        if (key == "presentationTime") {
          const time = data[key] || new Date(PRESENTATION_TIME);
          result[key] = time.toISOString();
        } else if (key == "startTime") {
          result[key] = data[key]?.toISOString();
        } else if (key == "enabled") {
          result[key] = data[key];
        } else {
          result[key] = data[key];
        }
      } else {
        result[key] = data[key] as null | undefined;
      }
    });
    return result;
  },
  fromDB: (data) => {
    return {
      ...data,
      presentationTime: data.presentationTime ? new Date(data.presentationTime) : new Date(PRESENTATION_TIME),
      startTime: data.startTime ? new Date(data.startTime) : undefined,
    };
  },
};

// ---- Reaction（アブストラクトタイプ）の型宣言 ---- //

export type Reaction = {
  stampId: string;
  senderId: string;
  sendAt: Date;
};
export type ReactionOnDB = {
  stampId: string;
  senderId: string;
  sendAt: string;
};

export const isReaction = (instance: any): instance is Reaction => {
  return instance !== undefined && "stampId" in instance && "senderId" in instance && "sendAt" in instance;
};

export const ReactionConverter: DBConverter<Reaction, ReactionOnDB> = {
  toDB: (data) => {
    const result: nullable<ReactionOnDB> = {};
    const keys = Object.keys(data) as [keyof ReactionOnDB];
    keys.forEach((key) => {
      if (data[key]) {
        if (key == "sendAt") {
          result[key] = data[key]?.toISOString();
        } else {
          result[key] = data[key];
        }
      } else {
        result[key] = data[key] as null | undefined;
      }
    });
    return result;
  },
  fromDB: (data) => {
    return {
      ...data,
      sendAt: new Date(data.sendAt),
    };
  },
};

// ---- PlainReactionの型宣言 ---- //

export interface PlainReaction extends Reaction {
  strength: number;
}
export interface PlainReactionOnDB extends ReactionOnDB {
  strength: number;
}

export const isPlainReaction = (instance: any): instance is PlainReaction => {
  return isReaction(instance) && "strength" in instance;
};

export const PlainReactionConverter: DBConverter<PlainReaction, PlainReactionOnDB> = {
  toDB: (data) => {
    return {
      ...ReactionConverter.toDB(data),
    };
  },
  fromDB: (data) => {
    return {
      ...data,
      ...ReactionConverter.fromDB(data),
    };
  },
};

// ---- MessageReactionの型宣言 ---- //

export interface MessageReaction extends Reaction {
  message: string;
}
export interface MessageReactionOnDB extends ReactionOnDB {
  message: string;
}

export const isMessageReaction = (instance: any): instance is MessageReaction => {
  return isReaction(instance) && "message" in instance;
};

export const MessageReactionConverter: DBConverter<MessageReaction, MessageReactionOnDB> = {
  toDB: (data) => {
    return {
      ...ReactionConverter.toDB(data),
    };
  },
  fromDB: (data) => {
    return {
      ...data,
      ...ReactionConverter.fromDB(data),
    };
  },
};

// ---- Action（アブストラクト）の型宣言 ---- //

export type Action = {
  sendAt: Date;
};
export type ActionOnDB = {
  sendAt: string;
};

export const isAction = (instance: any): instance is Action => {
  return instance !== undefined && "sendAt" in instance;
};

export const ActionConverter: DBConverter<Action, ActionOnDB> = {
  toDB: (data) => {
    const result: nullable<ActionOnDB> = {};
    const keys = Object.keys(data) as [keyof ActionOnDB];
    keys.forEach((key) => {
      if (data[key]) {
        if (key == "sendAt") {
          result[key] = data[key]?.toISOString();
        } else {
          result[key] = data[key];
        }
      } else {
        result[key] = data[key] as null | undefined;
      }
    });
    return result;
  },
  fromDB: (data) => {
    return {
      ...data,
      sendAt: new Date(data.sendAt),
    };
  },
};

// ---- BoostActionの型宣言 ---- //

export interface BoostAction extends Action {}
export interface BoostActionOnDB extends ActionOnDB {}

export const isBoostAction = (instance: any): instance is BoostAction => {
  return isAction(instance);
};

export const BoostActionConverter: DBConverter<BoostAction, BoostActionOnDB> = {
  toDB: (data) => {
    return {
      ...ActionConverter.toDB(data),
    };
  },
  fromDB: (data) => {
    return {
      ...data,
      ...ActionConverter.fromDB(data),
    };
  },
};

// ---- MuteActionの型宣言 ---- //

export interface MuteAction extends Action {}
export interface MuteActionOnDB extends ActionOnDB {}

export const isMuteAction = (instance: any): instance is MuteAction => {
  return isAction(instance);
};

export const MuteActionConverter: DBConverter<MuteAction, MuteActionOnDB> = {
  toDB: (data) => {
    return {
      ...ActionConverter.toDB(data),
    };
  },
  fromDB: (data) => {
    return {
      ...data,
      ...ActionConverter.fromDB(data),
    };
  },
};

// ---- その他，ジェネリック型 ---- //

export type ActionList<T> = {
  sortedKey: string[];
  data: { [key: string]: T };
};

export type HotItem<T> = T & {
  done: boolean;
};

export type RTGrandPrixState = {
  isEntered: boolean;
  grandPrixId?: string;
  grandPrix?: RTGrandPrix;
  plainReactions: ActionList<HotItem<PlainReaction>>;
  messageReactions: ActionList<HotItem<MessageReaction>>;
  boostActions: ActionList<HotItem<BoostAction>>;
  muteActions: ActionList<HotItem<MuteAction>>;
};

// ---- Payload ---- //
type GrandPrixPayload = ValuePayload<RTGrandPrix>;
type PlainReactionPayload = ListPayload<PlainReaction>;
type MessageReactionPayload = ListPayload<MessageReaction>;
type BoostActionPayload = ListPayload<BoostAction>;
type MuteActionPayload = ListPayload<MuteAction>;

// ---- DBアップデート用タイプ ---- //
// null：値を削除，undefined：更新しない
export type GrandPrixUpdate = nullable<RTGrandPrix>;
export type PlainReactionUpdate = nullable<PlainReaction>;
export type MessageReactionUpdate = nullable<MessageReaction>;
export type BoostActionUpdate = nullable<BoostAction>;
export type MuteActionUpdate = nullable<MuteAction>;

const initialState: RTGrandPrixState = {
  isEntered: false,
  plainReactions: { sortedKey: [], data: {} },
  messageReactions: { sortedKey: [], data: {} },
  boostActions: { sortedKey: [], data: {} },
  muteActions: { sortedKey: [], data: {} },
};

const grandPrixSlice = createSlice({
  name: "room",
  initialState: { ...initialState } as RTGrandPrixState,
  reducers: {
    // ---- GrandPrix ---- //

    /**
     * グランプリ会場へ入場・再入場する
     * グランプリ情報が更新された際も呼び出される
     * @param state 前状態
     * @param action グランプリ情報
     */
    enterGrandPrix: (state, action: GrandPrixPayload) => {
      const { id, data } = action.payload;
      state.isEntered = true;
      state.grandPrixId = id;
      state.grandPrix = data;
    },
    /**
     * グランプリ会場から退場する
     * @param state 前状態
     */
    exitGrandPrix: (state) => {
      Object.assign(state, initialState);
    },

    // ---- PlainReactions ---- //

    addPlainReaction: (state, action: PlainReactionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.plainReactions.sortedKey = addChild(state.plainReactions.sortedKey, id, previousChildName);
      state.plainReactions.data[id] = {
        ...data,
        done: false,
      };
    },
    updatePlainReaction: (state, action: PlainReactionPayload) => {
      const { id, data } = action.payload;
      state.plainReactions.data[id] = {
        ...data,
        done: false,
      };
    },
    movePlainReaction: (state, action: PlainReactionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.plainReactions.sortedKey = moveChild(state.plainReactions.sortedKey, id, previousChildName);
      state.plainReactions.data[id] = {
        ...data,
        done: false,
      };
    },
    removePlainReaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.plainReactions.sortedKey = removeChild(state.plainReactions.sortedKey, id);
      delete state.plainReactions.data[id];
    },
    donePlainReaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.plainReactions.data[id] = {
        ...state.plainReactions.data[id],
        done: true,
      };
    },
    resetPlainReactions: (state) => {
      state.plainReactions.sortedKey = [];
      state.plainReactions.data = {};
    },

    // ---- MessageReactions ---- //

    addMessageReaction: (state, action: MessageReactionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.messageReactions.sortedKey = addChild(state.messageReactions.sortedKey, id, previousChildName);
      state.messageReactions.data[id] = {
        ...data,
        done: false,
      };
    },
    updateMessageReaction: (state, action: MessageReactionPayload) => {
      const { id, data } = action.payload;
      state.messageReactions.data[id] = {
        ...data,
        done: false,
      };
    },
    moveMessageReaction: (state, action: MessageReactionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.messageReactions.sortedKey = moveChild(state.messageReactions.sortedKey, id, previousChildName);
      state.messageReactions.data[id] = {
        ...data,
        done: false,
      };
    },
    removeMessageReaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.messageReactions.sortedKey = removeChild(state.messageReactions.sortedKey, id);
      delete state.messageReactions.data[id];
    },
    resetMessageReactions: (state) => {
      state.messageReactions.sortedKey = [];
      state.messageReactions.data = {};
    },

    // ---- BoostActions ---- //

    addBoostAction: (state, action: BoostActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.boostActions.sortedKey = addChild(state.boostActions.sortedKey, id, previousChildName);
      state.boostActions.data[id] = {
        ...data,
        done: false,
      };
    },
    updateBoostAction: (state, action: BoostActionPayload) => {
      const { id, data } = action.payload;
      state.boostActions.data[id] = {
        ...data,
        done: false,
      };
    },
    moveBoostAction: (state, action: BoostActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.boostActions.sortedKey = moveChild(state.boostActions.sortedKey, id, previousChildName);
      state.boostActions.data[id] = {
        ...data,
        done: false,
      };
    },
    removeBoostAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.boostActions.sortedKey = removeChild(state.boostActions.sortedKey, id);
      delete state.boostActions.data[id];
    },
    resetBoostActions: (state) => {
      state.boostActions.sortedKey = [];
      state.boostActions.data = {};
    },

    // ---- MuteActions ---- //

    addMuteAction: (state, action: MuteActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.muteActions.sortedKey = addChild(state.muteActions.sortedKey, id, previousChildName);
      state.muteActions.data[id] = {
        ...data,
        done: false,
      };
    },
    updateMuteAction: (state, action: MuteActionPayload) => {
      const { id, data } = action.payload;
      state.muteActions.data[id] = {
        ...data,
        done: false,
      };
    },
    moveMuteAction: (state, action: MuteActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.muteActions.sortedKey = moveChild(state.muteActions.sortedKey, id, previousChildName);
      state.muteActions.data[id] = {
        ...data,
        done: false,
      };
    },
    removeMuteAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.muteActions.sortedKey = removeChild(state.muteActions.sortedKey, id);
      delete state.muteActions.data[id];
    },
    resetMuteActions: (state) => {
      state.muteActions.sortedKey = [];
      state.muteActions.data = {};
    },
  },
});

export const {
  enterGrandPrix,
  exitGrandPrix,
  addPlainReaction,
  updatePlainReaction,
  movePlainReaction,
  removePlainReaction,
  donePlainReaction,
  resetPlainReactions,
  addMessageReaction,
  updateMessageReaction,
  moveMessageReaction,
  removeMessageReaction,
  resetMessageReactions,
  addBoostAction,
  updateBoostAction,
  moveBoostAction,
  removeBoostAction,
  resetBoostActions,
  addMuteAction,
  updateMuteAction,
  moveMuteAction,
  removeMuteAction,
  resetMuteActions,
} = grandPrixSlice.actions;

export default grandPrixSlice.reducer;
