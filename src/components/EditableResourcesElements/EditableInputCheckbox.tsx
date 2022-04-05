import React, { ChangeEventHandler, Fragment } from "react";

type Props = {
  isEdit: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export const EditableInputCheckbox: React.FC<Props> = ({ isEdit, value, onChange }) => {
  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(e.target.checked);
  };
  if (isEdit)
    return (
      <Fragment>
        <input type="checkbox" onChange={handler} checked={value} />
      </Fragment>
    );
  else return <Fragment>{value ? "はい" : "いいえ"}</Fragment>;
};
