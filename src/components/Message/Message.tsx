import React from "react";
import { Stamp } from "components/Stamp/Stamp";
import { MessageStyle, MessageStyleProps } from "./MessageStyle";

type Props = MessageStyleProps & {
  value: string;
  stampProps?: React.ComponentProps<typeof Stamp>;
};

export const Message: React.FC<Props> = ({ value, stampProps, ...styleProps }) => {
  return (
    <MessageStyle {...styleProps}>
      <div className="message_container_polygon">
        <svg className="message_polygon" viewBox="0 0 200 200">
          <path d="M100 27 L0 200 L200 200 Z" />
        </svg>
      </div>
      <div className="message_container_main">
        <div className="message_container_message">{value}</div>
        <Stamp {...stampProps} size="M" active={true} />
      </div>
    </MessageStyle>
  );
};
