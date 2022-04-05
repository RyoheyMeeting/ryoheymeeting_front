import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { Link } from "react-router-dom";
import { UserRole } from "services/User/User";
import { useUserTopState } from "./hooks/useUserTopState";

type Props = {};

export const UserTop: React.FC<Props> = () => {
  const { user, logoutBtnClickedHandler } = useUserTopState();

  return (
    <WithHeaderFooter>
      <h1>トップ</h1>
      <div>ようこそ、{user?.displayName}さん</div>
      <ul>
        <li>
          <img src={user?.photoURL} alt="プロフィール画像" referrerPolicy="no-referrer" />
        </li>
        <li>役職：{user?.role}</li>
        <li>CollvoPoint：{user?.collvoPoint}</li>
        <li>最終ログイン：{user?.lastLoggedIn.toString()}</li>
        <li>登録日：{user?.registeredAt.toString()}</li>
        <li>所有スタンプ一覧：{user?.stamps}</li>
        <li>参加したグランプリ：{user?.participateInfos}</li>
        <li>ポートフォリオ一覧：{user?.portfolios}</li>
      </ul>
      {user?.role === UserRole.staff ? (
        <div>
          <Link to="/admin">管理者トップ</Link>
        </div>
      ) : undefined}
      <button onClick={logoutBtnClickedHandler}>ログアウト</button>
    </WithHeaderFooter>
  );
};
