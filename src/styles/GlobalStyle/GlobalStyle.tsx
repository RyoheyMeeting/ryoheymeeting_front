import { createGlobalStyle } from "styled-components";
import { FONT, FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

type Props = {};

export const GlobalStyle = createGlobalStyle<Props>`
  html {
    font-size: 10px;
  }
  body {
    // Base Font
    font-family: ${FONT.NOTO_SANS}, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${FONT_SIZE.DEFAULT};
    font-weight: ${FONT_WEIGHT.REGULAR};
    line-height: 150%;
    color: ${({ theme }) => theme.global.font};
    font-feature-settings: "palt" on;

    // Base Color
    background-color: ${({ theme }) => theme.global.base};
  }
`;
