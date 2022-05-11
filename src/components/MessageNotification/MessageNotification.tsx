import React from "react";
import { Stamp } from "components/Stamp/Stamp";
import {
  MessageNotificationStyle,
  MessageNotificationStyleProps,
  NotificationBG,
  StampStyleProps,
  UserIconStyleProps,
} from "./MessageNotificationStyle";
import { UserIcon } from "components/UserIcon/UserIcon";

type Props = MessageNotificationStyleProps & {
  message: string;
  stampProps?: React.ComponentProps<typeof Stamp>;
  userIconProps?: React.ComponentProps<typeof UserIcon>;
  userName?: string;
};

export const MessageNotification: React.FC<Props> = ({
  message,
  stampProps,
  userIconProps,
  userName,
  ...styleProps
}) => {
  return (
    <MessageNotificationStyle {...styleProps}>
      <div className="container_main">
        <div className="container_usermessage">
          <div className="container_user">
            <UserIcon {...userIconProps} {...UserIconStyleProps(styleProps)} />
            {userName}
          </div>
          <div className="container_message">{message}</div>
        </div>
        <Stamp {...stampProps} {...StampStyleProps(styleProps)} />
      </div>
      <NotificationBG src="/img/notification_bg.svg" wrapper="svg" />
    </MessageNotificationStyle>
  );
};
