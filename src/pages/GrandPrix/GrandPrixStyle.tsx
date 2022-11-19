import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { FlexGap } from "styles/Utils/FlexGap";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

export const IconFullStyle = styled(ReactSVG)`
  width: 100%;
  height: 4000px;
  transform: rotate(-19deg);
  fill: ${({ theme }) => theme.global.negative};
`;

export const GrandPrixStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100vh;

  > * {
    flex-grow: 1;
  }

  .grandprix_panel_top {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "36px", direction: "column" })}
    padding: 84px 24px 24px;
    background-color: ${({ theme }) => theme.global.main};
    overflow: hidden;
    position: relative;
    flex-grow: 0;

    color: ${({ theme }) => theme.global.negative};

    > * {
      position: relative;
    }

    .grandprix_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 80%;
      height: 100px;
    }

    .grandprix_statustag {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }

    .grandprix_backlink {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      align-self: flex-start;
      ${FlexGap({ gap: "2px", direction: "row" })}
      color: ${({ theme }) => theme.global.negative};
      text-decoration: none;

      .grandprix_backlink_logo {
        svg {
          fill: ${({ theme }) => theme.global.negative};
        }
      }

      .grandprix_backlink_value {
        font-size: 18px;
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 0;
      }
    }

    .grandprix_panel_main {
      display: flex;
      flex-direction: column;
      padding: 0 48px 48px;
      ${FlexGap({ gap: "36px", direction: "column" })}
      max-width: 860px;

      .grandprix_panel_info {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 100%;

        .grandprix_title {
          display: block;
          font-size: ${FONT_SIZE.STRONG};
          font-weight: ${FONT_WEIGHT.BOLD};
          line-height: 150%;
          width: 100%;
        }

        .grandprix_subtitle {
          display: block;
          font-size: 48px;
          font-weight: ${FONT_WEIGHT.BOLD};
          line-height: 160%;
          width: 100%;
        }
      }

      .grandprix_panel_button {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
        ${FlexGap({ gap: "24px", direction: "row" })}

        .grandprix_panel_register {
          display: flex;
          flex-direction: column;
          align-items: center;
          ${FlexGap({ gap: "4px", direction: "column" })}

          .grandprix_register_info {
            color: ${({ theme }) => theme.global.base};
            font-size: ${FONT_SIZE.SMALL};
            font-weight: ${FONT_WEIGHT.REGULAR};
            line-height: 150%;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .grandprix_panel_bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    justify-items: stretch;
    padding: 48px;
    ${FlexGap({ gap: "48px", direction: "row" })}

    .grandprix_panel_presenters {
      border-left: 8px solid ${({ theme }) => theme.global.main};
      padding: 12px 25px;
      flex-basis: 0;
      flex-grow: 1;
      min-width: 480px;

      .grandprix_bartitle {
        display: inline-block;
        color: ${({ theme }) => theme.global.main};
        font-size: ${FONT_SIZE.STRONG};
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 150%;
        margin-bottom: 8px;
      }

      .grandprix_presenterswrapper {
        display: flex;
        flex-direction: row;
        ${FlexGap({ gap: "32px", direction: "row" })}
        overflow-y: auto;
        width: 100%;

        .grandprix_presentericon {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          ${FlexGap({ gap: "12px", direction: "column" })}
        }

        .grandprix_presentername {
          color: ${({ theme }) => theme.grandPrixTop.presenterName};
          font-size: ${FONT_SIZE.STRONG};
          font-weight: ${FONT_WEIGHT.BOLD};
          line-height: 150%;
          text-align: center;
        }
      }
    }

    .grandprix_panel_description {
      border-left: 8px solid ${({ theme }) => theme.global.main};
      padding: 12px 25px;
      white-space: pre-wrap;
      word-break: break-all;
      flex-basis: 0;
      flex-grow: 1;
      min-width: 480px;

      ::first-line {
        color: ${({ theme }) => theme.global.main};
        font-size: ${FONT_SIZE.STRONG};
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 150%;
        margin-bottom: 8px;
      }
    }
  }
`;
