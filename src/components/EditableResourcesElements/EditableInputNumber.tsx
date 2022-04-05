import React, { ChangeEventHandler, Fragment } from "react";

type Props = {
  isEdit: boolean;
  value?: number;
  onChange?: (value: number) => void;
};

export const EditableInputNumber: React.FC<Props> = ({ isEdit, value, onChange }) => {
  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(Number(e.target.value));
  };
  if (isEdit)
    return (
      <Fragment>
        <input type="number" value={value} onChange={handler} />
      </Fragment>
    );
  else return <Fragment>{value}</Fragment>;
};
