import React from "react";
import { useParams } from "react-router-dom";
import { useResultState } from "./hooks/useResultState";
import { CollvoWing, ResultStyle } from "./ResultStyle";
import { RankingRow } from "./components/RankingRow/RankingRow";
import { RankingRowHeader } from "./components/RankingRowHeader/RankingRowHeader";

type Props = {};

export const Result: React.FC<Props> = () => {
  const { id } = useParams();
  const { grandPrix, presenters, sortedReactionStats } = useResultState(id || "");

  return (
    <ResultStyle>
      <div className="result_main">
        <div className="result_wrapper_top">
          <span className="result_title">第{grandPrix.number}回遼平会</span>
          <span className="result_wingtitle">
            <CollvoWing src="/img/collvo_wing.svg" wrapper="svg" className="result_wing_left" />
            <span>順位発表</span>
            <CollvoWing src="/img/collvo_wing.svg" wrapper="svg" className="result_wing_right" />
          </span>
        </div>
        <RankingRowHeader />
        <div className="result_ranking">
          {sortedReactionStats &&
            sortedReactionStats.map((reactionStat, index) => (
              <RankingRow
                key={reactionStat.presenterId}
                ranking={index + 1}
                user={{
                  username: presenters[reactionStat.presenterId]?.user?.displayName,
                  photoUrl: presenters[reactionStat.presenterId]?.user?.photoURL,
                }}
                counts={reactionStat.stat?.count}
                total={reactionStat.stat?.total}
              />
            ))}
        </div>
      </div>
    </ResultStyle>
  );
};
