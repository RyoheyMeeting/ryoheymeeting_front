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
  removeListener?: (id: string) => void,
  toOld?: (id: string) => void
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
      isDistributed: false,
    },
    (state: RootState) => state.grandPrixes.grandPrixes[GrandPrixId],
    {
      subtitle: (value) => value !== undefined && value != "",
      number: (value) => value !== undefined && value >= 0,
      eventDate: (value) => value !== undefined && isDate(value),
      status: (value) => value !== undefined && value in Object.values(GrandPrixStatus),
      description: (value) => value !== undefined && value != "",
      isDraft: () => true,
      // 但し、UI上には表示しない
      isDistributed: () => true,
    },
    addGrandPrixWithSaving,
    updateGrandPrixWithSaving,
    removeGrandPrixWithSaving,
    removeListener,
    toOld
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
