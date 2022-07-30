import { child, get, push, set, update } from "firebase/database";
import {
  ActionsRef,
  BoostAction,
  BoostActionsRef,
  BoostActionUpdate,
  RTGrandPrix,
  GrandPrixesRef,
  GrandPrixUpdate,
  isGrandPrix,
  MessageReaction,
  MessageReactionsRef,
  MessageReactionUpdate,
  MuteAction,
  MuteActionsRef,
  MuteActionUpdate,
  PlainReaction,
  PlainReactionsRef,
  PlainReactionUpdate,
  RTGrandPrixConverter,
  PlainReactionConverter,
  MessageReactionConverter,
  BoostActionConverter,
  MuteActionConverter,
} from "../RealtimeGrandPrix";

// ---- Realtime DBへのset・update・push・removeファンクション群 ----- //

/**
 * グランプリ情報を取得する
 * @param grandPrixId グランプリID
 * @returns グランプリ情報
 */
export const getGrandPrixAsync = async (grandPrixId: string) => {
  if (grandPrixId == "") return;

  //DBからGET
  const ss = await get(child(GrandPrixesRef(), grandPrixId));
  const data = ss.val();

  //データが存在しない場合はundefined
  if (!data) return;

  //ルーム情報にキャスト
  const grandPrix: RTGrandPrix = RTGrandPrixConverter.fromDB({
    enabled: data.enabled,
    currentPresenterId: data.currentPresenterId,
    nextPresenterId: data.nextPresenterId,
    presentationTime: data.presentationTime || new Date(600000),
    startTime: data.startTime,
  });

  //チェック
  if (!isGrandPrix(grandPrix)) return;

  return grandPrix;
};

/**
 * グランプリ情報をセットする
 * @param grandPrixId グランプリID
 * @param grandPrix グランプリ情報
 * @returns DB上のグランプリへの参照
 */
export const setGrandPrixAsync = async (grandPrixId: string, grandPrix: RTGrandPrix) => {
  if (grandPrixId == "") return;
  await set(child(GrandPrixesRef(), grandPrixId), RTGrandPrixConverter.toDB(grandPrix));
};

/**
 * グランプリ情報を更新する
 * @param grandPrixId グランプリID
 * @param grandPrix グランプリ情報
 */
export const updateGrandPrixAsync = async (grandPrixId: string, grandPrix: GrandPrixUpdate) => {
  if (grandPrixId == "") return;
  await update(child(GrandPrixesRef(), grandPrixId), RTGrandPrixConverter.toDB(grandPrix));
};

/**
 * グランプリを削除し、グランプリに関連付いたアクション情報をすべて削除する
 * @param grandPrixId グランプリID
 */
export const destroyGrandPrixAsync = async (grandPrixId: string) => {
  if (grandPrixId == "") return;
  await set(child(GrandPrixesRef(), grandPrixId), null);
  await set(child(ActionsRef(), grandPrixId), null);
};

// ---- Realtime DBへPlainReactions情報をset・update・removeする関数群 ---- //

export const addPlainReactionAsync = async (grandPrixId: string, presenterId: string, plainReaction: PlainReaction) => {
  if (grandPrixId == "" || presenterId == "") return;
  await push(PlainReactionsRef(grandPrixId, presenterId), PlainReactionConverter.toDB(plainReaction));
};

export const updatePlainReactionAsync = async (
  grandPrixId: string,
  presenterId: string,
  id: string,
  plainReaction: PlainReactionUpdate
) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await update(child(PlainReactionsRef(grandPrixId, presenterId), id), PlainReactionConverter.toDB(plainReaction));
};

export const removePlainReactionsAsync = async (grandPrixId: string, presenterId: string, id: string) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await set(child(PlainReactionsRef(grandPrixId, presenterId), id), null);
};

// ---- Realtime DBへMessageReactions情報をset・update・removeする関数群 ---- //

export const addMessageReactionAsync = async (
  grandPrixId: string,
  presenterId: string,
  messageReaction: MessageReaction
) => {
  if (grandPrixId == "" || presenterId == "") return;
  await push(MessageReactionsRef(grandPrixId, presenterId), MessageReactionConverter.toDB(messageReaction));
};

export const updateMessageReactionAsync = async (
  grandPrixId: string,
  presenterId: string,
  id: string,
  messageReaction: MessageReactionUpdate
) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await update(
    child(MessageReactionsRef(grandPrixId, presenterId), id),
    MessageReactionConverter.toDB(messageReaction)
  );
};

export const removeMessageReactionsAsync = async (grandPrixId: string, presenterId: string, id: string) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await set(child(MessageReactionsRef(grandPrixId, presenterId), id), null);
};

// ---- Realtime DBへBoostActions情報をset・update・removeする関数群 ---- //

export const addBoostActionAsync = async (grandPrixId: string, presenterId: string, boostAction: BoostAction) => {
  if (grandPrixId == "" || presenterId == "") return;
  console.log(grandPrixId, presenterId, boostAction, BoostActionsRef(grandPrixId, presenterId).toString());
  await push(BoostActionsRef(grandPrixId, presenterId), BoostActionConverter.toDB(boostAction));
};

export const updateBoostActionAsync = async (
  grandPrixId: string,
  presenterId: string,
  id: string,
  boostAction: BoostActionUpdate
) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await update(child(BoostActionsRef(grandPrixId, presenterId), id), BoostActionConverter.toDB(boostAction));
};

export const removeBoostActionsAsync = async (grandPrixId: string, presenterId: string, id: string) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await set(child(BoostActionsRef(grandPrixId, presenterId), id), null);
};

// ---- Realtime DBへMuteActions情報をset・update・removeする関数群 ---- //

export const addMuteActionAsync = async (grandPrixId: string, presenterId: string, muteAction: MuteAction) => {
  if (grandPrixId == "" || presenterId == "") return;
  await push(MuteActionsRef(grandPrixId, presenterId), MuteActionConverter.toDB(muteAction));
};

export const updateMuteActionAsync = async (
  grandPrixId: string,
  presenterId: string,
  id: string,
  muteAction: MuteActionUpdate
) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await update(child(MuteActionsRef(grandPrixId, presenterId), id), MuteActionConverter.toDB(muteAction));
};

export const removeMuteActionsAsync = async (grandPrixId: string, presenterId: string, id: string) => {
  if (grandPrixId == "" || presenterId == "" || id == "") return;
  await set(child(MuteActionsRef(grandPrixId, presenterId), id), null);
};
