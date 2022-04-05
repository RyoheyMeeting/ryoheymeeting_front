import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { GrandPrixList } from "./components/GrandPrixList/GrandPrixList";
import { StampList } from "./components/StampList/StampList";
import { StampTypeList } from "./components/StampTypeList/StampTypeList";

type Props = {};

export const AdminTop: React.FC<Props> = () => {
  return (
    <WithHeaderFooter>
      <h1>管理者トップ</h1>
      <h3>スタンプタイプ一覧</h3>
      <StampTypeList />
      <h3>スタンプ一覧</h3>
      <StampList />
      <h3>グランプリ一覧</h3>
      <GrandPrixList />
    </WithHeaderFooter>
  );
};
