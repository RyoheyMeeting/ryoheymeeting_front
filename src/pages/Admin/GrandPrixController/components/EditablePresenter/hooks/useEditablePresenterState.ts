import { FieldType, StatusType, useEditableResourceState } from "hooks/ResourceList/useEditableResources";
import { Presenter, updatePresenterWithSaving } from "services/GrandPrixes/GrandPrixes";
import { RootState } from "store";

export type IResponse = {
  editablePresenter: FieldType<Presenter>;
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
};

export const useEditablePresenterState = (grandPrixId: string, presenterId: string): IResponse => {
  const state = useEditableResourceState<Presenter>(
    presenterId,
    false,
    {
      index: -1,
      earnedCollvoPoint: 0,
      nextDescription: "",
    },
    (state: RootState) =>
      state.grandPrixes.presenters[grandPrixId] && state.grandPrixes.presenters[grandPrixId][presenterId],
    {
      index: () => true,
      earnedCollvoPoint: (value) => value >= 0,
      nextDescription: () => true,
    },
    undefined,
    (presenterId: string, presenterData: Partial<Presenter>) =>
      updatePresenterWithSaving(grandPrixId, presenterId, presenterData),
    undefined,
    undefined
  );

  return {
    editablePresenter: state.fields,
    isEdit: state.isEdit,
    isChange: state.isChange,
    status: state.status,
    editStartBtn: state.editStartBtn,
    saveBtn: state.saveBtn,
    closeBtn: state.closeBtn,
  };
};
