import styled, { css } from "styled-components";
import { Properties } from "csstype";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type MessageStyleProps = {
  maxWidth?: Properties["maxWidth"];
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  color: ${({ theme }) => theme.global.font};
  filter: drop-shadow(${({ theme }) => theme.message.shadow});

  .message_container_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    ${FlexGap({ gap: "10px", direction: "row" })}

    background: ${({ theme }) => theme.message.bg};
    border-radius: 16px;

    order: 1;
    flex-grow: 1;

    & > * {
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .message_container_message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;

    order: 0;
    align-self: stretch;
    flex-shrink: 1;
    flex-grow: 1;
  }

  .message_container_polygon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .message_polygon {
    width: 15px;
    height: 15px;
    transform: rotate(-90deg);
    fill: ${({ theme }) => theme.message.bg};
  }
`;

const withMaxWidthStyle = css<MessageStyleProps>`
  max-width: ${({ maxWidth }) => maxWidth};
`;

export const MessageStyle = styled.div<MessageStyleProps>`
  ${defaultStyle}

  ${({ maxWidth }) => maxWidth && withMaxWidthStyle}
`;

MessageStyle.defaultProps = {};
