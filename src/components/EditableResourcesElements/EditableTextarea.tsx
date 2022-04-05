import React, { ChangeEventHandler, Fragment } from "react";

type Props = {
  isEdit: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export const EditableTextarea: React.FC<Props> = ({ isEdit, value, onChange }) => {
  const handler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (onChange) onChange(e.target.value);
  };
  if (isEdit)
    return (
      <Fragment>
        <textarea value={value} onChange={handler} />
      </Fragment>
    );
  else return <pre>{value}</pre>;
};
