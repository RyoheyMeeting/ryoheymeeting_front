import React from "react";
import { LogoCapStyle, UserPhotoAltStyle, UserPhotoAltStyleProps } from "./UserPhotoAltStyle";

type Props = UserPhotoAltStyleProps & {
  userName?: string;
};

export const UserPhotoAlt: React.FC<Props> = ({ userName, ...styleProps }) => {
  return (
    <UserPhotoAltStyle {...styleProps}>
      <LogoCapStyle src="/img/logo_cap.svg" wrapper="div" />
      <div className="user_photo_alt_initial">
        <span>{(userName && userName.length >= 1 && userName[0]) || "R"}</span>
      </div>
    </UserPhotoAltStyle>
  );
};
