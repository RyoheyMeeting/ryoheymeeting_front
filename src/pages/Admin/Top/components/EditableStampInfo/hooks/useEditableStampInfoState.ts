import { useEditableStampImage } from "hooks/Admin/StampResources/useEditableStampImage";
import { useEditableStampSound } from "hooks/Admin/StampResources/useEditableStampSound";
import { FieldType, StatusType, useEditableResourceState } from "hooks/ResourceList/useEditableResources";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { addStampWithSaving, removeStampWithSaving, Stamp, updateStampWithSaving } from "services/Stamps/Stamps";
import { RootState } from "store";

export const UploadStatus = {
  standBy: 0,
  resourceUploading: 1,
  dataUploading: 2,
  error: 3,
} as const;
export type UploadStatusType = typeof UploadStatus[keyof typeof UploadStatus];

export type IResponse = {
  editableStamp: FieldType<Stamp>;
  stampTypeSelects: {
    label: string;
    value: string;
  }[];
  isEdit: boolean;
  isChange: boolean;
  status: StatusType;
  uploadStatus: UploadStatusType;
  editStartBtn: {
    clickHandler: () => void;
    disabled: boolean;
  };
  saveBtn: {
    clickHandler: () => void;
    disabled: boolean;
  };
  closeBtn: {
    clickHandler: () => void;
    disabled: boolean;
  };
  removeBtn: {
    clickHandler: () => void;
    disabled: boolean;
  };
  imageDataURL: string;
  soundDataURL: string;
  onChangeImageFile: (value: File) => void;
  onChangeSoundFile: (value: File) => void;
};

