import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserRole } from "services/User/User";
import { RootState } from "store";

type Props = {};

export const Top: React.FC<Props> = () => {
  const { user, isLogin } = useSelector((state: RootState) => state.user);

  return (
    <WithHeaderFooter>
      <h1>トップ</h1>
      {isLogin ? (
        <div>
          ログインユーザ：{user?.displayName}
          <div>
            <Link to="/usertop">ユーザトップ</Link>
          </div>
          {user?.role === UserRole.staff ? (
            <div>
              <Link to="/admin">管理者トップ</Link>
            </div>
          ) : undefined}
        </div>
      ) : (
        <Link to="/login">ログイン</Link>
      )}
    </WithHeaderFooter>
  );
};
