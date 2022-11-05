import styled, { css } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type FooterStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.footer.bg};
  min-width: 960px;

  .footer_top {
    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${({ theme }) => theme.global.negative};
    font-size: ${FONT_SIZE.STRONG};
    font-weight: ${FONT_WEIGHT.BOLD};
    line-height: 160%;
  }

  .footer_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 256px;
    ${FlexGap({ gap: "10px", direction: "row" })}
    align-self: stretch;
  }

  .footer_panel_left {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 64px;
  }

  .footer_icon {
    height: 64px;
  }

  .footer_panel_center {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "24px", direction: "column" })}
    flex-grow: 1;
  }

  .footer_links {
    display: flex;
    flex-direction: row;

    .footer_link {
      text-decoration: none;
      color: ${({ theme }) => theme.global.negative};
      font-size: ${FONT_SIZE.STRONG};
      font-weight: ${FONT_WEIGHT.BOLD};
      line-height: 160%;
      white-space: nowrap;
      margin-right: 10%;
    }

    .footer_idai {
      color: ${({ theme }) => theme.footer.darkFont};
    }
  }

  .footer_panel_right {
    width: 256px;
    height: 256px;
    flex-shrink: 0;
  }

  .footer_disk {
    width: 100%;
    height: 100%;
  }

  .footer_copyright {
    color: ${({ theme }) => theme.footer.darkFont};
  }
`;

export const FooterStyle = styled.div<FooterStyleProps>`
  ${defaultStyle}
`;

FooterStyle.defaultProps = {};
