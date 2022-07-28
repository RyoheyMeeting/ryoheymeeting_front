import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import React from "react";
import { dateToTime } from "Utils/funcs";
import { ActionButtonStyle, ActionButtonStyleProps, IconStyleProps } from "./ActionButtonStyle";

type Props = ActionButtonStyleProps & {
  Icon: React.ComponentType<IconProps>;
  remainTime: Date | undefined;
  acitonName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ActionButton: React.FC<Props> = ({ Icon, remainTime, acitonName, onClick, ...styleProps }) => {
  return (
    <ActionButtonStyle disabled={styleProps.status == "disabled"} onClick={onClick} {...styleProps}>
      <div className="actionbutton_space" />
      <div className="actionbutton_value">
        <Icon {...IconStyleProps(styleProps)} />
        <span className="actionbutton_action_name">{acitonName}</span>
      </div>
      <div className="actionbutton_time">
        {styleProps.status == "doing" && remainTime && (
          <span className="actionbutton_time_text">残り{dateToTime(remainTime)}</span>
        )}
      </div>
    </ActionButtonStyle>
  );
};
