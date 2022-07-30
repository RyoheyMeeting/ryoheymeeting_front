import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type StampPalleteGroupStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${FlexGap({ gap: "24px", direction: "row" })}

  width: 100%;
`;

export const StampPalleteGroupStyle = styled.div<StampPalleteGroupStyleProps>`
  ${defaultStyle}
`;

StampPalleteGroupStyle.defaultProps = {};
