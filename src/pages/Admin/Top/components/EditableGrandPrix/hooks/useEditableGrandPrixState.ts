import { FieldType, StatusType, useEditableResourceState } from "hooks/ResourceList/useEditableResources";
import {
  addGrandPrixWithSaving,
  removeGrandPrixWithSaving,
  GrandPrix,
  updateGrandPrixWithSaving,
  GrandPrixStatus,
} from "services/GrandPrixes/GrandPrixes";
import { isDate } from "services/Utils/Types";
import { RootState } from "store";

export type IResponse = {
  editableGrandPrix: FieldType<GrandPrix>;
  statusList: {
    label: string;
    value: number;
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
};

export const useEditableGrandPrixState = (
  GrandPrixId: string,
  isNew: boolean,
  removeListener?: (id: string) => void
): IResponse => {
  const state = useEditableResourceState<GrandPrix>(
    GrandPrixId,
    isNew,
    {
      subtitle: "",
      number: 0,
      eventDate: new Date(Date.now()),
      status: GrandPrixStatus.yet,
      description: "",
      isDraft: true,
    },
    (state: RootState) => state.grandPrixes.grandPrixes[GrandPrixId],
    {
      subtitle: (value) => value != "",
      number: (value) => value >= 0,
      eventDate: (value) => isDate(value),
      status: (value) => value in Object.values(GrandPrixStatus),
      description: (value) => value != "",
      isDraft: () => true,
    },
    addGrandPrixWithSaving,
    updateGrandPrixWithSaving,
    removeGrandPrixWithSaving,
    removeListener
  );
  const grandPrixStatusKeys = Object.keys(GrandPrixStatus) as [keyof typeof GrandPrixStatus];
  const statusList = grandPrixStatusKeys.map((key) => {
    return {
      label: key,
      value: GrandPrixStatus[key],
    };
  });

  return {
    editableGrandPrix: state.fields,
    statusList: statusList,
    isEdit: state.isEdit,
    isChange: state.isChange,
    status: state.status,
    editStartBtn: state.editStartBtn,
    saveBtn: state.saveBtn,
    closeBtn: state.closeBtn,
    removeBtn: state.removeBtn,
  };
};
