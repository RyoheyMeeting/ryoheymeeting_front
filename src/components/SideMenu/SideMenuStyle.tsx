import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type SideMenuStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 0;
  ${FlexGap({ gap: "10px", direction: "column" })}
  background-color: ${({ theme }) => theme.sideMenu.bg};
  width: 297px;
  height: 100%;

  > ul {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    ${FlexGap({ gap: "10px", direction: "column" })}
    padding-right: 25px;
    align-self: stretch;
  }

  .sidemenu_bar {
    height: 4px;
    margin: 0px 10px;
    background-color: ${({ theme }) => theme.sideMenu.bar};
    border-radius: 2px;
    mix-blend-mode: multiply;
  }
`;

export const SideMenuStyle = styled.div<SideMenuStyleProps>`
  ${defaultStyle}
`;

SideMenuStyle.defaultProps = {};
