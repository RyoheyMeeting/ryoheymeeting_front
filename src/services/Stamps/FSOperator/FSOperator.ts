import { deleteDoc, doc, FirestoreDataConverter, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { isStamp, Stamp, StampAddedToFirestore, StampsRef, StampUpdatedToFirestore } from "../Stamps";

const stampConverter: FirestoreDataConverter<Stamp> = {
  toFirestore: (stamp) => {
    return {
      ...stamp,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const stamp = {
      ...data,
    };
    if (!isStamp(stamp)) throw Error("firebaseのスタンプ情報が不正");
    return stamp;
  },
};

export const getStampsAsync = async () => {
  return await getDocs(StampsRef().withConverter(stampConverter))
    .then((ss) => {
      const stamps: { [key: string]: Stamp } = {};
      ss.forEach((doc) => {
        const data = doc.data();
        stamps[doc.id] = {
          name: data.name,
          typeId: data.typeId,
          imageURL: data.imageURL,
          soundURL: data.soundURL,
        };
      });
      return stamps;
    })
    .catch(() => {});
};

export const setStampAsync = async (stampId: string, stampData: StampAddedToFirestore) => {
  if (stampId == "") return;
  await setDoc(doc(StampsRef(), stampId).withConverter(stampConverter), stampData);
};

export const updateStampAsync = async (stampId: string, stampData: StampUpdatedToFirestore) => {
  if (stampId == "") return;
  await updateDoc(doc(StampsRef(), stampId).withConverter(stampConverter), stampData);
};

export const removeStampAsync = async (stampId: string) => {
  if (stampId == "") return;
  await deleteDoc(doc(StampsRef(), stampId).withConverter(stampConverter));
};
