import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export const CollvoWing = styled(ReactSVG)`
  display: inline-block;
  width: 27px;
  height: 25px;
  fill: ${({ theme }) => theme.result.wing};
`;

export const ResultStyle = styled.div`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  overflow-y: auto;
  color: ${({ theme }) => theme.result.font};

  background: ${({ theme }) => theme.result.bg};
  padding: 48px;

  .result_main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    ${FlexGap({ gap: "32px", direction: "column" })}

    margin: 0 auto;

    width: 1441px;

    .result_wrapper_top {
      display: inline-flex;
      flex-direction: column;
      align-items: center;

      .result_title {
        font-size: ${FONT_SIZE.MEDIUM};
        line-height: 150%;
      }

      .result_wingtitle {
        display: flex;
        flex-direction: row;
        align-items: center;
        ${FlexGap({ gap: "5px", direction: "row" })}

        font-size: 32px;
        font-weight: ${FONT_WEIGHT.BOLD};
        line-height: 160%;

        .result_wing_left {
          transform: scale(-1, 1);
        }
      }
    }

    .result_ranking {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      ${FlexGap({ gap: "12px", direction: "column" })}
    }
  }
`;
