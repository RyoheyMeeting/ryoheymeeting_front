import React, { ComponentType } from "react";
import { IconStyleProps, IconTextStyle, IconTextStyleProps } from "./IconTextStyle";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";

type Props = IconTextStyleProps & {
  Icon: ComponentType<IconProps>;
  text: string;
};

export const IconText: React.FC<Props> = ({ Icon, text, ...styleProps }) => {
  return (
    <IconTextStyle {...styleProps}>
      <Icon {...IconStyleProps({ ...styleProps })} />
      <span className="icontext_label">{text}</span>
    </IconTextStyle>
  );
};
