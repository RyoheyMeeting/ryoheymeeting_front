import {
  StorageError,
  StorageReference,
  uploadBytesResumable,
  UploadMetadata,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useState } from "react";

export type IResponse = {
  snapShot: UploadTaskSnapshot | undefined;
  error: StorageError | undefined;
  upload: (ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
};

export const useUploadToStorage = (): IResponse => {
  const [uploadTask, setUploadTask] = useState<UploadTask | undefined>();
  const [snapShot, setSnapShot] = useState<UploadTaskSnapshot>();
  const [error, setError] = useState<StorageError>();

  const _upload = (ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) => {
    if (uploadTask) return;
    const _uploadTask = uploadBytesResumable(ref, data, metadata);
    _uploadTask.on(
      "state_changed",
      (ss) => {
        setError(undefined);
        switch (ss.state) {
          case "success":
            setSnapShot(undefined);
            break;
          default:
            setSnapShot(ss);
        }
      },
      (err) => {
        setError(err);
      }
    );
    setUploadTask(_uploadTask);
  };

  const _pause = () => uploadTask?.pause();
  const _resume = () => uploadTask?.resume();
  const _cancel = () => uploadTask?.cancel();

  return {
    snapShot: snapShot,
    error: error,
    upload: _upload,
    pause: _pause,
    resume: _resume,
    cancel: _cancel,
  };
};
