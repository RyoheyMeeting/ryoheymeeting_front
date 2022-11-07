import { css } from "styled-components";

/**
 * ホバー時に明るくする設定
 */
export const ActiveBrightness = (lighten: number = 1.2) => css`
  :hover {
    filter: brightness(${lighten});
  }
`;
