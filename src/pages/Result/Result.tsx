import React from "react";
import { useParams } from "react-router-dom";
import { useResultState } from "./hooks/useResultState";
import { ResultStyle } from "./ResultStyle";

type Props = {};

export const Result: React.FC<Props> = () => {
  const { id } = useParams();
  const { sortedReactionStats } = useResultState(id || "");

  return (
    <ResultStyle>
      <ul>
        {sortedReactionStats &&
          sortedReactionStats.map((sortedReactionStat) => (
            <li key={sortedReactionStat.presenterId}>
              いいね！：{sortedReactionStat.stat?.count.good.reaction}回<br />
              いいね！（ブースト）：{sortedReactionStat.stat?.count.good.boost}回<br />
              サイコです！：{sortedReactionStat.stat?.count.psycho.reaction}回<br />
              サイコです！（ブースト）：{sortedReactionStat.stat?.count.psycho.boost}回<br />
              ちょっとまて！：{sortedReactionStat.stat?.count.wait.reaction}回<br />
              ちょっとまて！（ブースト）：{sortedReactionStat.stat?.count.wait.boost}回<br />
              合計：{sortedReactionStat.stat?.total}
            </li>
          ))}
      </ul>
    </ResultStyle>
  );
};
