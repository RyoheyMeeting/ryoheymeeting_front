import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import React, { ComponentType } from "react";
import {
  IconStyleProps,
  StampPalleteGroupTitleStyle,
  StampPalleteGroupTitleStyleProps,
} from "./StampPalleteGroupTitleStyle";

type Props = StampPalleteGroupTitleStyleProps & {
  Icon: ComponentType<IconProps>;
  title: string;
};

export const StampPalleteGroupTitle: React.FC<Props> = ({ Icon, title, ...styleProps }) => {
  return (
    <StampPalleteGroupTitleStyle {...styleProps}>
      <Icon {...IconStyleProps(styleProps)} />
      <span className="stamppalletegrouptitle_title">{title}</span>
    </StampPalleteGroupTitleStyle>
  );
};
