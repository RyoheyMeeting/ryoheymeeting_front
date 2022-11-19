import React from "react";
import { useEditableModerateSoundState } from "./hooks/useEditableModerateSoundState";
import { ResourceStatus } from "components/EditableResourcesElements/ResourceStatus";
import { ResourceButtons } from "components/EditableResourcesElements/ResourceButtons";
import { EditableInputText } from "components/EditableResourcesElements/EditableInputText";
import { EditableSelect } from "components/EditableResourcesElements/EditableSelect";
import { EditableInputFile } from "components/EditableResourcesElements/EditableInputFile";

type Props = {
  moderateSoundId: string;
  isNew: boolean;
  removeListener?: (id: string) => void;
  toOld?: (id: string) => void;
};

export const EditableModerateSound: React.FC<Props> = ({ moderateSoundId, isNew, removeListener, toOld }) => {
  const {
    editableModerateSound: moderateSound,
    typeSelects,
    isEdit,
    isChange,
    status,
    editStartBtn,
    saveBtn,
    closeBtn,
    removeBtn,
    soundDataURL,
    onChangeSoundFile,
  } = useEditableModerateSoundState(moderateSoundId, isNew, removeListener, toOld);

  return (
    <ul>
      <li>
        <ResourceStatus status={status} isEdit={isEdit} />
      </li>
      <li>
        進行ボイス名：
        <EditableInputText
          isEdit={isEdit}
          value={moderateSound.name.value}
          onChange={moderateSound.name.changeHandler}
        />
      </li>
      <li>
        ボイスタイプ：
        <EditableSelect
          isEdit={isEdit}
          value={moderateSound.type.value}
          selects={typeSelects}
          onChange={moderateSound.type.changeHandler as any}
        />
      </li>
      <li>
        音声ファイル：
        <EditableInputFile isEdit={isEdit} value={moderateSound.filename.value} onChange={onChangeSoundFile} />
      </li>
      <li>
        <button
          onClick={() => {
            new Audio(soundDataURL).play();
          }}
        >
          再生
        </button>
      </li>
      <li>
        <ResourceButtons
          isEdit={isEdit}
          isChange={isChange}
          saveBtn={saveBtn}
          closeBtn={closeBtn}
          removeBtn={removeBtn}
          editStartBtn={editStartBtn}
        />
      </li>
    </ul>
  );
};
