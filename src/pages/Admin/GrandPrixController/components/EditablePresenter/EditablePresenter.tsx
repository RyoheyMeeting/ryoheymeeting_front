import React from "react";
import { EditableInputText } from "components/EditableResourcesElements/EditableInputText";
import { ResourceButtons } from "components/EditableResourcesElements/ResourceButtons";
import { ResourceStatus } from "components/EditableResourcesElements/ResourceStatus";
import { useEditablePresenterState } from "./hooks/useEditablePresenterState";
import { EditableInputNumber } from "components/EditableResourcesElements/EditableInputNumber";

type Props = {
  grandPrixId: string;
  presenterId: string;
};

export const EditablePresenter: React.FC<Props> = ({ grandPrixId, presenterId }) => {
  const {
    editablePresenter: presenter,
    isEdit,
    isChange,
    status,
    editStartBtn,
    saveBtn,
    closeBtn,
  } = useEditablePresenterState(grandPrixId, presenterId);

  return (
    <ul>
      <li>
        <ResourceStatus status={status} isEdit={isEdit} />
      </li>
      <li>
        順番：
        <EditableInputNumber isEdit={isEdit} value={presenter.index.value} onChange={presenter.index.changeHandler} />
      </li>
      <li>
        NextPresenter：
        <EditableInputText
          isEdit={isEdit}
          value={presenter.nextDescription.value}
          onChange={presenter.nextDescription.changeHandler}
        />
      </li>
      <li>
        <ResourceButtons
          isEdit={isEdit}
          isChange={isChange}
          saveBtn={saveBtn}
          closeBtn={closeBtn}
          editStartBtn={editStartBtn}
        />
      </li>
    </ul>
  );
};
