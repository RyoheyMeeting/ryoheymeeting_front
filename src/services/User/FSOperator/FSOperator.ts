import { deleteDoc, doc, FirestoreDataConverter, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { isDate } from "services/Utils/Types";
import { isUser, User, UserOperate, UsersRef, UserUpdate } from "../User";

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user) => {
    return {
      ...user,
      lastLoggedIn: isDate(user.lastLoggedIn) ? Timestamp.fromDate(user.lastLoggedIn) : user.lastLoggedIn,
      registeredAt: isDate(user.registeredAt) ? Timestamp.fromDate(user.registeredAt) : user.registeredAt,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const user = {
      ...data,
      lastLoggedIn: data.lastLoggedIn.toDate(),
      registeredAt: data.registeredAt.toDate(),
    };
    if (!isUser(user)) throw Error("firebaseのユーザ情報が不正");
    return user;
  },
};

export const getUserDataAsync = async (userId: string) => {
  if (userId == "") return;

  return await getDoc(doc(UsersRef(), userId).withConverter(userConverter))
    .then((ss) => {
      if (!ss.exists()) return;

      const userData = ss.data();

      return userData;
    })
    .catch(() => {});
};

export const setUserDataAsync = async (userId: string, userData: UserOperate) => {
  if (userId == "") return;
  await setDoc(doc(UsersRef(), userId).withConverter(userConverter), userData);
};

export const updateUserDataAsync = async (userId: string, userData: UserUpdate) => {
  if (userId == "") return;
  await updateDoc(doc(UsersRef(), userId).withConverter(userConverter), userData);
};

export const removeUserDataAsync = async (userId: string) => {
  if (userId == "") return;
  await deleteDoc(doc(UsersRef(), userId).withConverter(userConverter));
};
