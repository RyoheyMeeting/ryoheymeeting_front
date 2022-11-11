import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";
import { deletable, firestoreOperatable, nullable, ThunkResult } from "services/Utils/Types";
import { getUserDataAsync, updateUserDataAsync } from "./FSOperator/FSOperator";
import { firebase, getAuth, getFirestore } from "firebase_config";

export const UsersRef = () => collection(getFirestore(), "users");

export const UserRole = {
  staff: -1,
  common: 0,
} as const;
export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export type User = {
  displayName: string;
  photoURL?: string;
  role: UserRoleType;
  collvoPoint: number;
  lastLoggedIn: Date;
  registeredAt: Date;
  stamps: string[];
  participateInfos: string[];
  portfolios: string[];
};

export const isUser = (instance: any): instance is User => {
  return (
    instance !== undefined &&
    "displayName" in instance &&
    "role" in instance &&
    "collvoPoint" in instance &&
    "lastLoggedIn" in instance &&
    "registeredAt" in instance &&
    "stamps" in instance &&
    "participateInfos" in instance &&
    "portfolios" in instance
  );
};

export type UserState = {
  id?: string;
  user?: User;
  isLogin: boolean;
  loading: boolean;
  error?: string;
};

export type UserUpdate = deletable<User>;
export type UserOperate = nullable<firestoreOperatable<User>>;

type signInPayload = PayloadAction<{
  id: string;
}>;

const initialState: UserState = {
  id: undefined,
  user: undefined,
  isLogin: false,
  loading: true,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialState } as UserState,
  reducers: {
    /**
     * サインイン状態にする
     * @param state 前状態
     * @param action ユーザ情報
     */
    signIn: (state, action: signInPayload) => {
      const { id } = action.payload;
      state.id = id;
      state.isLogin = true;
    },
    updateUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    /**
     * サインアウト状態にする
     * @param state 前状態
     */
    signOut: (state) => {
      Object.assign(state, initialState);
      state.loading = false;
    },
  },
});

export const { signIn, updateUserData, setError, signOut } = userSlice.actions;

/**
 * サインイン状態を監視するリスナーを設定する
 * @returns dispatch用関数
 */
export const setCallBackToSyncUser = (): ThunkResult<void> => {
  return async (dispatch) => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        dispatch(
          signIn({
            id: user.uid,
          })
        );

        // Firebase上にユーザデータが存在しない場合はユーザデータを作成
        await dispatch(
          initializeUserData(user.uid, {
            displayName: user.displayName ? user.displayName : "名無しのユーザ",
            photoURL: user.photoURL ? user.photoURL : null,
            role: UserRole.common,
            collvoPoint: 0,
            lastLoggedIn: serverTimestamp(),
            registeredAt: serverTimestamp(),
            stamps: [],
            participateInfos: [],
            portfolios: [],
          })
        );

        await updateUserDataAsync(user.uid, {
          lastLoggedIn: serverTimestamp(),
        });
        dispatch(reloadUserDataAsync());
      } else {
        dispatch(signOut());
      }
    });
  };
};

export const initializeUserData = (userId: string, initialUserData: UserOperate): ThunkResult<void> => {
  return async (dispatch) => {
    if (userId == "") return;
    await getDoc(doc(UsersRef(), userId))
      .then(async (ss) => {
        if (!ss.exists()) {
          await setDoc(doc(UsersRef(), userId), initialUserData);
        } else {
          const userData = ss.data();
          if (!isUser(userData)) {
            //足りないユーザ情報を設定
            const updatedData: { [key: string]: any } = {};
            const initMap = new Map(Object.entries(initialUserData));
            Object.keys(initialUserData).forEach((key: string) => {
              if (!(key in userData)) updatedData[key] = initMap.get(key);
            });

            await updateDoc(doc(UsersRef(), userId), updatedData);
          }
        }
      })
      .catch(() => {
        dispatch(setError("ユーザ情報が正常に取得できませんでした。"));
      });
  };
};

/**
 * ユーザ情報をFirestoreから取得して更新する
 * @returns dispatch用関数
 */
export const reloadUserDataAsync = (): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // ユーザID取得
    const userId = getState().user.id;
    if (!userId) return; //チェック

    // ユーザデータ取得
    const userData = await getUserDataAsync(userId);
    if (!userData) return; // チェック

    //更新
    dispatch(updateUserData(userData));
  };
};

/**
 * サインアウトする
 * @returns dispatch用関数
 */
export const signOutAsync = (): ThunkResult<void> => {
  return async (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signOut());
      });
  };
};

export default userSlice.reducer;
