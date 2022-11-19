import styled from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";

export type PresenterPanelStyleProps = {};

export const PresenterPanelStyle = styled.div<PresenterPanelStyleProps>`
  position: relative;

  width: 100%;
  height: 100%;

  pointer-events: none;

  .presenterpanel_left {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "124px", direction: "column" })}
    padding: 24px 0 0 24px;

    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
  }

  .presenterpanel_leftup {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "24px", direction: "column" })}

    pointer-events: all;
  }

  .presenterpanel_actions {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "24px", direction: "column" })}

    pointer-events: all;
  }

  .presenterpanel_center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    height: 100%;
  }

  .presenterpanel_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 24px 24px 0 0;

    position: absolute;
    top: 0;
    right: 0;

    height: 100%;
  }

  .presetnerpanel_messages {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    ${FlexGap({ gap: "8px", direction: "column" })}

    max-height: calc(100% - 467px);

    overflow-y: scroll;
    pointer-events: all;
  }
`;

PresenterPanelStyle.defaultProps = {};
