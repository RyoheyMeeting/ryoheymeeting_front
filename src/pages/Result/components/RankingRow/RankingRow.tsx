import React from "react";
import { UserIcon } from "components/UserIcon/UserIcon";
import { ReactionCounts } from "hooks/ReactionStats/useReactionStats";
import { CollvoWing, RankingRowStyle, RankingRowStyleProps, RankNumberStyle } from "./RankingRowStyle";
import Plus from "components/icons/Plus";
import { Equals } from "components/icons";

type Props = RankingRowStyleProps & {
  ranking: number;
  user: {
    username?: string;
    photoUrl?: string;
  };
  counts?: ReactionCounts;
  total?: number;
};

export const RankingRow: React.FC<Props> = ({
  ranking,
  user,
  counts = {
    psycho: {
      reaction: 0,
      boost: 0,
    },
    wait: {
      reaction: 0,
      boost: 0,
    },
    good: {
      reaction: 0,
      boost: 0,
    },
  },
  total = 0,
  ...styleProps
}) => {
  return (
    <RankingRowStyle {...styleProps}>
      <RankNumberStyle rank={ranking}>
        {ranking <= 3 ? (
          <>
            <CollvoWing src="/img/collvo_wing.svg" wrapper="svg" className="ranknumber_wing_shadow" />
            <CollvoWing src="/img/collvo_wing.svg" wrapper="svg" className="ranknumber_wing_surface" />
            <span className="ranknumber_fns">
              {ranking === 1 && "1st"}
              {ranking === 2 && "2nd"}
              {ranking === 3 && "3rd"}
            </span>
          </>
        ) : (
          <span className="ranknumber_other">{ranking}</span>
        )}
      </RankNumberStyle>
      <div className="ecr_panel_username">
        <UserIcon userName={user.username} iconUrl={user.photoUrl} color="orange" size="S" />
        <span className="ecr_username">{user.username}</span>
      </div>
      <div className="ecr_bar" />
      <div className="ecr_counts">
        <div className="ecr_counts_wrap">
          <span className="ecr_reaction">{counts.psycho.reaction}回</span>
          <span className="ecr_boost">（{counts.psycho.boost}回）</span>
        </div>
      </div>
      <Plus size={25} className="ecr_plus" />
      <div className="ecr_counts">
        <div className="ecr_counts_wrap">
          <span className="ecr_reaction">{counts.wait.reaction}回</span>
          <span className="ecr_boost">（{counts.wait.boost}回）</span>
        </div>
      </div>
      <Plus size={25} className="ecr_plus" />
      <div className="ecr_counts">
        <div className="ecr_counts_wrap">
          <span className="ecr_reaction">{counts.good.reaction}回</span>
          <span className="ecr_boost">（{counts.good.boost}回）</span>
        </div>
      </div>
      <Equals size={25} className="ecr_equals" />
      <span className="ecr_total">{total}回</span>
    </RankingRowStyle>
  );
};
