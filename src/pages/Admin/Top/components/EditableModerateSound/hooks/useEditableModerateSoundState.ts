import { useEffect, useState } from "react";
import { RootState } from "store";
import { useModerateSound } from "hooks/ModerateSoundResources/useModerateSound";
import { FieldType, StatusType, useEditableResourceState } from "hooks/ResourceList/useEditableResources";
import {
  addModerateSoundWithSaving,
  removeModerateSoundWithSaving,
  ModerateSound,
  updateModerateSoundWithSaving,
  SavedModerateSound,
} from "services/ModerateSounds/ModerateSounds";

export type IResponse = {
  editableModerateSound: FieldType<ModerateSound>;
  typeSelects: {
    label: string;
    value: string;
  }[];
  isEdit: boolean;
  isChange: boolean;
  status: StatusType;
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
  soundDataURL: string;
  onChangeSoundFile: (value: File) => void;
};

export const useEditableModerateSoundState = (
  moderateSoundId: string,
  isNew: boolean,
  removeListener?: (id: string) => void,
  toOld?: (id: string) => void
): IResponse => {
  const { moderateSounds, loadUrl } = useModerateSound();
  const [soundFileReader] = useState({
    asUrl: new FileReader(),
    asArray: new FileReader(),
  });
  const [soundDataURL, setSoundDataURL] = useState("");
  const [soundDataArray, setSoundDataArray] = useState<ArrayBuffer>();

  const state = useEditableResourceState<SavedModerateSound>(
    moderateSoundId,
    isNew,
    {
      name: "",
      type: "start",
      filename: "",
      file: new Blob(),
    },
    (state: RootState) =>
      state.moderateSounds.moderateSounds[moderateSoundId] && {
        ...state.moderateSounds.moderateSounds[moderateSoundId],
        // TODO: 初期値を空データにしているため、編集ボタンを押すとデータがリセットされる
        file: soundDataArray || new Blob(),
      },
    {
      name: (value) => value !== undefined && value !== "",
      type: (value) => value !== undefined && ["start", "remain5", "finish"].includes(value),
      filename: (value) => value !== undefined && value !== "",
      file: (value) => value !== undefined,
    },
    addModerateSoundWithSaving,
    updateModerateSoundWithSaving,
    removeModerateSoundWithSaving,
    removeListener,
    toOld
  );

  useEffect(() => {
    if(!isNew) loadUrl(moderateSoundId);
    setSoundDataArray(undefined);
  }, []);

  useEffect(() => {
    const dataUrl = moderateSounds[moderateSoundId]?.resource?.dataUrl;

    if (dataUrl) {
      setSoundDataURL(dataUrl);
    }
  }, [moderateSounds[moderateSoundId]?.resource]);

  useEffect(() => {
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
          state.fields.file.changeHandler(result);
        }
      }
    };
  }, []);

  const _onChangeSoundFile = (value: File) => {
    state.fields.filename.changeHandler(value.name);
    soundFileReader.asUrl.readAsDataURL(value);
    soundFileReader.asArray.readAsArrayBuffer(value);
  };

  return {
    editableModerateSound: state.fields,
    typeSelects: [
      {
        value: "start",
        label: "開始時",
      },
      {
        value: "remain5",
        label: "残り５分",
      },
      {
        value: "finish",
        label: "終了時",
      },
    ],
    isEdit: state.isEdit,
    isChange: state.isChange,
    status: state.status,
    editStartBtn: state.editStartBtn,
    saveBtn: state.saveBtn,
    closeBtn: state.closeBtn,
    removeBtn: state.removeBtn,
    soundDataURL: soundDataURL,
    onChangeSoundFile: _onChangeSoundFile,
  };
};
