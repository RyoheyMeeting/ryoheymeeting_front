import React from "react";
import { PushedStamp } from "components/PushedStamp/PushedStamp";
import { useEditableStampInfoState } from "./hooks/useEditableStampInfoState";
import { ResourceStatus } from "components/EditableResourcesElements/ResourceStatus";
import { ResourceButtons } from "components/EditableResourcesElements/ResourceButtons";
import { EditableInputText } from "components/EditableResourcesElements/EditableInputText";
import { EditableSelect } from "components/EditableResourcesElements/EditableSelect";
import { EditableInputFile } from "components/EditableResourcesElements/EditableInputFile";

type Props = {
  stampId: string;
  isNew: boolean;
  removeListener?: (id: string) => void;
  toOld?: (id: string) => void;
};

export const EditableStampInfo: React.FC<Props> = ({ stampId, isNew, removeListener, toOld }) => {
  const {
    editableStamp: stamp,
    stampTypeSelects,
    isEdit,
    isChange,
    status,
    editStartBtn,
    saveBtn,
    closeBtn,
    removeBtn,
    imageDataURL,
    soundDataURL,
    onChangeImageFile,
    onChangeSoundFile,
  } = useEditableStampInfoState(stampId, isNew, removeListener, toOld);

  return (
    <ul>
      <li>
        <ResourceStatus status={status} isEdit={isEdit} />
      </li>
      <li>
        スタンプ名：
        <EditableInputText isEdit={isEdit} value={stamp.name.value} onChange={stamp.name.changeHandler} />
      </li>
      <li>
        スタンプタイプ：
        <EditableSelect
          isEdit={isEdit}
          value={stamp.typeId.value}
          selects={stampTypeSelects}
          onChange={stamp.typeId.changeHandler}
        />
      </li>
      <li>
        画像ファイル名：
        <EditableInputFile isEdit={isEdit} value={stamp.imageURL.value} onChange={onChangeImageFile} />
      </li>
      <li>
        音声ファイル名：
        <EditableInputFile isEdit={isEdit} value={stamp.soundURL.value} onChange={onChangeSoundFile} />
      </li>
      <li>
        <PushedStamp imageURL={imageDataURL} soundURL={soundDataURL} />
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
