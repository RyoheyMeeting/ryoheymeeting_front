import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type SideMenuStyleProps = {};

const defaultStyle = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  ${FlexGap({ gap: "8px", direction: "row" })}
`;

export const SideMenuStyle = styled.div<SideMenuStyleProps>`
  ${defaultStyle}
`;

SideMenuStyle.defaultProps = {};
