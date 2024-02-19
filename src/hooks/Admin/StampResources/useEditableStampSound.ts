import { ref, StorageError, UploadMetadata, UploadTaskSnapshot } from "firebase/storage";
import { useStampSound } from "hooks/StampResources/useStampSound";
import { useUploadToStorage } from "hooks/Storage/useUploadToStorage";
import { removeStampSoundFromStorageAsync } from "services/StampResources/SOperator/SOperator";
import { SoundsRef, StampResource } from "services/StampResources/StampResources";

export type IResponse = {
  resources: { [key: string]: StampResource };
  loadUrl: (stampId: string) => void;
  uploader: {
    snapShot: UploadTaskSnapshot | undefined;
    error: StorageError | undefined;
    upload: (stampId: string, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) => void;
    pause: () => void;
    resume: () => void;
    cancel: () => void;
  };
  removeSound: (stampId: string) => void;
};

export const useEditableStampSound = (): IResponse => {
  const { resources, loadUrl } = useStampSound();
  const soundUploader = useUploadToStorage();

  const _upload = (stampId: string, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) => {
    if (stampId == "") return;
    soundUploader.upload(ref(SoundsRef(), stampId), data, metadata);
  };

  const _removeSound = (stampId: string) => {
    if (stampId == "") return;
    removeStampSoundFromStorageAsync(stampId);
  };

  return {
    resources,
    loadUrl,
    uploader: {
      ...soundUploader,
      upload: _upload,
    },
    removeSound: _removeSound,
  };
};
