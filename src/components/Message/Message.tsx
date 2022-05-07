import React from "react";
import { Stamp } from "services/Stamps/Stamps";
import { MessageStyle, MessageStyleProps } from "./MessageStyle";

type Props = MessageStyleProps & {
  value: string;
  stamp?: React.ComponentType<Stamp>;
};

export const Message: React.FC<Props> = ({ value, stamp, ...styleProps }) => {
  return (
    <MessageStyle {...styleProps}>
      <div className="container_main">
        {stamp}
        <div className="container_message">{value}</div>
      </div>
      <div className="container_polygon">
        <svg className="polygon" viewBox="0 0 200 173">
          <path d="M100 0 L0 173 L200 173 Z" />
        </svg>
      </div>
    </MessageStyle>
  );
};
