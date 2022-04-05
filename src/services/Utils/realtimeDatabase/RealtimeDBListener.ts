import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import {
  DatabaseReference,
  DataSnapshot,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  onChildRemoved,
  onDisconnect,
  onValue,
  Query,
  Unsubscribe,
} from "firebase/database";
import { nullable, ThunkResult } from "../Types";

// ---- Valueタイプ（DB上でオブジェクトで保存されているタイプ） ---- //
/**
 * ValueタイプのデータがReducerに渡されるときの引数
 */
export type ValueReducerArg<T> = {
  id: string;
  data: T;
};
/**
 * {@link ValueReducerArg}をPayload化したもの
 */
export type ValuePayload<T> = PayloadAction<ValueReducerArg<T>>;

// ---- Listタイプ（DB上でリストで保存されているタイプ） ---- //
/**
 * ListタイプのデータがReducerに渡されるときの引数
 * (Removeを除く)
 */
export type ListReducerArg<T> = {
  id: string;
  data: T;
  previousChildName?: string | null;
};
/**
 * {@link ListReducerArg}をPayload化したもの
 */
export type ListPayload<T> = PayloadAction<ListReducerArg<T>>;

// コンバーターの定義
export type DBConverter<Plain, OnDB> = {
  toDB: (data: nullable<Plain>) => nullable<OnDB>;
  fromDB: (data: OnDB) => Plain;
};

// ---- Value Typeのリスナーを設定する関数群 ---- //

type _valueReducerFunc = ActionCreatorWithPayload<ValueReducerArg<any>>;
type _valueRemoveReducerFunc = ActionCreatorWithoutPayload;
type _valueConverter = (value: any) => any;

/**
 * 単一データの同期をcallbackKeyに紐づけて開始する
 * @param callbackKey コールバックキー
 * @param syncRef 同期先参照
 * @param reducerFunc 変更適用Reducer
 * @param removeReducerFunc 削除Reducer
 * @returns dispatch用関数
 */
export const startValueDBSync = (
  callbackKey: string,
  syncRef: Query,
  reducerFunc: _valueReducerFunc,
  removeReducerFunc?: _valueRemoveReducerFunc,
  converter?: _valueConverter
): ThunkResult<void> => {
  return (dispatch: any) => {
    _setCallBackToSyncSingleData(callbackKey, syncRef, (ss: DataSnapshot) => {
      const data = ss.val();
      if (data && ss.key) {
        const roomData = {
          id: ss.key,
          data: converter ? converter(data) : { ...data },
        };
        dispatch(reducerFunc(roomData));
      } else {
        if (removeReducerFunc) dispatch(removeReducerFunc());
      }
    });
  };
};

export const stopValueDBSync = (callbackKey: string): ThunkResult<void> => {
  return () => {
    _unsubscribeCallBackToSyncSingleData(callbackKey);
  };
};

// ---- List Typeのリスナーを設定する関数群 ---- //

type _listReducerFunc = ActionCreatorWithPayload<ListReducerArg<any>, string>;
type _listRemoveReducerFunc = ActionCreatorWithPayload<string, string>;
type _listValueConverter = (value: any) => any;

/**
 * リストデータの同期をcallbackKeyに紐づけて開始する
 * @param callbackKey コールバックキー
 * @param syncRef 同期先参照
 * @param addedFunc child追加Reducer
 * @param updatedFunc child更新Reducer
 * @param movedFunc child移動Reducer
 * @param removedFunc child追加Reducer
 * @returns dispatch用関数
 */
export const startListDBSync = (
  callbackKey: string,
  syncRef: Query,
  addedFunc: _listReducerFunc,
  updatedFunc: _listReducerFunc,
  movedFunc: _listReducerFunc,
  removedFunc: _listRemoveReducerFunc,
  converter?: _listValueConverter
): ThunkResult<void> => {
  return (dispatch: any) => {
    _setCallBackToSyncListData(
      callbackKey,
      syncRef,
      // childAddedCB
      (ss: DataSnapshot, previousChildName?: string | null) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(
            addedFunc({
              id: ss.key,
              data: converter ? converter(data) : { ...data },
              previousChildName: previousChildName,
            })
          );
        }
      },
      // childchangedCB
      (ss: DataSnapshot) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(
            updatedFunc({
              id: ss.key,
              data: converter ? converter(data) : { ...data },
            })
          );
        }
      },
      // childMovedCB
      (ss: DataSnapshot, previousChildName?: string | null) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(
            movedFunc({
              id: ss.key,
              data: converter ? converter(data) : { ...data },
              previousChildName: previousChildName,
            })
          );
        }
      },
      // childRemovedCB
      (ss: DataSnapshot) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(removedFunc(ss.key));
        }
      }
    );
  };
};

