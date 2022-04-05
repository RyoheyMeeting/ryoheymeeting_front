import React, { ChangeEventHandler, Fragment } from "react";

type Props = {
  isEdit: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export const EditableInputText: React.FC<Props> = ({ isEdit, value, onChange }) => {
  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(e.target.value);
  };
  if (isEdit)
    return (
      <Fragment>
        <input type="text" value={value} onChange={handler} />
      </Fragment>
    );
  else return <Fragment>{value}</Fragment>;
};
