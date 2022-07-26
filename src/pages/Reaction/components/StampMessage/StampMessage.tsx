import { Stamp } from "components/Stamp/Stamp";
import { UserIcon } from "components/UserIcon/UserIcon";
import React, { ComponentProps } from "react";
import {
  StampMessageSideStyle,
  StampMessageStyle,
  StampMessageStyleProps,
  StampStyle,
  UserIconStyle,
} from "./StampMessageStyle";

type Props = StampMessageStyleProps & {
  userIconProps: Pick<ComponentProps<typeof UserIcon>, "iconUrl">;
  userName?: string;
  stampProps: Pick<ComponentProps<typeof Stamp>, "stampName" | "stampUrl">;
};

export const StampMessage: React.FC<Props> = ({ userIconProps, userName, stampProps, children, ...styleProps }) => {
  return (
    <StampMessageStyle {...styleProps}>
      <StampMessageSideStyle src="/img/stampmessage_side.svg" wrapper="div" />
      <div className="stampmessage_main">
        <div className="stampmessage_value">
          <div className="stampmessage_user">
            <UserIconStyle size="S" color="white" {...userIconProps} />
            <span className="stampmessage_user_name">{userName}</span>
          </div>
          <div className="stampmessage_message">
            <span>{children}</span>
          </div>
        </div>
        <StampStyle size="L" color="black" {...stampProps} />
      </div>
    </StampMessageStyle>
  );
};
