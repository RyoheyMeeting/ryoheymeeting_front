import React from "react";
import { useImage } from "react-image";
import { UserIconStyle, UserIconStyleProps, UserPhotoAltStyle } from "./UserIconStyle";

type Props = UserIconStyleProps & {
  iconUrl?: string;
  userName?: string;
};

export const UserIcon: React.FC<Props> = ({ iconUrl, userName, ...styleProps }) => {
  const { src, isLoading, error } = useImage({ srcList: iconUrl || "", useSuspense: false });

  return (
    <UserIconStyle {...styleProps}>
      {!error ? (
        isLoading ? (
          <div className="user_photo_loading" />
        ) : (
          <img className="user_photo" src={src} alt="ユーザ画像" />
        )
      ) : (
        <UserPhotoAltStyle userName={userName} size="100%" />
      )}
    </UserIconStyle>
  );
};
