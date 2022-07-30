import { Pen } from "components/icons";
import AngleUp from "components/icons/AngleUp";
import { Stamp } from "components/Stamp/Stamp";
import React, { ComponentProps } from "react";
import { useTheme } from "styled-components";
import {
  SendableStampButtonSideStyle,
  SendableStampStyle,
  SendableStampStyleProps,
  SubmitStyle,
} from "./SendableStampStyle";

type Props = SendableStampStyleProps & {
  stampProps: ComponentProps<typeof Stamp>;
  onReactionButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMessageButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SendableStamp: React.FC<Props> = ({
  stampProps,
  onReactionButtonClick,
  onMessageButtonClick,
  ...styleProps
}) => {
  return (
    <SendableStampStyle {...styleProps}>
      <Stamp {...stampProps} color="orange" size="L" active={true} />
      {/* <div className="sendablestamp_overlay" />
      <span className="sendablestamp_overlay_text">選択中</span> */}
      <button className="sendablestamp_button_submit" onClick={onReactionButtonClick}>
        <div className="sendablestamp_button_submit_value">
          <AngleUp size="24px" fill={useTheme().global.negative} />
          <SubmitStyle src="/img/submit.svg" wrapper="svg" />
        </div>
        <SendableStampButtonSideStyle src="/img/sendablestamp_button_right.svg" wrapper="div" />
      </button>
      <button className="sendablestamp_button_message" onClick={onMessageButtonClick}>
        <SendableStampButtonSideStyle src="/img/sendablestamp_button_left.svg" wrapper="div" />
        <div className="sendablestamp_button_message_value">
          <Pen size="24px" fill={useTheme().global.negative} />
        </div>
      </button>
    </SendableStampStyle>
  );
};
