import { Boost, Mute, VolumeUp } from "components/icons";
import React from "react";
import { ActionButtonStyle, ActionButtonStyleProps, IconStyleProps } from "./ActionButtonStyle";

type Props = ActionButtonStyleProps & {
  onClick?: React.MouseEventHandler;
};

export const ActionButton: React.FC<Props> = ({ onClick, ...styleProps }) => {
  return (
    <ActionButtonStyle {...styleProps} onClick={onClick} disabled={styleProps.status == "disabled"}>
      {styleProps.actionType == "mute" ? (
        styleProps.status == "doing" ? (
          <>
            <Mute {...IconStyleProps(styleProps)} />
            <span>Unmute</span>
          </>
        ) : (
          <>
            <VolumeUp {...IconStyleProps(styleProps)} />
            <span>Mute</span>
          </>
        )
      ) : (
        styleProps.actionType == "boost" && (
          <>
            <Boost {...IconStyleProps(styleProps)} />
            <span>Boost</span>
          </>
        )
      )}
    </ActionButtonStyle>
  );
};
