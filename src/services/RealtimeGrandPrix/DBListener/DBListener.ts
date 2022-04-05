import { child } from "firebase/database";
import {
  startListDBSync,
  startValueDBSync,
  stopListDBSync,
  stopValueDBSync,
} from "services/Utils/realtimeDatabase/RealtimeDBListener";
import { ThunkResult } from "services/Utils/Types";
import {
  addBoostAction,
  addMessageReaction,
  addMuteAction,
  addPlainReaction,
  BoostActionConverter,
  BoostActionsRef,
  enterGrandPrix,
  exitGrandPrix,
  GrandPrixesRef,
  MessageReactionConverter,
  MessageReactionsRef,
  moveBoostAction,
  moveMessageReaction,
  moveMuteAction,
  movePlainReaction,
  MuteActionConverter,
  MuteActionsRef,
  PlainReactionConverter,
  PlainReactionsRef,
  removeBoostAction,
  removeMessageReaction,
  removeMuteAction,
  removePlainReaction,
  RTGrandPrixConverter,
  updateBoostAction,
  updateMessageReaction,
  updateMuteAction,
  updatePlainReaction,
} from "../RealtimeGrandPrix";

const CBKeys = {
  grandPrixes: "grandPrixes",
  plainReactions: "plainReactions",
  messageReactions: "messageReactions",
  boostActions: "boostActions",
  muteActions: "muteActions",
};

// ---- Realtime DBのグランプリ情報のリスナーを設定する関数群 ---- //

/**
 * グランプリ情報の同期を開始する
 * @param grandPrixId グランプリID
 * @returns dispatch関数
 */
export const startGrandPrixDBSync = (grandPrixId: string): ThunkResult<void> => {
  return (dispatch: any) => {
    if (grandPrixId == "") return;
    dispatch(
      startValueDBSync(
        CBKeys.grandPrixes,
        child(GrandPrixesRef(), grandPrixId),
        enterGrandPrix,
        exitGrandPrix,
        RTGrandPrixConverter.fromDB
      )
    );
  };
};

/**
 * グランプリ情報の同期を終了する
 * @returns dispatch関数
 */
export const stopGrandPrixDBSync = (): ThunkResult<void> => {
  return (dispatch: any) => {
    dispatch(stopValueDBSync(CBKeys.grandPrixes));
  };
};

// ---- Realtime DBのPlainReactions情報のリスナーを設定する関数群 ---- //

/**
 * プレーンリアクションの同期を開始する
 * @param grandPrixId グランプリID
 * @param presenterId プレゼンターID
 * @returns dispatch用関数
 */
export const startPlainReactionsDBSync = (grandPrixId: string, presenterId: string): ThunkResult<void> => {
  return (dispatch: any) => {
    if (grandPrixId == "" || presenterId == "") return;
    dispatch(
      startListDBSync(
        CBKeys.plainReactions,
        PlainReactionsRef(grandPrixId, presenterId),
        addPlainReaction,
        updatePlainReaction,
        movePlainReaction,
        removePlainReaction,
        PlainReactionConverter.fromDB
      )
    );
  };
};
/**
 * プレーンリアクションの同期を停止する
 * @returns dispatch用関数
 */
export const stopPlainReactionsDBSync = (): ThunkResult<void> => {
  return (dispatch: any) => {
    dispatch(stopListDBSync(CBKeys.plainReactions));
  };
};

// ---- Realtime DBのMessageReactions情報のリスナーを設定する関数群 ---- //

/**
 * メッセージリアクションの同期を開始する
 * @param grandPrixId グランプリID
 * @param presenterId プレゼンターID
 * @returns dispatch用関数
 */
export const startMessageReactionsDBSync = (grandPrixId: string, presenterId: string): ThunkResult<void> => {
  return (dispatch: any) => {
    if (grandPrixId == "" || presenterId == "") return;
    dispatch(
      startListDBSync(
        CBKeys.messageReactions,
        MessageReactionsRef(grandPrixId, presenterId),
        addMessageReaction,
        updateMessageReaction,
        moveMessageReaction,
        removeMessageReaction,
        MessageReactionConverter.fromDB
      )
    );
  };
};
/**
 * メッセージリアクションの同期を停止する
 * @returns dispatch用関数
 */
export const stopMessageReactionsDBSync = (): ThunkResult<void> => {
  return (dispatch: any) => {
    dispatch(stopListDBSync(CBKeys.messageReactions));
  };
};

// ---- Realtime DBのBoostActions情報のリスナーを設定する関数群 ---- //

/**
 * ブーストアクションの同期を開始する
 * @param grandPrixId グランプリID
 * @param presenterId プレゼンターID
 * @returns dispatch用関数
 */
export const startBoostActionsDBSync = (grandPrixId: string, presenterId: string): ThunkResult<void> => {
  return (dispatch: any) => {
    if (grandPrixId == "" || presenterId == "") return;
    dispatch(
      startListDBSync(
        CBKeys.boostActions,
        BoostActionsRef(grandPrixId, presenterId),
        addBoostAction,
        updateBoostAction,
        moveBoostAction,
        removeBoostAction,
        BoostActionConverter.fromDB
      )
    );
  };
};
/**
 * ブーストアクションの同期を停止する
 * @returns dispatch用関数
 */
export const stopBoostActionsDBSync = (): ThunkResult<void> => {
  return (dispatch: any) => {
    dispatch(stopListDBSync(CBKeys.boostActions));
  };
};

// ---- Realtime DBのMuteActions情報のリスナーを設定する関数群 ---- //

/**
 * ミュートアクションの同期を開始する
 * @param grandPrixId グランプリID
 * @param presenterId プレゼンターID
 * @returns dispatch用関数
 */
export const startMuteActionsDBSync = (grandPrixId: string, presenterId: string): ThunkResult<void> => {
  return (dispatch: any) => {
    if (grandPrixId == "" || presenterId == "") return;
    dispatch(
      startListDBSync(
        CBKeys.muteActions,
        MuteActionsRef(grandPrixId, presenterId),
        addMuteAction,
        updateMuteAction,
        moveMuteAction,
        removeMuteAction,
        MuteActionConverter.fromDB
      )
    );
  };
};
/**
 * ミュートアクションの同期を停止する
 * @returns dispatch用関数
 */
export const stopMuteActionsDBSync = (): ThunkResult<void> => {
  return (dispatch: any) => {
    dispatch(stopListDBSync(CBKeys.muteActions));
  };
};
