import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { ReactSVG } from "react-svg";
import { UserIconStyleProps as OrgUserIconStyleProps } from "components/UserIcon/UserIconStyle";
import { StampStyleProps as OrgStampStyleProps } from "components/Stamp/StampStyle";

export type MessageNotificationStyleProps = {};

const defaultStyle = css`
  position: relative;
  padding: 0px;
  width: 664px;
  height: 176px;

  .messagenotification_container_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 24px 24px 24px 36px;
    ${FlexGap({ gap: "10px", direction: "row" })}

    border-radius: 24px;

    & > * {
      flex-shrink: 0;
    }
  }

  .messagenotification_container_usermessage {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px 0px 0px 16px;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .messagenotification_container_user {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    ${FlexGap({ gap: "16px", direction: "row" })}

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .messagenotification_container_message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px 0px 0px 16px;

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 1;
  }
`;

export const MessageNotificationStyle = styled.div<MessageNotificationStyleProps>`
  ${defaultStyle}
`;

MessageNotificationStyle.defaultProps = {};

export const NotificationBG = styled(ReactSVG)`
  position: absolute;
  left: 0%;
  right: 0%;
  bottom: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  fill: ${({ theme }) => theme.messageNotification.bg};
  z-index: -1;
  & > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const StampStyleProps: (props: MessageNotificationStyleProps) => OrgStampStyleProps = () => {
  return {
    size: "L",
    active: true,
  };
};

export const UserIconStyleProps: (props: MessageNotificationStyleProps) => OrgUserIconStyleProps = () => {
  return {
    size: "S",
  };
};
