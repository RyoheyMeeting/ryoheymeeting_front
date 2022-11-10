import { deleteDoc, doc, FirestoreDataConverter, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Dict } from "Types/Utils";
import {
  isModerateSound,
  ModerateSound,
  ModerateSoundAddedToFirestore,
  ModerateSoundFilesRef,
  ModerateSoundsRef,
  ModerateSoundUpdatedToFirestore,
  UploadModerateSoundFile,
} from "../ModerateSounds";

// ---- Firestore ---- //

const moderateSoundConverter: FirestoreDataConverter<ModerateSound> = {
  toFirestore: (moderateSound) => {
    return {
      ...moderateSound,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const moderateSound = {
      ...data,
    };
    if (!isModerateSound(moderateSound)) throw Error("firebaseの進行サウンド情報が不正");
    return moderateSound;
  },
};

export const getModerateSoundsAsync = async () => {
  return await getDocs(ModerateSoundsRef().withConverter(moderateSoundConverter))
    .then((ss) => {
      const moderateSounds: Dict<ModerateSound> = {};
      ss.forEach((doc) => {
        const data = doc.data();
        moderateSounds[doc.id] = {
          name: data.name,
          type: data.type,
          filename: data.filename,
        };
      });
      return moderateSounds;
    })
    .catch(() => {});
};

export const getModerateSoundAsync = async (moderateSoundId: string) => {
  if (moderateSoundId === "") return;

  const ss = await getDoc(doc(ModerateSoundsRef(), moderateSoundId).withConverter(moderateSoundConverter));

  if (!ss.exists()) return;

  return ss.data();
};

export const setModerateSoundAsync = async (
  moderateSoundId: string,
  moderateSoundData: ModerateSoundAddedToFirestore
) => {
  if (moderateSoundId === "") return;
  await setDoc(doc(ModerateSoundsRef(), moderateSoundId).withConverter(moderateSoundConverter), moderateSoundData);
};

export const updateModerateSoundAsync = async (
  moderateSoundId: string,
  moderateSoundData: ModerateSoundUpdatedToFirestore
) => {
  if (moderateSoundId === "") return;
  await updateDoc(doc(ModerateSoundsRef(), moderateSoundId).withConverter(moderateSoundConverter), moderateSoundData);
};

export const removeModerateSoundAsync = async (moderateSoundId: string) => {
  if (moderateSoundId === "") return;
  await deleteDoc(doc(ModerateSoundsRef(), moderateSoundId).withConverter(moderateSoundConverter));
};

// ---- Storage ---- //

export const getModerateSoundURLFromStorageAsync = async (moderateSoundId: string) => {
  if (moderateSoundId === "") return;
  return getDownloadURL(ref(ModerateSoundFilesRef(), moderateSoundId));
};

export const uploadModerateSoundURLFromStorageAsync = async (
  moderateSoundId: string,
  data: UploadModerateSoundFile
) => {
  if (moderateSoundId === "") return;
  return uploadBytes(ModerateSoundFilesRef(), data);
};

export const removeModerateSoundFromStorageAsync = async (moderateSoundId: string) => {
  if (moderateSoundId === "") return;
  return deleteObject(ref(ModerateSoundFilesRef(), moderateSoundId));
};
