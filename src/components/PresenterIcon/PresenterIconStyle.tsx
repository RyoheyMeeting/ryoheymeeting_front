import styled, { css } from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";

export type PresenterIconStyleProps = {
  size?: "S" | "M";
};

const defaultStyle = css<PresenterIconStyleProps>`
  position: relative;

  font-weight: ${FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.global.main};

  .presenter_container_main {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 3%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .presenter_name {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
  }

  .presenter_container_timer {
    color: ${({ theme }) => theme.global.negative};
    font-weight: ${FONT_WEIGHT.REGULAR};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
  }

  .presenter_container_photo {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    clip-path: circle();
    z-index: -1;
  }

  .presenter_photo {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }

  .presenter_top_cover,
  .presenter_bottom_cover {
    position: absolute;
    background-color: ${({ theme }) => theme.presenterIcon.timerBg};
    mix-blend-mode: multiply;
    width: 100%;
  }

  .presenter_top_cover {
    height: 30%;
    top: 0;
  }

  .presenter_bottom_cover {
    height: 20%;
    bottom: 0;
  }

  .presenter_spacer {
    flex-grow: 1;
    flex-shrink: 1;
  }

  & > .circle {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    .presenter_bg_line {
      fill: ${({ theme }) => theme.presenterIcon.bg};
    }

    .presenter_remain_line {
      fill: none;
      stroke: ${({ theme }) => theme.global.main};
      stroke-width: 4px;
      stroke-dasharray: 302;
      transition: stroke-dashoffset 1s ease;
    }
  }
`;

const sStyle = css`
  width: 200px;
  height: 200px;
  padding: 8px;

  .presenter_label {
    font-size: 1.4rem;
    line-height: 130%;
  }

  .presenter_name {
    font-size: 2.1rem;
    line-height: 130%;
  }

  .presenter_container_timer {
    font-size: 1.6rem;
    line-height: 150%;
  }
`;

const mStyle = css`
  width: 440px;
  height: 440px;
  padding: 15px;

  .presenter_label {
    font-size: 2.7rem;
    line-height: 150%;
  }

  .presenter_name {
    font-size: 4.3rem;
    line-height: 150%;
  }

  .presenter_container_timer {
    font-size: 3.8rem;
    line-height: 150%;
  }
`;

export const PresenterIconStyle = styled.div<PresenterIconStyleProps>`
  ${defaultStyle}

  ${({ size }) => size == "S" && sStyle}
  ${({ size }) => size == "M" && mStyle}
`;

PresenterIconStyle.defaultProps = {
  size: "M",
};
