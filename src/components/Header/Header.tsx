import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { UserRole } from "services/User/User";
import { useHeaderState } from "./hooks/useHeaderState";

type Props = {};

export const Header: React.FC<Props> = () => {
  const { isLogin, user, logoutBtnHandler } = useHeaderState();

  return (
    <div>
      <h1>ヘッダー</h1>
      <ul>
        <li>
          <Link to="/">トップ</Link>
        </li>
        {isLogin ? (
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
        {isLogin ? (
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
    </div>
  );
};
