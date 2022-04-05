import { createSlice } from "@reduxjs/toolkit";
import { collection, UpdateData } from "firebase/firestore";
import { getFirestore } from "firebase_config";
import { getUserDataAsync } from "services/User/FSOperator/FSOperator";
import { User } from "services/User/User";
import { PartialFieldValue, PayloadWithId, ThunkResult } from "services/Utils/Types";
import { updateUserAsync } from "./FSOperator/FSOperator";

export const UsersRef = () => collection(getFirestore(), "users");

export type OtherUser = User;

export const isOtherUser = (instance: any): instance is User => {
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

export type UsersState = {
  users: { [key: string]: OtherUser };
};

export type UserUpdatedToFirestore = UpdateData<OtherUser>;
export type UserOperationOfFirestore = PartialFieldValue<OtherUser>;
export type UserPartial = Partial<OtherUser>;

type UserPayload = PayloadWithId<OtherUser>;

const initialState: UsersState = {
  users: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState: { ...initialState } as UsersState,
  reducers: {
    setUser: (state, action: UserPayload) => {
      const { id, data } = action.payload;
      state.users[id] = data;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const loadUserAsync = (userId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    const { users } = getState().users;
    if (!(userId in users)) {
      const user = await getUserDataAsync(userId);
      if (user)
        dispatch(
          setUser({
            id: userId,
            data: user,
          })
        );
    }
  };
};

export const updateUserWithSaving = (
  userId: string,
  userData: UserPartial,
  operate?: UserOperationOfFirestore
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    // 新データを作成
    const data: { [key: string]: any } = {};
    const userKeys = Object.keys(userData) as [keyof OtherUser];
    userKeys.forEach((key) => {
      data[key] = operate && operate[key] ? operate[key] : userData[key];
    });

    //Firestoreに追加
    return updateUserAsync(userId, data as UserUpdatedToFirestore).then(async () => {
      // 前の状態を保持
      const preUser = getState().users.users[userId];

      // 分割データで来るので足りない部分をpreStampからコピーする
      const updateData: { [key: string]: any } = {};
      const userKeys = Object.keys(preUser) as [keyof OtherUser];
      userKeys.forEach((key) => {
        updateData[key] = userData[key] ? userData[key] : preUser[key];
      });
      await dispatch(
        setUser({
          id: userId,
          data: updateData as OtherUser,
        })
      );
    });
  };
};

export default usersSlice.reducer;
