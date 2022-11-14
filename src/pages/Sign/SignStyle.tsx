import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export const SignStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  overflow: auto;

  .sign_backlink {
    position: absolute;
    top: 21px;
    left: 18px;
  }

  .sign_panel_left {
    flex: 1;
    min-width: 0;
    background-color: ${({ theme }) => theme.global.main};

    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  .sign_panel_right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-width: 0;
    background-color: ${({ theme }) => theme.sign.negative};
    padding: 0 48px;

    .sign_panel_wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      ${FlexGap({ gap: "24px", direction: "column" })}
      width: 650px;

      .sign_title {
        font-size: 48px;
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 150%;
      }

      .sign_description {
        color: ${({ theme }) => theme.sign.description};
        text-align: center;
      }

      .sign_or_bar {
        display: flex;
        flex-direction: row;
        align-items: center;
        ${FlexGap({ gap: "12px", direction: "row" })}
        color: ${({ theme }) => theme.sign.or};
        align-self: stretch;

        .sign_or {
          transform: translateY(-2px);
        }

        .sign_bar {
          background-color: ${({ theme }) => theme.sign.or};
          flex-grow: 1;
          height: 4px;
          border-radius: 2px;
        }
      }
    }
  }
`;

export const LogoSquareStyle = styled(ReactSVG)`
  display: block;
  width: 128px;
  height: 128px;
`;
