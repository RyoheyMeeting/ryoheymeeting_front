import _firebase from "firebase/compat/app";
import "firebase/compat/auth";

import Config from "config";
import { getAuth as fb_getAuth } from "firebase/auth";
import { getDatabase as fb_getDatabase } from "firebase/database";
import { getFirestore as fb_getFirestore } from "firebase/firestore";
import { getStorage as fb_getStorage } from "firebase/storage";

// ---- firebaseの初期化と基本機能のエクスポート ---- //
export const firebaseApp = _firebase.initializeApp(Config.firebase);

// 各インスタンスを取得
const _auth = fb_getAuth();
const _db = fb_getDatabase();
const _store = fb_getFirestore();
const _storage = fb_getStorage();

// 取得関数をエクスポート
export const firebase = _firebase;
export const getAuth = () => _auth;
export const getDatabase = () => _db;
export const getFirestore = () => _store;
export const getStorage = () => _storage;

// ---- その他firebase関連の便利関数群 ---- //
export const getIdToken = async () => {
  return getAuth().currentUser?.getIdToken();
};

// 開発中はエミュレータにアクセス
// if(Config.isDev) {
//   const emuConf = Config.emulator;
//   if(emuConf.host){
//     connectAuthEmulator(_auth, `http://${emuConf.host}:${emuConf.ports}`);
//     connectDatabaseEmulator(_db, emuConf.host, emuConf.ports.database);
//     connectFirestoreEmulator(_store, emuConf.host, emuConf.ports.firestore);
//     connectStorageEmulator(_storage, emuConf.host, emuConf.ports.firestore);
//   }
// }
