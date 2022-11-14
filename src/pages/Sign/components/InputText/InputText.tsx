import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Icon } from "Types/Utils";
import { InputTextStyle } from "./InputTextStyle";

type Props = {
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  Icon: Icon;
  type?: HTMLInputTypeAttribute;
};

export const InputText: React.FC<Props> = ({ value, placeholder, onChange, Icon, type="text" }) => {
  return (
    <InputTextStyle isWritten={value !== undefined && value !== ""}>
      <span className="inputtext_placeholder">{placeholder}</span>
      <input type={type} value={value} className="inputtext_input" onChange={onChange} />
      <Icon size="24px" className="inputtext_icon" />
    </InputTextStyle>
  );
};
