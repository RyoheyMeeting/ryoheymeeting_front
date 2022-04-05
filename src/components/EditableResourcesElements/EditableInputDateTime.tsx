import React, { Fragment } from "react";

type Props = {
  isEdit: boolean;
  value?: Date;
  onChange?: (value: Date) => void;
};

export const EditableInputDateTime: React.FC<Props> = ({ isEdit, value, onChange }) => {
  const toString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offset;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    return iso.slice(0, 16);
  };
  const toDatetime = (data: string) => {
    if (onChange) onChange(new Date(data));
  };
  if (isEdit)
    return (
      <Fragment>
        <input
          type="datetime-local"
          value={value ? toString(value) : ""}
          onChange={(e) => toDatetime(e.target.value)}
        />
      </Fragment>
    );
  else return <Fragment>{value?.toString()}</Fragment>;
};
