import { AngleUp } from "components/icons";
import React, { useCallback } from "react";
import { ButtonOpts } from "Types/Utils";
import { UserMessage } from "./components/UserMessage/UserMessage";
import { useMessageWindowState } from "./hooks/useMessageWindowState";
import { IconStyleProps, MessageWindowStyle, MessageWindowStyleProps } from "./MessageWindowStyle";

type Props = MessageWindowStyleProps & {
  changeMessage: {
    value: string;
    handler: (value: string) => void;
  };
  sendMessageBtn: ButtonOpts;
  maxLetter: number;
};

export const MessageWindow: React.FC<Props> = ({ changeMessage, sendMessageBtn, maxLetter, ...styleProps }) => {
  const { currentNum, messageReactions } = useMessageWindowState(changeMessage.value);

  return (
    <MessageWindowStyle {...styleProps}>
      <div className="messagewindow_container_main">
        {messageReactions.sortedKey.map((key) => (
          <UserMessage key={key} messageId={key} />
        ))}
      </div>
      <div className="messagewindow_container_send">
        <div className="messagewindow_container_input">
          <input
            type="text"
            placeholder="発表者にメッセージを送信できます"
            value={changeMessage.value}
            onChange={useCallback((e) => changeMessage.handler(e.target.value), [changeMessage.handler])}
          />
          <button onClick={sendMessageBtn.handler} disabled={sendMessageBtn.disabled}>
            <AngleUp {...IconStyleProps(styleProps)} />
          </button>
        </div>
        <span className="messagewindow_counter">
          {currentNum}/{maxLetter}文字
        </span>
      </div>
    </MessageWindowStyle>
  );
};
