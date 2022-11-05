import { Buttonate } from "components/Buttonate/Buttonate";
import { Bars } from "components/icons";
import { UserIcon } from "components/UserIcon/UserIcon";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { User } from "services/User/User";
import { HeaderStyle, HeaderStyleProps, IconFullStyle, IconStyleProps } from "./HeaderStyle";

type Props = HeaderStyleProps & {
  user?: User;
  onClickMenu?: MouseEventHandler<HTMLButtonElement>;
  onClickUserMenu?: MouseEventHandler<HTMLButtonElement>;
};

export const Header: React.FC<Props> = ({ user, onClickMenu, onClickUserMenu, ...styleProps }) => {
  return (
    <HeaderStyle {...styleProps}>
      <div className="header_main">
        <Buttonate onClick={onClickMenu}>
          <Bars {...IconStyleProps(styleProps)} />
        </Buttonate>
        <IconFullStyle src="/img/logo_full.svg" wrapper="svg" {...styleProps} />
        <div className="header_spacer" />
        {user ? (
          // ログイン状態
          <Buttonate onClick={onClickUserMenu}>
            <UserIcon
              userName={user.displayName}
              iconUrl={user.photoURL}
              color={styleProps.color === "default" ? "orange" : "white"}
              size="SS"
            />
          </Buttonate>
        ) : (
          // 非ログイン状態
          <div className="header_login">
            <Link to="/login" className="header_link">
              Login
            </Link>
            <span className="header_link_bar">/</span>
            <Link to="/login" className="header_link">
              Signup
            </Link>
          </div>
        )}
      </div>
      <div className="header_bar" />
    </HeaderStyle>
  );
};
