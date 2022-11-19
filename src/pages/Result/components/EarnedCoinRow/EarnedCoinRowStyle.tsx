import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export const CollvoWing = styled(ReactSVG)`
  display: inline-block;
  width: 27px;
  height: 25px;
`;

type RankNumberProps = {
  rank: number;
};

const rankNumberDefaultStyle = css`
  width: 48px;
  height: 48px;

  color: ${({ theme }) => theme.result.font};

  position: relative;

  .ranknumber_fns,
  .ranknumber_other {
    font-size: 18px;
    font-weight: ${FONT_WEIGHT.BOLD};
  }

  .ranknumber_fns::first-letter,
  .ranknumber_other {
    position: relative;
    font-size: 32px;
    letter-spacing: -4%;
    line-height: 27px;

    text-shadow: 1px 1px 0 ${({ theme }) => theme.result.ranking.border},
      -1px -1px 0 ${({ theme }) => theme.result.ranking.border},
      -1px 1px 0 ${({ theme }) => theme.result.ranking.border}, 1px -1px 0 ${({ theme }) => theme.result.ranking.border},
      0px 1px 0 ${({ theme }) => theme.result.ranking.border}, 0 -1px 0 ${({ theme }) => theme.result.ranking.border},
      -1px 0 0 ${({ theme }) => theme.result.ranking.border}, 1px 0 0 ${({ theme }) => theme.result.ranking.border};
  }

  .ranknumber_wing_surface {
    position: absolute;
    top: 21px;
    left: 19px;
  }

  .ranknumber_wing_shadow {
    position: absolute;
    top: 22px;
    left: 20px;
  }
`;

const rankNumberFirstStyle = css`
  .ranknumber_fns {
    position: absolute;
    top: 11px;
    left: 3px;
  }

  .ranknumber_wing_surface {
    fill: ${({ theme }) => theme.result.first.surface};
  }

  .ranknumber_wing_shadow {
    fill: ${({ theme }) => theme.result.first.shadow};
  }
`;

const rankNumberSecondStyle = css`
  .ranknumber_fns {
    position: absolute;
    top: 11px;
    left: 0px;
  }

  .ranknumber_wing_surface {
    fill: ${({ theme }) => theme.result.second.surface};
  }

  .ranknumber_wing_shadow {
    fill: ${({ theme }) => theme.result.second.shadow};
  }
`;

const rankNumberThirdStyle = css`
  .ranknumber_fns {
    position: absolute;
    top: 11px;
    left: 0px;
  }

  .ranknumber_wing_surface {
    fill: ${({ theme }) => theme.result.third.surface};
  }

  .ranknumber_wing_shadow {
    fill: ${({ theme }) => theme.result.third.shadow};
  }
`;

const rankNumberOtherStyle = css`
  .ranknumber_other {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const RankNumberStyle = styled.div<RankNumberProps>`
  ${rankNumberDefaultStyle}

  ${({ rank }) => rank === 1 && rankNumberFirstStyle}
  ${({ rank }) => rank === 2 && rankNumberSecondStyle}
  ${({ rank }) => rank === 3 && rankNumberThirdStyle}
  ${({ rank }) => rank >= 4 && rankNumberOtherStyle}
`;

export type EarnedCoinRowStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  color: ${({ theme }) => theme.result.font};

  height: 64px;

  background: ${({ theme }) => theme.result.bg};
  border: 2px solid ${({ theme }) => theme.result.border};
  border-radius: 8px;

  .ecr_panel_username {
    display: flex;
    flex-direction: row;
    align-items: center;
    ${FlexGap({ gap: "12px", direction: "row" })};
    width: 256px;
    flex-shrink: 1;

    .ecr_username {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .ecr_bar {
    align-self: stretch;
    width: 2px;
    background-color: ${({ theme }) => theme.result.border};
    flex-shrink: 0;
  }

  .ecr_counts {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 221px;
    flex-shrink: 0;

    .ecr_counts_wrap {
      display: inline-flex;
      flex-direction: row;
      align-items: flex-end;
      ${FlexGap({ gap: "6px", direction: "row" })}

      .ecr_reaction {
        font-size: 24px;
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 130%;
        white-space: nowrap;
      }

      .ecr_boost {
        font-size: 18px;
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 150%;
        white-space: nowrap;
      }
    }
  }

  .ecr_plus *,
  .ecr_equals * {
    fill: ${({ theme }) => theme.result.font};
  }

  .ecr_total {
    display: inline-block;
    width: 221px;
    text-align: center;
    vertical-align: center;
    font-size: 36px;
    font-weight: ${FONT_WEIGHT.BOLD};
    line-height: 150%;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

export const EarnedCoinRowStyle = styled.div<EarnedCoinRowStyleProps>`
  ${defaultStyle}
`;

EarnedCoinRowStyle.defaultProps = {};
