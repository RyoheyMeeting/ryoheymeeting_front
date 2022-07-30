import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { ReactionMeter } from "components/ReactionMeter/ReactionMeter";

export type ReactionMetersStyleProps = {};

const defaultStyle = css<ReactionMetersStyleProps>`
  width: 975px;
  height: 467px;

  overflow: hidden;

  .reactionmeters_wrapper {
    position: relative;

    width: 100%;
    height: 512px;
  }
`;

export const ReactionMetersStyle = styled.div<ReactionMetersStyleProps>`
  ${defaultStyle}
`;

ReactionMetersStyle.defaultProps = {};

export const ReactionMetersBgStyle = styled(ReactSVG)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  fill: ${({ theme }) => theme.reactionMeters.bg};
`;

export const PsychoReactionMeterStyle = styled(ReactionMeter)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const WaitReactionMeterStyle = styled(ReactionMeter)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const GoodReactionMeterStyle = styled(ReactionMeter)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
