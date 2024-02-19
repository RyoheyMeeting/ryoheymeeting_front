import { deleteObject, getBlob, getDownloadURL, ref } from "firebase/storage";
import { ImagesRef, SoundsRef } from "../StampResources";

export const getStampImageURLFromStorageAsync = async (stampId: string) => {
  if (stampId == "") return;
  return getDownloadURL(ref(ImagesRef(), stampId));
};

export const getStampImageBlobFromStorageAsync = async (stampId: string) => {
  if (stampId == "") return;
  return getBlob(ref(ImagesRef(), stampId));
};

export const removeStampImageFromStorageAsync = async (stampId: string) => {
  if (stampId == "") return;
  return deleteObject(ref(ImagesRef(), stampId));
};

export const getStampSoundURLFromStorageAsync = async (stampId: string) => {
  if (stampId == "") return;
  return getDownloadURL(ref(SoundsRef(), stampId));
};

export const getStampSoundBlobFromStorageAsync = async (stampId: string) => {
  if (stampId == "") return;
  return getBlob(ref(SoundsRef(), stampId));
};

export const removeStampSoundFromStorageAsync = async (stampId: string) => {
  if (stampId == "") return;
  return deleteObject(ref(SoundsRef(), stampId));
};
