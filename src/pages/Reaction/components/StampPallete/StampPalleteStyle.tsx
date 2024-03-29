import styled, { css } from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";

export type StampPalleteStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${FlexGap({ gap: "24px", direction: "column" })}
  padding: 24px 100px;

  overflow-y: scroll;

  background: ${({ theme }) => theme.stampPallete.bg};
  box-shadow: inset 0px 0px 16px rgba(38, 39, 67, 0.4);
  border-radius: 8px;

  pointer-events: all;
`;

export const StampPalleteStyle = styled.div<StampPalleteStyleProps>`
  ${defaultStyle}
`;

StampPalleteStyle.defaultProps = {};
