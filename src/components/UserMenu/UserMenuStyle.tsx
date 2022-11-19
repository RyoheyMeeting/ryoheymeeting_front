import styled, { css } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { ActiveBrightness } from "styles/Utils/ActiveBrightness";
import { FlexGap } from "styles/Utils/FlexGap";

export type UserMenuStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 12px;
  ${FlexGap({ gap: "4px", direction: "column" })}

  .usermenu_panel_top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 12px;
    ${FlexGap({ gap: "12px", direction: "row" })}

    .usermenu_usertop {
      text-decoration: none;
      ${ActiveBrightness()}
    }

    .usermenu_panel_topright {
      display: flex;
      flex-direction: column;
      ${FlexGap({ gap: "12px", direction: "column" })}

      .usermenu_username {
        font-weight: ${FONT_WEIGHT.BOLD};
        font-size: ${FONT_SIZE.STRONG};
        line-height: 160%;
      }

      .usermenu_setting {
        color: ${({ theme }) => theme.userMenu.link};
        text-decoration: none;
        ${ActiveBrightness()}
      }
    }
  }

  .usermenu_bar {
    height: 4px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.userMenu.bar};
  }

  .usermenu_item {
    text-decoration: none;

    :hover {
      background-color: ${({ theme }) => theme.userMenu.hoverBG};
    }
  }
`;

export const UserMenuStyle = styled.div<UserMenuStyleProps>`
  ${defaultStyle}
`;

UserMenuStyle.defaultProps = {};
