import React, { ChangeEventHandler, Fragment } from "react";

type Props = {
  isEdit: boolean;
  value?: string;
  onChange?: (value: File) => void;
};

export const EditableInputFile: React.FC<Props> = ({ isEdit, value, onChange }) => {
  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0] && onChange) {
      onChange(e.target.files[0]);
    }
  };
  if (isEdit)
    return (
      <Fragment>
        <input type="file" onChange={handler} />
      </Fragment>
    );
  else return <Fragment>{value}</Fragment>;
};
