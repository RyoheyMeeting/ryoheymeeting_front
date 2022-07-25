import styled, { css } from "styled-components";

export type AudiencePanelStyleProps = {};

const defaultStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .audiencepanel_container_stamp {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .audiencepanel_container_messagewindow {
    position: absolute;
    top: 20px;
    right: 20px;

    display: flex;
    flex-direction: row;

    transform: translateX(calc(20px + 100% - 48px));
    transition: transform 0.5s ease;
  }

  .audiencepanel_container_messagewindow.open {
    transform: translateX(0);
  }

  .audiencepanel_container_toggle {
    display: flex;
    padding: 18px 0;
    align-self: flex-start;
  }
`;

export const AudiencePanelStyle = styled.div<AudiencePanelStyleProps>`
  ${defaultStyle}
`;

AudiencePanelStyle.defaultProps = {};
