import styled from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";
import { StampPallete } from "../StampPallete/StampPallete";

export type AudiencePanelStyleProps = {};

export const AudiencePanelStyle = styled.div<AudiencePanelStyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${FlexGap({ gap: "24px", direction: "row" })}

  width: 100%;
  height: 100%;

  pointer-events: none;

  .audiencepanel_left {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "124px", direction: "column" })}
    padding: 24px 0 24px 24px;

    flex: 1;

    height: 100%;
  }

  .audiencepanel_leftup {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "24px", direction: "column" })}

    pointer-events: all;
  }

  .audiencepanel_center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;

    flex-shrink: 0;

    height: 100%;
  }

  .audiencepanel_right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 24px 24px 0;
    ${FlexGap({ gap: "24px", direction: "column" })}

    flex: 1;

    height: 100%;

    pointer-events: all;
  }

  .presetnerpanel_messages {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    ${FlexGap({ gap: "8px", direction: "column" })}

    flex-grow: 1;

    overflow-y: scroll;
    pointer-events: all;
  }
`;

AudiencePanelStyle.defaultProps = {};

export const StampPalleteStyle = styled(StampPallete)`
  flex-grow: 1;
  align-self: stretch;
`;
