import { UserIcon } from "components/UserIcon/UserIcon";
import React from "react";
import { useUserMessageState } from "./hooks/useUserMessageState";
import { MessageStyle, UserMessageStyle, UserMessageStyleProps } from "./UserMessageStyle";

type Props = UserMessageStyleProps & {
  messageId: string;
};

export const UserMessage: React.FC<Props> = ({ messageId, ...styleProps }) => {
  const { message, sender, stampName, stampUrl } = useUserMessageState(messageId);
  return (
    <UserMessageStyle {...styleProps}>
      <UserIcon iconUrl={sender?.photoURL} size="M" />
      <MessageStyle
        value={message}
        stampProps={{
          stampName: stampName,
          stampUrl: stampUrl,
        }}
      />
    </UserMessageStyle>
  );
};
