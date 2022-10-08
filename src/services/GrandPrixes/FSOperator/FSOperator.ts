import { deleteDoc, doc, FirestoreDataConverter, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { isDate } from "services/Utils/Types";
import {
  GrandPrixAddedToFirestore,
  GrandPrixesRef,
  GrandPrix,
  GrandPrixUpdatedToFirestore,
  Presenter,
  PresenterAddedToFirestore,
  PresentersRef,
  PresenterUpdatedToFirestore,
  isGrandPrix,
  isPresenter,
} from "../GrandPrixes";

// ---- GrandPrixes ---- //

const grandPrixConverter: FirestoreDataConverter<GrandPrix> = {
  toFirestore: (grandPrix) => {
    return {
      ...grandPrix,
      eventDate: isDate(grandPrix.eventDate) ? Timestamp.fromDate(grandPrix.eventDate) : grandPrix.eventDate,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const grandPrix = {
      ...data,
      eventDate: data.eventDate.toDate(),
      // isDistributedの初期化
      isDistributed: data["isDistributed"] || false,
    };
    if (!isGrandPrix(grandPrix)) throw Error("firebaseのグランプリ情報が不正");
    return grandPrix;
  },
};

export const getGrandPrixesAsync = async () => {
  return await getDocs(GrandPrixesRef().withConverter(grandPrixConverter))
    .then((ss) => {
      const grandPrixes: { [key: string]: GrandPrix } = {};
      ss.forEach((doc) => {
        const data = doc.data();
        grandPrixes[doc.id] = {
          subtitle: data.subtitle,
          number: data.number,
          eventDate: data.eventDate,
          status: data.status,
          description: data.description,
          isDraft: data.isDraft,
          isDistributed: data.isDistributed || false,
        };
      });
      return grandPrixes;
    })
    .catch(() => {});
};

export const setGrandPrixAsync = async (grandPrixId: string, grandPrixData: GrandPrixAddedToFirestore) => {
  if (grandPrixId == "") return;
  await setDoc(doc(GrandPrixesRef(), grandPrixId).withConverter(grandPrixConverter), grandPrixData);
};

export const updateGrandPrixAsync = async (grandPrixId: string, grandPrixData: GrandPrixUpdatedToFirestore) => {
  if (grandPrixId == "") return;
  await updateDoc(doc(GrandPrixesRef(), grandPrixId).withConverter(grandPrixConverter), grandPrixData);
};

export const removeGrandPrixAsync = async (grandPrixId: string) => {
  if (grandPrixId == "") return;
  await deleteDoc(doc(GrandPrixesRef(), grandPrixId).withConverter(grandPrixConverter));
};

// ---- Presenters ---- //

const presenterConverter: FirestoreDataConverter<Presenter> = {
  toFirestore: (presenter) => {
    return {
      ...presenter,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const presenter = {
      ...data,
    };
    if (!isPresenter(presenter)) throw Error("firebaseのプレゼンター情報が不正");
    return presenter;
  },
};

export const getPresentersAsync = async (grandPrixId: string) => {
  return await getDocs(PresentersRef(grandPrixId).withConverter(presenterConverter))
    .then((ss) => {
      const presenters: { [key: string]: Presenter } = {};
      ss.forEach((doc) => {
        const data = doc.data();
        presenters[doc.id] = {
          earnedCollvoPoint: data.earnedCollvoPoint,
          index: data.index,
          nextDescription: data.nextDescription,
        };
      });
      return presenters;
    })
    .catch(() => {});
};

export const setPresenterAsync = async (
  grandPrixId: string,
  presenterId: string,
  presenterData: PresenterAddedToFirestore
) => {
  if (presenterId == "") return;
  await setDoc(doc(PresentersRef(grandPrixId), presenterId).withConverter(presenterConverter), presenterData);
};

export const updatePresenterAsync = async (
  grandPrixId: string,
  presenterId: string,
  presenterData: PresenterUpdatedToFirestore
) => {
  if (presenterId == "") return;
  await updateDoc(doc(PresentersRef(grandPrixId), presenterId).withConverter(presenterConverter), presenterData);
};

export const removePresenterAsync = async (grandPrixId: string, presenterId: string) => {
  if (presenterId == "") return;
  await deleteDoc(doc(PresentersRef(grandPrixId), presenterId).withConverter(presenterConverter));
};
