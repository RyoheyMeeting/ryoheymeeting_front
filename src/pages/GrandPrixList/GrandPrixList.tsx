import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { Link } from "react-router-dom";
import { useGrandPrixListState } from "./hooks/useGrandPrixListState";

type Props = {};

export const GrandPrixList: React.FC<Props> = () => {
  const { grandPrixes, sortedKeys } = useGrandPrixListState();
  return (
    <WithHeaderFooter>
      <h1>グランプリ</h1>
      {sortedKeys.map((key) => (
        <ul key={key}>
          <li>
            副題：
            {grandPrixes[key].subtitle}
          </li>
          <li>
            ナンバリング：
            {grandPrixes[key].number}
          </li>
          <li>
            開催日：
            {grandPrixes[key].eventDate.toString()}
          </li>
          <li>
            ステータス：
            {grandPrixes[key].status}
          </li>
          <li>
            説明：
            <pre>{grandPrixes[key].description}</pre>
          </li>
          <Link to={"/grandprix/" + key}>グランプリトップ</Link>
        </ul>
      ))}
    </WithHeaderFooter>
  );
};
