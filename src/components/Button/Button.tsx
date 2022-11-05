import React, { MouseEventHandler } from "react";
import { Icon } from "Types/Utils";
import { ButtonStyle, ButtonStyleProps, IconStyleProps } from "./ButtonStyle";

type Props = ButtonStyleProps & {
  value: string;
  iconPlace?: "left" | "right";
  Icon?: Icon;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<Props> = ({ value, iconPlace, Icon, disabled = false, onClick, ...styleProps }) => {
  const iconProps = { ...styleProps, disabled };
  return (
    <ButtonStyle disabled={disabled} onClick={onClick} {...styleProps} iconPlace={iconPlace}>
      <div className="button_outer">
        <div className="button_wrap">
          {Icon && iconPlace === "left" && <Icon {...IconStyleProps(iconProps)} />}
          <span>{value}</span>
          {Icon && iconPlace === "right" && <Icon {...IconStyleProps(iconProps)} />}
        </div>
      </div>
    </ButtonStyle>
  );
};
