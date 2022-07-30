import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { ReactSVG } from "react-svg";
import styled, { css, useTheme } from "styled-components";
import { FONT, FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export const ReactionMeterBgStyle = styled(ReactSVG)`
  .reactionmeter_bg_color_bg {
    fill: ${({ theme }) => theme.reactionMeter.bg};
  }

  .reactionmeter_bg_color_bar {
    fill: ${({ theme }) => theme.global.negative};
  }
`;

export type ReactionMeterStyleProps = {
  type?: "psycho" | "wait" | "good";
};

const defaultStyle = css<ReactionMeterStyleProps>`
  position: relative;

  width: 346px;
  height: 346px;
  color: ${({ theme }) => theme.global.negative};

  .reactionmeter_meter,
  ${ReactionMeterBgStyle}, .reactionmeter_bg,
  .reactionmeter_gause,
  .reactionmeter_border,
  .reactionmeter_main {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .reactionmeter_bg {
    margin: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background-color: ${({ theme }) => theme.reactionMeter.meterBg};
    border-radius: 50%;
  }

  .reactionmeter_gause_line {
    fill: none;
    stroke-width: 36px;
    stroke-dasharray: 302;
    transition: stroke-dashoffset 0.5s ease;
  }

  .reactionmeter_border {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 8px solid ${({ theme }) => theme.reactionMeter.border};
  }

  .reactionmeter_main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .reactionmeter_top {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    ${FlexGap({ gap: "2px", direction: "column" })}

    flex: 1;

    & > span {
      font-family: ${FONT.ROBOTO};
      font-weight: ${FONT_WEIGHT.BOLD};
      font-size: 16px;
      line-height: 24px;
    }
  }

  .reactionmeter_stamp {
    position: relative;
    width: 146px;
    height: 146px;
  }

  .reactionmeter_bottom {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    flex: 1;

    & > span {
      font-family: ${FONT.ROBOTO};
      font-weight: ${FONT_WEIGHT.BOLD};
      font-size: 24px;
      line-height: 36px;
    }
  }
`;

const psychoStyle = css`
  .reactionmeter_gause_line {
    stroke: ${({ theme }) => theme.reactionMeter.psycho.meter};
  }
`;

const waitStyle = css`
  .reactionmeter_gause_line {
    stroke: ${({ theme }) => theme.reactionMeter.wait.meter};
  }
`;

const goodStyle = css`
  .reactionmeter_gause_line {
    stroke: ${({ theme }) => theme.reactionMeter.good.meter};
  }
`;

export const ReactionMeterStyle = styled.div<ReactionMeterStyleProps>`
  ${defaultStyle}

  ${({ type }) => type == "psycho" && psychoStyle}
  ${({ type }) => type == "wait" && waitStyle}
  ${({ type }) => type == "good" && goodStyle}
`;

ReactionMeterStyle.defaultProps = {
  type: "psycho",
};

export const IconStyleProps: (props: ReactionMeterStyleProps) => IconProps = () => {
  const theme = useTheme();
  return {
    fill: theme.global.negative,
    size: "36px",
  };
};
