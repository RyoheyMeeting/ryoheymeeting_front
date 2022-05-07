import React from "react";
import { UserIconStyle, UserIconStyleProps } from "./UserIconStyle";

type Props = UserIconStyleProps & {
  iconUrl?: string;
};

export const UserIcon: React.FC<Props> = ({ iconUrl, ...styleProps }) => {
  return (
    <UserIconStyle {...styleProps}>
      <img className="user_photo" src={iconUrl} alt="ユーザ画像" />
    </UserIconStyle>
  );
};
