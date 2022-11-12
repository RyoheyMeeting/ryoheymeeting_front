import React, { MouseEventHandler } from "react";
import { Icon } from "Types/Utils";
import { LongButtonStyle, LongButtonStyleProps, IconStyleProps } from "./LongButtonStyle";

type Props = LongButtonStyleProps & {
  value: string;
  Icon?: Icon;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const LongButton: React.FC<Props> = ({ value, Icon, disabled = false, onClick, ...styleProps }) => {
  const iconProps = { ...styleProps, disabled };
  return (
    <LongButtonStyle disabled={disabled} onClick={onClick} {...styleProps}>
      {Icon && <Icon {...IconStyleProps(iconProps)} />}
      <span>{value}</span>
    </LongButtonStyle>
  );
};
