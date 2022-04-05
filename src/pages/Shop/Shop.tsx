import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";

type Props = {};

export const Shop: React.FC<Props> = () => {
  return (
    <WithHeaderFooter>
      <h1>ショップ</h1>
      <ul>
        <li>準備中</li>
      </ul>
    </WithHeaderFooter>
  );
};
