import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

export type TitlePlateStyleProps = {};

const defaultStyle = css`
  position: relative;
  display: inline-flex;

  .titleplate_main {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
    padding: 4px 16px;

    > * {
      flex-shrink: 0;
    }

    .titleplate_title {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 24px;
      background-color: ${({ theme }) => theme.global.main};

      font-size: ${FONT_SIZE.STRONG};
      font-weight: ${FONT_WEIGHT.BOLD};
      color: ${({ theme }) => theme.global.negative};
    }
  }

  .reverse {
    transform: rotate(180deg);
  }

  .titleplate_bg {
    position: absolute;
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    height: 100%;

    > * {
      flex-shrink: 0;
    }

    .titleplate_spacer {
      flex-grow: 1;
      background-color: ${({ theme }) => theme.global.base};
    }
  }
`;

export const TitlePlateStyle = styled.div<TitlePlateStyleProps>`
  ${defaultStyle}
`;

TitlePlateStyle.defaultProps = {};

export const TitlePlateSideStyle = styled(ReactSVG)`
  display: block;
  width: 44px;
  height: 59px;

  fill: ${({ theme }) => theme.global.main};
`;

export const TitlePlateBGSideStyle = styled(ReactSVG)`
  display: block;
  width: 37px;
  height: 67px;

  fill: ${({ theme }) => theme.global.base};
`;
