import React, { ChangeEventHandler, Fragment } from "react";

type Props = {
  isEdit: boolean;
  selects: {
    label: any;
    value: string | number | readonly string[] | undefined;
  }[];
  value?: string | number | readonly string[];
  onChange?: (value: string) => void;
};

export const EditableSelect: React.FC<Props> = ({ isEdit, selects, value, onChange }) => {
  const getLabel = (value: string | number | readonly string[]) => {
    const selected = selects.filter(({ value: v }) => v == value);
    if (selected.length > 0) return selected[0].label;
    else "Bad Status";
  };
  const handler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (onChange) onChange(e.target.value);
  };
  if (isEdit)
    return (
      <select value={value} onChange={handler}>
        <option key={-1} value={""}></option>
        {selects.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  else return <Fragment>{value ? getLabel(value) : "Bad Status"}</Fragment>;
};