/**
 * 指定したcallbackKeyに設定したリストデータの同期を停止する
 * @param callbackKey コールバックキー
 * @returns dispatch用関数
 */
export const stopListDBSync = (callbackKey: string): ThunkResult<void> => {
  return () => {
    _unsubscribeCallBackToSyncListData(callbackKey);
  };
};

/**
 * 単一データを監視するコールバックを設定
 * @param callbackKey コールバックキー
 * @param query データベースクエリ
 * @param valueCB コールバック関数
 */
const _setCallBackToSyncSingleData = (callbackKey: string, query: Query, valueCB: any) => {
  _setCallBack(callbackKey, query, onValue, valueCB);
};

/**
 * 単一データを監視しているコールバックを削除
 * @param callbackKey コールバックキー
 */
const _unsubscribeCallBackToSyncSingleData = (callbackKey: string) => {
  _unsubscribe(callbackKey);
};

/**
 * リストデータを監視するコールバックを設定
 * @param callbackKey コールバックキー
 * @param query データベースクエリ
 * @param childAddedCB 追加時のコールバック関数
 * @param childChangedCB 更新時のコールバック関数
 * @param childMovedCB 移動時のコールバック関数
 * @param childRemovedCB 削除時のコールバック関数
 */
const _setCallBackToSyncListData = (
  callbackKey: string,
  query: Query,
  childAddedCB?: any,
  childChangedCB?: any,
  childMovedCB?: any,
  childRemovedCB?: any
) => {
  if (childAddedCB) _setCallBack(callbackKey + "/added", query, onChildAdded, childAddedCB);
  if (childChangedCB) _setCallBack(callbackKey + "/changed", query, onChildChanged, childChangedCB);
  if (childMovedCB) _setCallBack(callbackKey + "/moved", query, onChildMoved, childMovedCB);
  if (childRemovedCB) _setCallBack(callbackKey + "/removed", query, onChildRemoved, childRemovedCB);
};

/**
 * リストデータを監視しているコールバックを全て削除
 * @param callbackKey コールバックキー
 */
const _unsubscribeCallBackToSyncListData = (callbackKey: string) => {
  _unsubscribe(callbackKey + "/added");
  _unsubscribe(callbackKey + "/changed");
  _unsubscribe(callbackKey + "/moved");
  _unsubscribe(callbackKey + "/removed");
};

export const setValueOnDisconnect = async (ref: DatabaseReference, value: any) => {
  await onDisconnect(ref).set(value);
};

export const updateOnDisconnect = async (ref: DatabaseReference, value: any) => {
  await onDisconnect(ref).update(value);
};

export const removeOnDisconnect = async (ref: DatabaseReference) => {
  await onDisconnect(ref).remove();
};

export const setWithPriorityOnDisconnect = async (
  ref: DatabaseReference,
  value: any,
  priority: string | number | null
) => {
  await onDisconnect(ref).setWithPriority(value, priority);
};

export const cancelOnDisconnect = async (ref: DatabaseReference) => {
  await onDisconnect(ref).cancel();
};

/**
 * コールバック削除関数リスト
 */
const unsubscribes: { [key: string]: Unsubscribe } = {};

type listenerSetFunc =
  | typeof onChildAdded
  | typeof onChildChanged
  | typeof onChildMoved
  | typeof onChildRemoved
  | typeof onValue;

/**
 * 指定したcallbackKeyにコールバックを設定
 * @param callbackKey コールバックの保存キー
 * @param query データベースクエリ
 * @param setCBFunc コールバック設定関数
 * @param callback コールバック関数
 */
const _setCallBack = (callbackKey: string, query: Query, setCBFunc: listenerSetFunc, callback: any) => {
  if (callbackKey in unsubscribes) {
    unsubscribes[callbackKey]();
  }
  unsubscribes[callbackKey] = setCBFunc(query, callback);
};

/**
 * 指定したQuery・EventTypeのコールバックを削除
 * @param callbackKey コールバックの保存キー
 */
const _unsubscribe = (callbackKey: string) => {
  if (callbackKey in unsubscribes) {
    unsubscribes[callbackKey]();
    delete unsubscribes[callbackKey];
  }
};
