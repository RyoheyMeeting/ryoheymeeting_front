import { ref, StorageError, UploadMetadata, UploadTaskSnapshot } from "firebase/storage";
import { useStampImage } from "hooks/StampResources/useStampImage";
import { useUploadToStorage } from "hooks/Storage/useUploadToStorage";
import { removeStampImageFromStorageAsync } from "services/StampResources/SOperator/SOperator";
import { ImagesRef } from "services/StampResources/StampResources";

export type IResponse = {
  urls: { [key: string]: string };
  loadUrl: (stampId: string) => void;
  uploader: {
    snapShot: UploadTaskSnapshot | undefined;
    error: StorageError | undefined;
    upload: (stampId: string, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) => void;
    pause: () => void;
    resume: () => void;
    cancel: () => void;
  };
  removeImage: (stampId: string) => void;
};

export const useEditableStampImage = (): IResponse => {
  const { urls, loadUrl } = useStampImage();
  const imageUploader = useUploadToStorage();

  const _upload = (stampId: string, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) => {
    if (stampId == "") return;
    imageUploader.upload(ref(ImagesRef(), stampId), data, metadata);
  };

  const _removeImage = (stampId: string) => {
    if (stampId == "") return;
    removeStampImageFromStorageAsync(stampId);
  };

  return {
    urls: urls,
    loadUrl: loadUrl,
    uploader: {
      ...imageUploader,
      upload: _upload,
    },
    removeImage: _removeImage,
  };
};
