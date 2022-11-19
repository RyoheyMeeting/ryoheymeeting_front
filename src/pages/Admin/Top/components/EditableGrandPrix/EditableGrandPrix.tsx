import React from "react";
import { EditableInputCheckbox } from "components/EditableResourcesElements/EditableInputCheckbox";
import { EditableInputDateTime } from "components/EditableResourcesElements/EditableInputDateTime";
import { EditableInputNumber } from "components/EditableResourcesElements/EditableInputNumber";
import { EditableInputText } from "components/EditableResourcesElements/EditableInputText";
import { EditableSelect } from "components/EditableResourcesElements/EditableSelect";
import { EditableTextarea } from "components/EditableResourcesElements/EditableTextarea";
import { ResourceButtons } from "components/EditableResourcesElements/ResourceButtons";
import { ResourceStatus } from "components/EditableResourcesElements/ResourceStatus";
import { useEditableGrandPrixState } from "./hooks/useEditableGrandPrixState";

type Props = {
  grandPrixId: string;
  isNew: boolean;
  removeListener?: (id: string) => void;
  toOld?: (id: string) => void;
};

export const EditableGrandPrix: React.FC<Props> = ({ grandPrixId, isNew, removeListener, toOld }) => {
  const {
    editableGrandPrix: grandPrix,
    statusList,
    isEdit,
    isChange,
    status,
    editStartBtn,
    saveBtn,
    closeBtn,
    removeBtn,
  } = useEditableGrandPrixState(grandPrixId, isNew, removeListener, toOld);

  return (
    <ul>
      <li>
        <ResourceStatus status={status} isEdit={isEdit} />
      </li>
      <li>
        副題：
        <EditableInputText
          isEdit={isEdit}
          value={grandPrix.subtitle.value}
          onChange={grandPrix.subtitle.changeHandler}
        />
      </li>
      <li>
        ナンバリング：
        <EditableInputNumber isEdit={isEdit} value={grandPrix.number.value} onChange={grandPrix.number.changeHandler} />
      </li>
      <li>
        開催日：
        <EditableInputDateTime
          isEdit={isEdit}
          value={grandPrix.eventDate.value}
          onChange={grandPrix.eventDate.changeHandler}
        />
      </li>
      <li>
        ステータス：
        <EditableSelect
          isEdit={isEdit}
          selects={statusList}
          value={String(grandPrix.status.value)}
          onChange={(value) => grandPrix.status.changeHandler(Number(value) as any)}
        />
      </li>
      <li>
        説明：
        <EditableTextarea
          isEdit={isEdit}
          value={grandPrix.description.value}
          onChange={grandPrix.description.changeHandler}
        />
      </li>
      <li>
        下書き：
        <EditableInputCheckbox
          isEdit={isEdit}
          value={grandPrix.isDraft.value}
          onChange={grandPrix.isDraft.changeHandler}
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
