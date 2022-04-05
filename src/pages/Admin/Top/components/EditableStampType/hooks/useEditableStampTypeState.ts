import { FieldType, StatusType, useEditableResourceState } from "hooks/ResourceList/useEditableResources";
import {
  addStampTypeWithSaving,
  removeStampTypeWithSaving,
  StampType,
  updateStampTypeWithSaving,
} from "services/StampTypes/StampTypes";
import { RootState } from "store";

export type IResponse = {
  editableStampType: FieldType<StampType>;
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
};

export const useEditableStampTypeState = (
  stampTypeId: string,
  isNew: boolean,
  removeListener?: (id: string) => void
): IResponse => {
  const state = useEditableResourceState<StampType>(
    stampTypeId,
    isNew,
    {
      name: "",
      description: "",
    },
    (state: RootState) => state.stampTypes.stampTypes[stampTypeId],
    {
      name: (value: string) => value != "",
      description: (value: string) => value != "",
    },
    addStampTypeWithSaving,
    updateStampTypeWithSaving,
    removeStampTypeWithSaving,
    removeListener
  );

  return {
    editableStampType: state.fields,
    isEdit: state.isEdit,
    isChange: state.isChange,
    status: state.status,
    editStartBtn: state.editStartBtn,
    saveBtn: state.saveBtn,
    closeBtn: state.closeBtn,
    removeBtn: state.removeBtn,
  };
};
