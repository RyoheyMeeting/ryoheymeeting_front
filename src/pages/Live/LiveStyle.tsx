import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export type LiveStyleProps = {};

const defaultStyle = css`
  position: relative;

  width: 100vw;
  height: 100vh;

  background-image: url("/img/live_bg.png");
  background-size: cover;

  .live_reactions {
    position: absolute;
    width: 765px;
    height: 765px;

    left: 50%;
    bottom: 94px;
    transform: translateX(-50%);
  }

  .live_presenter_info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${FlexGap({ gap: "85px", direction: "row" })}
    padding: 0 335px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 100%;
    height: 221px;
  }

  .live_presenter_username {
    display: inline-block;
    flex: 1;

    font-size: 100px;
    font-weight: ${FONT_WEIGHT.BOLD};
    line-height: 150%;
    color: ${({ theme }) => theme.global.main};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .live_timer {
    display: inline-block;
    flex: 1;

    font-size: 130px;
    font-weight: ${FONT_WEIGHT.BOLD};
    line-height: 150%;
    color: ${({ theme }) => theme.global.negative};
  }

  .live_presenter_message {
    font-size: 130px;
    font-weight: ${FONT_WEIGHT.BOLD};
    line-height: 150%;
    color: ${({ theme }) => theme.global.main};
  }

  .live_meter {
    position: absolute;
    bottom: 0;
    right: 227px;
  }
`;

export const LiveStyle = styled.div<LiveStyleProps>`
  ${defaultStyle}
`;

LiveStyle.defaultProps = {};

export const LiveFrameTopStyle = styled(ReactSVG)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;

  .live_frame_top {
    fill: ${({ theme }) => theme.live.frame.base};
    stroke: ${({ theme }) => theme.live.frame.border};
    stroke-width: 8px;
  }
`;

export const LiveFrameBottomStyle = styled(ReactSVG)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;

  .live_frame_color_base {
    fill: ${({ theme }) => theme.live.frame.base};
  }

  .live_frame_color_border {
    fill: ${({ theme }) => theme.live.frame.border};
  }
`;
