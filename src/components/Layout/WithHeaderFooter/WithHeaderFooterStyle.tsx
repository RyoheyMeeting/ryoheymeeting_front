import styled, { css } from "styled-components";
import { Z_INDEX } from "styles/constants/constants";
import { HeaderStyle } from "components/Header/HeaderStyle";
import { SideMenuStyle } from "components/SideMenu/SideMenuStyle";
import { ActiveBrightness } from "styles/Utils/ActiveBrightness";

export type WithHeaderFooterStyleProps = {
  useHeadPadding?: boolean;
};

type WithOpenProps = {
  isOpen: boolean;
};

const useHeadPaddingStyle = css`
  padding-top: 52px;
`;

export const WithHeaderFooterStyle = styled.div<WithHeaderFooterStyleProps>`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${({ useHeadPadding }) => useHeadPadding && useHeadPaddingStyle}
`;

WithHeaderFooterStyle.defaultProps = {
  useHeadPadding: true,
};

const overlayOpenStyle = css`
  display: block;
  opacity: 0.2;
  pointer-events: all;
`;

export const Overlay = styled.div<WithOpenProps>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 200vw;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  cursor: pointer;
  ${ActiveBrightness(2)}

  ${({ isOpen }) => isOpen && overlayOpenStyle}
`;

const headerWrapperOpenStyle = css`
  width: 100vw;
  left: 0;
`;

export const HeaderWrapper = styled.div<WithOpenProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: -300px;
  width: calc(100vw + 300px);
  height: 56px;
  transition: width 0.2s ease-out, left 0.2s ease-out;

  z-index: ${Z_INDEX.HEADER};

  ${HeaderStyle} {
    flex-grow: 1;
    width: 100vw;

    position: relative;
    z-index: ${Z_INDEX.HEADER};
  }

  ${SideMenuStyle} {
    position: relative;
    height: 100vh;
    flex-shrink: 0;
    z-index: ${Z_INDEX.HEADER + 2};
  }

  ${Overlay} {
    background-color: ${({ theme }) => theme.withHeaderFooter.overlay};
    z-index: ${Z_INDEX.HEADER + 1};
  }

  ${({ isOpen }) => isOpen && headerWrapperOpenStyle}
`;

const userMenuWrapperOpenStyle = css`
  display: block;
`;

export const UserMenuWrapper = styled.div<WithOpenProps>`
  display: none;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 47px 17px 50px 50px;

  z-index: ${Z_INDEX.MODAL};

  ${({ isOpen }) => isOpen && userMenuWrapperOpenStyle}
`;

const ContentWrapperPaddingStyle = css`
  .layout_wrapper_main {
    margin-top: 4px;
  }
`;

export const ContentWrapper = styled.div<WithHeaderFooterStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  z-index: ${Z_INDEX.COMMON};

  .layout_wrapper_main {
    min-height: calc(100vh - 56px);
  }

  ${({ useHeadPadding }) => useHeadPadding && ContentWrapperPaddingStyle}
`;
