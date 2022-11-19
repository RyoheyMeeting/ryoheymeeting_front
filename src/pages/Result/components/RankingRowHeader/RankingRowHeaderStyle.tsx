import styled, { css } from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";

export type RankingRowHeaderStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 7px 24px;
  color: ${({ theme }) => theme.result.font};

  height: 62px;

  background: ${({ theme }) => theme.result.border};
  border-radius: 8px;

  color: ${({ theme }) => theme.result.grayFont};

  .rrh_rankdummy {
    width: 48px;
    height: 48px;
  }

  .rrh_panel_username {
    width: 211px;
    text-align: center;
    vertical-align: center;
    line-height: 150%;
    flex-shrink: 1;
  }

  .rrh_bar {
    align-self: stretch;
    width: 2px;
    flex-shrink: 0;
  }

  .rrh_counts {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${FlexGap({ gap: "10px", direction: "row" })}

    width: 221px;
    flex-shrink: 0;

    .rrh_reactionicon_psycho svg {
      fill: ${({ theme }) => theme.result.psycho};
    }

    .rrh_reactionicon_wait svg {
      fill: ${({ theme }) => theme.result.wait};
    }

    .rrh_reactionicon_good {
      fill: ${({ theme }) => theme.result.good};
    }
  }

  .rrh_plus svg,
  .rrh_equals svg {
    fill: ${({ theme }) => theme.result.font};
  }

  .rrh_total {
    width: 221px;
    text-align: center;
    vertical-align: center;
    flex-shrink: 0;

    .rrh_totalicon {
      fill: ${({ theme }) => theme.global.main};
    }
  }
`;

export const RankingRowHeaderStyle = styled.div<RankingRowHeaderStyleProps>`
  ${defaultStyle}
`;

RankingRowHeaderStyle.defaultProps = {};
