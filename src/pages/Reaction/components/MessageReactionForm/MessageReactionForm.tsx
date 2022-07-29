import AddStamp from "components/icons/AddStamp";
import AngleUp from "components/icons/AngleUp";
import { Stamp } from "components/Stamp/Stamp";
import React, { ComponentProps } from "react";
import {
  AddStampStyleProps,
  AngleUpStyleProps,
  MessageReactionFormStyle,
  MessageReactionFormStyleProps,
  StampMessageSideStyle,
  SubmitStyle,
} from "./MessageReactionFormStyle";

type Props = MessageReactionFormStyleProps & {
  messageValue?: string;
  stampProps?: ComponentProps<typeof Stamp>;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
};

export const MessageReactionForm: React.FC<Props> = ({ messageValue, stampProps, onSubmit, ...styleProps }) => {
  return (
    <MessageReactionFormStyle {...styleProps}>
      <StampMessageSideStyle src="/img/stampmessage_side.svg" wrapper="div" />
      <div className="messagereactionform_main">
        <div className="messagereactionform_textarea">
          <textarea
            className="messagereactionform_textarea_value"
            value={messageValue}
            placeholder="発表者にメッセージを送信できます"
          />
          <span className="messagereactionform_letternum">{messageValue ? messageValue.length : 0}/30文字</span>
        </div>
        <div className="messagereactionform_stamp">
          {stampProps ? (
            <Stamp {...stampProps} size="L" active={true} color="orange" />
          ) : (
            <AddStamp {...AddStampStyleProps(styleProps)} />
          )}
        </div>
        <button className="messagereactionform_submit" disabled={styleProps.disabled} onClick={onSubmit}>
          <AngleUp {...AngleUpStyleProps(styleProps)} />
          <SubmitStyle src="/img/submit.svg" wrapper="svg" {...styleProps} />
        </button>
      </div>
    </MessageReactionFormStyle>
  );
};
