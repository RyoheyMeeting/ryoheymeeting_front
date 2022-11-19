import { doc, FirestoreDataConverter, getDoc, Transaction, updateDoc } from "firebase/firestore";
import { isOtherUser, OtherUser, UsersRef, UserUpdatedToFirestore } from "../Users";

const userConverter: FirestoreDataConverter<OtherUser> = {
  toFirestore: (user) => {
    return {
      ...user,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const user = {
      ...data,
    };
    if (!isOtherUser(user)) throw Error("firebaseのユーザ情報が不正");
    return user;
  },
};

export const getUserAsync = async (userId: string) => {
  if (userId == "") return;
  const ss = await getDoc(doc(UsersRef(), userId));
  if (!ss.exists() || !ss.data()) return;
  const data = ss.data();
  const user: OtherUser = {
    displayName: data.displayName,
    photoURL: data.photoURL,
    role: data.role,
    collvoPoint: data.collvoPoint,
    lastLoggedIn: data.lastLoggedIn,
    registeredAt: data.registeredAt,
    stamps: data.stamps,
    participateInfos: data.participateInfos,
    portfolios: data.portfolios,
  };
  return user;
};

/**
 * 運営のみ操作できるようにすること
 * @param userId ユーザID
 * @param userData ユーザデータ
 */
export const updateUserAsync = async (userId: string, userData: UserUpdatedToFirestore) => {
  if (userId == "") return;
  await updateDoc(doc(UsersRef(), userId).withConverter(userConverter), userData);
};

export const updateUserWithTransaction = (
  userId: string,
  userData: UserUpdatedToFirestore,
  transaction: Transaction
) => {
  if (userId == "") return;
  return transaction.update(doc(UsersRef(), userId).withConverter(userConverter), userData);
};
