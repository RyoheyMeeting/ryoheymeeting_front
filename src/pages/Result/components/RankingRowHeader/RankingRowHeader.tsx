import React from "react";
import { RankingRowHeaderStyle, RankingRowHeaderStyleProps } from "./RankingRowHeaderStyle";
import Plus from "components/icons/Plus";
import { Equals, Iine, LogoContent, Psycho, Tyottomate } from "components/icons";

type Props = RankingRowHeaderStyleProps & {};

export const RankingRowHeader: React.FC<Props> = () => {
  return (
    <RankingRowHeaderStyle>
      <div className="rrh_rankdummy" />
      <div className="rrh_panel_username">名前</div>
      <div className="rrh_bar" />
      <div className="rrh_counts">
        <Psycho size={24} className="rrh_reactionicon_psycho" />
        <span className="rrh_reactionname_psycho">サイコです！</span>
      </div>
      <Plus size={25} className="rrh_plus" />
      <div className="rrh_counts">
        <Tyottomate size={24} className="rrh_reactionicon_wait" />
        <span className="rrh_reactionname_wait">ちょっと待て！</span>
      </div>
      <Plus size={25} className="rrh_plus" />
      <div className="rrh_counts">
        <Iine size={24} className="rrh_reactionicon_good" />
        <span className="rrh_reactionname_good">いいね！</span>
      </div>
      <Equals size={25} className="rrh_equals" />
      <div className="rrh_total">
        <LogoContent size={24} className="rrh_totalicon" />
        <span className="rrh_totaltitle">合計</span>
      </div>
    </RankingRowHeaderStyle>
  );
};
