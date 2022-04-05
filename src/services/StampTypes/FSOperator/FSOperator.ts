import { deleteDoc, doc, FirestoreDataConverter, getDocs, setDoc, updateDoc } from "firebase/firestore";
import {
  StampType,
  StampTypesRef,
  StampTypeAddedToFirestore,
  StampTypeUpdatedToFirestore,
  isStampType,
} from "../StampTypes";

const stampTypeConverter: FirestoreDataConverter<StampType> = {
  toFirestore: (stampType) => {
    return {
      ...stampType,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const stampType = {
      ...data,
    };
    if (!isStampType(stampType)) throw Error("firebaseのスタンプタイプ情報が不正");
    return stampType;
  },
};

export const getStampTypesAsync = async () => {
  return await getDocs(StampTypesRef().withConverter(stampTypeConverter))
    .then((ss) => {
      const stampTypes: { [key: string]: StampType } = {};
      ss.forEach((doc) => {
        const data = doc.data();
        stampTypes[doc.id] = {
          name: data.name,
          description: data.description,
        };
      });
      return stampTypes;
    })
    .catch(() => {});
};

export const setStampTypeAsync = async (stampTypeId: string, stampTypeData: StampTypeAddedToFirestore) => {
  if (stampTypeId == "") return;
  await setDoc(doc(StampTypesRef(), stampTypeId).withConverter(stampTypeConverter), stampTypeData);
};

export const updateStampTypeAsync = async (stampTypeId: string, stampTypeData: StampTypeUpdatedToFirestore) => {
  if (stampTypeId == "") return;
  await updateDoc(doc(StampTypesRef(), stampTypeId).withConverter(stampTypeConverter), stampTypeData);
};

export const removeStampTypeAsync = async (stampTypeId: string) => {
  if (stampTypeId == "") return;
  await deleteDoc(doc(StampTypesRef(), stampTypeId).withConverter(stampTypeConverter));
};
