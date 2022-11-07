import React, { MouseEventHandler, ComponentProps } from "react";
import { Link } from "react-router-dom";
import { Balloon } from "components/Balloon/Balloon";
import { File, SignOut } from "components/icons";
import { IconText } from "components/IconText/IconText";
import { UserMenuStyle, UserMenuStyleProps } from "./UserMenuStyle";
import { UserIcon } from "components/UserIcon/UserIcon";

type Props = UserMenuStyleProps & {
  userIconProps: Omit<ComponentProps<typeof UserIcon>, "color" | "size">;
  onClickLogout?: MouseEventHandler<HTMLButtonElement>;
};

export const UserMenu: React.FC<Props> = ({ userIconProps, onClickLogout, ...styleProps }) => {
  return (
    <Balloon triPosition="top" triAlign="end">
      <UserMenuStyle {...styleProps}>
        <div className="usermenu_panel_top">
          <Link to="/usertop" className="usermenu_usertop">
            <UserIcon {...userIconProps} color="orange" size="M" />
          </Link>
          <div className="usermenu_panel_topright">
            <span className="usermenu_username">{userIconProps.userName}</span>
            <Link to="/usersetting" className="usermenu_setting">
              プロフィールを編集
            </Link>
          </div>
        </div>
        <div className="usermenu_bar" />
        <Link to="/portfoliolist" className="usermenu_item">
          <IconText Icon={File} text="ポートフォリオ一覧" />
        </Link>
        <button onClick={onClickLogout} className="usermenu_item">
          <IconText Icon={SignOut} text="ログアウト" />
        </button>
      </UserMenuStyle>
    </Balloon>
  );
};
