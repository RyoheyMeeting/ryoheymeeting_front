import React from "react";
import { ChessKing, Cog, File, Home, ShoppingCart, UserAlt } from "components/icons";
import { User, UserRole } from "services/User/User";
import { NavIconText } from "./components/NavIconText/NavIconText";
import { SideMenuStyle, SideMenuStyleProps } from "./SideMenuStyle";

type Props = SideMenuStyleProps & {
  user?: User;
};

export const SideMenu: React.FC<Props> = ({ user, ...styleProps }) => {
  return (
    <SideMenuStyle {...styleProps}>
      <ul>
        <li>
          <NavIconText to="/" Icon={Home} text="ホーム" />
        </li>
        <li>
          <NavIconText to="/grandprixlist" Icon={ChessKing} text="グランプリ" />
        </li>
      </ul>
      {user && (
        <>
          <div className="sidemenu_bar" />
          <ul>
            <li>
              <NavIconText to="/usertop" Icon={UserAlt} text="ユーザトップ" />
            </li>
            <li>
              <NavIconText to="/shop" Icon={ShoppingCart} text="ショップ" />
            </li>
            <li>
              <NavIconText to="/portfoliolist" Icon={File} text="ポートフォリオ一覧" />
            </li>
          </ul>
        </>
      )}
      {user?.role === UserRole.staff && (
        <>
          <div className="sidemenu_bar" />
          <ul>
            <li>
              <NavIconText to="/admin/" Icon={Cog} text="運営トップ" />
            </li>
          </ul>
        </>
      )}
    </SideMenuStyle>
  );
};
