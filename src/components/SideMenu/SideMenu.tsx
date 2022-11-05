import React, { Fragment, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { User, UserRole } from "services/User/User";
import { SideMenuStyle, SideMenuStyleProps } from "./SideMenuStyle";

type Props = SideMenuStyleProps & {
  user?: User;
  logoutBtnHandler: MouseEventHandler<HTMLButtonElement>;
};

export const SideMenu: React.FC<Props> = ({ user, logoutBtnHandler, ...styleProps }) => {
  return (
    <SideMenuStyle {...styleProps}>
      <ul>
        <li>
          <Link to="/">トップ</Link>
        </li>
        {user ? (
          <li>
            <div>
              <img src={user?.photoURL} alt="profile image" />
            </div>
            <div>{user?.displayName} 様</div>
            <div>
              <button onClick={logoutBtnHandler}>ログアウト</button>
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login">ログイン</Link>
          </li>
        )}
      </ul>
      <h3>メニュー</h3>
      <ul>
        <li>
          <Link to="/grandprixlist">グランプリ</Link>
        </li>
        {user ? (
          <Fragment>
            <li>
              <Link to="/usertop">ユーザトップ</Link>
            </li>
            <li>
              <Link to="/usersetting">ユーザ設定</Link>
            </li>
            <li>
              <Link to="/shop">ショップ</Link>
            </li>
          </Fragment>
        ) : undefined}
        {user?.role == UserRole.staff ? (
          <li>
            <Link to="/admin">運営トップ</Link>
          </li>
        ) : undefined}
      </ul>
    </SideMenuStyle>
  );
};
