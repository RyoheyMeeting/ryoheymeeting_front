import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { and } from "Utils/funcs";

export type FieldType<T> = {
  [P in keyof T]: {
    value: T[P];
    changeHandler: (value: T[P]) => void;
  };
};

export type IResponse<T extends object> = {
  fields: FieldType<T>;
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

export const Status = {
  invalid: 0,
  valid: 1,
  uploading: 2,
} as const;
export type StatusType = typeof Status[keyof typeof Status];

export const useEditableResourceState = <T extends object>(
  id: string,
  isNew: boolean,
  initialState: T,
  selector: (state: RootState) => T,
  validations: {
    [P in keyof T]: (value: T[P]) => boolean;
  },
  addResourceWithSaving?: (id: string, data: T) => void,
  updateResourceWithSaving?: (id: string, data: T) => void,
  removeResourceWithSaving?: (id: string) => void,
  removeListener?: (id: string) => void
): IResponse<T> => {
  const resource = useSelector(selector);
  const [editableResource, setEditableResource] = useState<T>(resource ? resource : { ...initialState });
  const [isEdit, setIsEdit] = useState(isNew);
  const [isChange, setIsChange] = useState(isNew);
  const [status, setStatus] = useState<StatusType>(Status.valid);
  const [editStartBtnDisabled, setEditStartBtnDisabled] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [closeBtnDisabled, setCloseBtnDisabled] = useState(false);
  const [removeBtnDisabled, setRemoveBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const resourceKeys = Object.keys(validations) as [keyof T];

  const fields: {
    [key in keyof T]?: {
      value: any;
      changeHandler: (value: any) => void;
    };
  } = {};
  resourceKeys.forEach((key) => {
    fields[key] = {
      value: editableResource[key],
      changeHandler: (value: T[typeof key]) => {
        setEditableResource({
          ...editableResource,
          [key]: value,
        });
        setIsChange(true);
      },
    };
  });

  useEffect(() => {
    setStatus(and(resourceKeys.map((key) => validations[key](editableResource[key]))) ? Status.valid : Status.invalid);
  }, [editableResource]);

  useEffect(() => {
    if (isChange && status == Status.valid) {
      setSaveBtnDisabled(false);
    } else {
      setSaveBtnDisabled(true);
    }
    if (status == Status.uploading) {
      setEditStartBtnDisabled(true);
      setCloseBtnDisabled(true);
      setRemoveBtnDisabled(true);
    } else {
      setEditStartBtnDisabled(false);
      setCloseBtnDisabled(false);
      setRemoveBtnDisabled(false);
    }
  }, [status, isChange]);

  const _editStartBtnClickHandler = () => {
    setIsEdit(true);
  };

  const _saveBtnClickHandler = () => {
    setSaveBtnDisabled(true);
    setStatus(Status.uploading);
    _apply().finally(() => {
      setSaveBtnDisabled(false);
      setIsEdit(false);
      setIsChange(false);
      setStatus(Status.valid);
    });
  };

  const _closeBtnClickHandler = async () => {
    setIsChange(false);
    setIsEdit(false);
    setEditableResource(resource ? resource : { ...initialState });
  };

  const _removeBtnClickHandler = async () => {
    if (!isNew && removeResourceWithSaving) {
      await dispatch(removeResourceWithSaving(id));
    }
    if (removeListener) removeListener(id);
  };

  const _apply = async () => {
    if (isNew) {
      if (addResourceWithSaving) {
        await dispatch(addResourceWithSaving(id, editableResource));
      }
      if (removeListener) removeListener(id);
    } else {
      if (updateResourceWithSaving) {
        await dispatch(updateResourceWithSaving(id, editableResource));
      }
    }
  };

  return {
    fields: fields as FieldType<T>,
    isEdit: isEdit,
    isChange: isChange,
    status: status,
    editStartBtn: {
      disabled: editStartBtnDisabled,
      clickHandler: _editStartBtnClickHandler,
    },
    saveBtn: {
      disabled: saveBtnDisabled,
      clickHandler: _saveBtnClickHandler,
    },
    closeBtn: {
      disabled: closeBtnDisabled,
      clickHandler: _closeBtnClickHandler,
    },
    removeBtn: {
      disabled: removeBtnDisabled,
      clickHandler: _removeBtnClickHandler,
    },
  };
};
