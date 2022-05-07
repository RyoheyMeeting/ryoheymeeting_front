import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type MessageStyleProps = {
  hugContents: boolean;
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  width: 350px;
  padding: 0px;

  .container_main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    ${FlexGap({ gap: "10px", direction: "row" })}

    background: ${({ theme }) => theme.message.bg};
    border-radius: 16px;

    flex: none;
    order: 1;
    flex-grow: 1;
  }

  .container_message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;

    overflow-wrap: break-word;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
  }

  .container_polygon {
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

  .polygon {
    width: 15px;
    height: 15px;
    transform: rotate(-90deg);
    fill: ${({ theme }) => theme.message.bg};
  }
`;

const hugContentsStyle = css`
  display: inline-flex;
  width: auto;
`;

export const MessageStyle = styled.div<MessageStyleProps>`
  ${defaultStyle}

  ${({ hugContents }) => hugContents && hugContentsStyle}
`;

MessageStyle.defaultProps = {};