export const useEditableStampInfoState = (
  stampId: string,
  isNew: boolean,
  removeListener?: (id: string) => void,
  toOld?: (id: string) => void
): IResponse => {
  const stampTypes = useSelector((state: RootState) => state.stampTypes.stampTypes);
  const [uploadStatus, setUploadStatus] = useState<UploadStatusType>(UploadStatus.standBy);
  const {
    resources: imageResources,
    loadUrl: loadImageUrl,
    uploader: imageUploader,
    removeImage,
  } = useEditableStampImage();
  const [imageFileReader] = useState({
    asUrl: new FileReader(),
    asArray: new FileReader(),
  });
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [imageDataURL, setImageDataURL] = useState("");
  const [imageDataArray, setImageDataArray] = useState<ArrayBuffer>();
  const {
    resources: soundResources,
    loadUrl: loadSoundUrl,
    uploader: soundUploader,
    removeSound,
  } = useEditableStampSound();
  const [soundFileReader] = useState({
    asUrl: new FileReader(),
    asArray: new FileReader(),
  });
  const [soundIsUploading, setSoundIsUploading] = useState(false);
  const [soundDataURL, setSoundDataURL] = useState("");
  const [soundDataArray, setSoundDataArray] = useState<ArrayBuffer>();

  const state = useEditableResourceState<Stamp>(
    stampId,
    isNew,
    {
      name: "",
      typeId: "",
      imageURL: "",
      soundURL: "",
    },
    (state: RootState) => state.stamps.stamps[stampId],
    {
      name: (value) => value !== undefined && value != "",
      typeId: (value) => value !== undefined && value in stampTypes,
      imageURL: (value) => value !== undefined && value != "",
      soundURL: (value) => value !== undefined && value != "",
    },
    addStampWithSaving,
    updateStampWithSaving,
    removeStampWithSaving,
    removeListener,
    toOld
  );

  useEffect(() => {
    if (!isNew) loadImageUrl(stampId);
    setImageDataArray(undefined);
  }, []);

  useEffect(() => {
    const dataUrl = imageResources[stampId]?.dataUrl;

    if (dataUrl) {
      setImageDataURL(dataUrl);
    }
  }, [imageResources[stampId]]);

  useEffect(() => {
    if (!isNew) loadSoundUrl(stampId);
    setSoundDataArray(undefined);
  }, []);

  useEffect(() => {
    const dataUrl = soundResources[stampId]?.dataUrl;

    if (dataUrl) {
      setSoundDataURL(dataUrl);
    }
  }, [soundResources[stampId]]);

  useEffect(() => {
    imageFileReader.asUrl.onload = (reader) => {
      const result = reader.target?.result;
      if (result) {
        if (typeof result === "string") {
          setImageDataURL(result);
        }
      }
    };
    imageFileReader.asArray.onload = (reader) => {
      const result = reader.target?.result;
      if (result) {
        if (typeof result !== "string") {
          setImageDataArray(result);
        }
      }
    };
    soundFileReader.asUrl.onload = (reader) => {
      const result = reader.target?.result;
      if (result) {
        if (typeof result === "string") {
          setSoundDataURL(result);
        }
      }
    };
    soundFileReader.asArray.onload = (reader) => {
      const result = reader.target?.result;
      if (result) {
        if (typeof result !== "string") {
          setSoundDataArray(result);
        }
      }
    };
  }, []);

  const _saveBtnClickHandler = () => {
    setUploadStatus(UploadStatus.resourceUploading);
    // ファイルアップロード
    if (imageDataArray) {
      imageUploader.upload(stampId, imageDataArray);
      setImageIsUploading(true);
    }
    if (soundDataArray) {
      soundUploader.upload(stampId, soundDataArray);
      setSoundIsUploading(true);
    }
    // アップロードが終了したら内容を保存
    state.saveBtn.clickHandler();
  };

  const _removeBtnClickHandler = () => {
    // ファイルを削除
    removeImage(stampId);
    removeSound(stampId);
    state.removeBtn.clickHandler();
  };

  useEffect(() => {
    if (imageIsUploading) {
      switch (imageUploader.snapShot?.state) {
        case "success":
          setImageIsUploading(false);
          break;
        case "error":
          setImageIsUploading(false);
          setUploadStatus(UploadStatus.error);
          break;
      }
    }
  }, [imageIsUploading, imageUploader.snapShot?.state]);

  useEffect(() => {
    if (soundIsUploading) {
      switch (soundUploader.snapShot?.state) {
        case "success":
          setSoundIsUploading(false);
          break;
        case "error":
          setSoundIsUploading(false);
          setUploadStatus(UploadStatus.error);
          break;
      }
    }
  }, [soundIsUploading, soundUploader.snapShot?.state]);

  useEffect(() => {
    if (uploadStatus == UploadStatus.resourceUploading) {
      //全て成功したらデータアップロード
      if (!imageIsUploading && !soundIsUploading) {
        setUploadStatus(UploadStatus.dataUploading);
        state.saveBtn.clickHandler();
      }
    }
  }, [uploadStatus, imageIsUploading, soundIsUploading]);

  const _onChangeImageFile = (value: File) => {
    state.fields.imageURL.changeHandler(value.name);
    imageFileReader.asUrl.readAsDataURL(value);
    imageFileReader.asArray.readAsArrayBuffer(value);
  };

  const _onChangeSoundFile = (value: File) => {
    state.fields.soundURL.changeHandler(value.name);
    soundFileReader.asUrl.readAsDataURL(value);
    soundFileReader.asArray.readAsArrayBuffer(value);
  };

  return {
    editableStamp: state.fields,
    stampTypeSelects: useMemo(() => {
      return Object.keys(stampTypes).map((key) => {
        return {
          label: stampTypes[key].name,
          value: key,
        };
      });
    }, [stampTypes]),
    isEdit: state.isEdit,
    isChange: state.isChange,
    status: state.status,
    uploadStatus: uploadStatus,
    editStartBtn: state.editStartBtn,
    saveBtn: {
      ...state.saveBtn,
      clickHandler: _saveBtnClickHandler,
    },
    closeBtn: state.closeBtn,
    removeBtn: {
      ...state.removeBtn,
      clickHandler: _removeBtnClickHandler,
    },
    imageDataURL: imageDataURL,
    soundDataURL: soundDataURL,
    onChangeImageFile: _onChangeImageFile,
    onChangeSoundFile: _onChangeSoundFile,
  };
};
