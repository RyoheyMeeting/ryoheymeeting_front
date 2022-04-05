import React from "react";
import { EditableInputText } from "components/EditableResourcesElements/EditableInputText";
import { EditableTextarea } from "components/EditableResourcesElements/EditableTextarea";
import { ResourceButtons } from "components/EditableResourcesElements/ResourceButtons";
import { ResourceStatus } from "components/EditableResourcesElements/ResourceStatus";
import { useEditableStampTypeState } from "./hooks/useEditableStampTypeState";

type Props = {
  stampTypeId: string;
  isNew: boolean;
  removeListener?: (id: string) => void;
};

export const EditableStampTypeInfo: React.FC<Props> = ({ stampTypeId, isNew, removeListener }) => {
  const {
    editableStampType: stampType,
    isEdit,
    isChange,
    status,
    editStartBtn,
    saveBtn,
    closeBtn,
    removeBtn,
  } = useEditableStampTypeState(stampTypeId, isNew, removeListener);

  return (
    <ul>
      <li>
        <ResourceStatus status={status} isEdit={isEdit} />
      </li>
      <li>
        スタンプタイプ名：
        <EditableInputText isEdit={isEdit} value={stampType.name.value} onChange={stampType.name.changeHandler} />
      </li>
      <li>
        説明：
        <EditableTextarea
          isEdit={isEdit}
          value={stampType.description.value}
          onChange={stampType.description.changeHandler}
        />
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
