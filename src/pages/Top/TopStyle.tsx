import styled from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export const MainStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 56px);
  margin-top: 4px;

  .top_flow {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${FlexGap({ gap: "24px", direction: "column" })}
    transform: translateY(-10%);

    width: 856px;
    height: 359px;
    background-image: url("/img/top_flow_bg.png");
    background-size: contain;
    background-position: center;

    position: relative;

    > * {
      position: relative;
    }

    .top_flow_blur {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 440px;
      height: 244px;
      background: WHITE;
      filter: blur(64px);
    }

    .top_title {
      font-size: 48px;
      font-weight: ${FONT_WEIGHT.BOLD};
      line-height: 150%;
    }

    .top_description {
      color: ${({ theme }) => theme.top.description};
      text-align: center;
    }

    .top_panel_button {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      ${FlexGap({ gap: "48px", direction: "row" })}
    }
  }
`;
