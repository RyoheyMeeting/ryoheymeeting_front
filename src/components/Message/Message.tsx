import React from "react";
import { Stamp } from "components/Stamp/Stamp";
import { MessageStyle, MessageStyleProps } from "./MessageStyle";

type Props = MessageStyleProps & {
  value: string;
  Stamp?: React.ComponentType<React.ComponentProps<typeof Stamp>>;
  stampProps?: React.ComponentProps<typeof Stamp>;
};

export const Message: React.FC<Props> = ({ value, Stamp, stampProps, ...styleProps }) => {
  return (
    <MessageStyle {...styleProps}>
      <div className="container_polygon">
        <svg className="polygon" viewBox="0 0 200 200">
          <path d="M100 27 L0 200 L200 200 Z" />
        </svg>
      </div>
      <div className="container_main">
        <div className="container_message">{value}</div>
        {Stamp && <Stamp {...stampProps} size="M" active={true} />}
      </div>
    </MessageStyle>
  );
};
