import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import styled, { css, useTheme } from "styled-components";
import { FONT_SIZE } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type MessageWindowStyleProps = {};

const defaultStyle = css`
  width: 670px;
  height: 560px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  overflow: hidden;

  background: ${({ theme }) => theme.messageWindow.bg};
  border-radius: 16px;

  .messagewindow_container_main {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "12px", direction: "column" })}
    padding: 24px 24px 0 24px;

    overflow-y: auto;

    flex-grow: 1;
    flex-shrink: 1;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      visibility: hidden;
    }

    ::-webkit-scrollbar-thumb {
      background: darkblue;
      opacity: 0.8;
      border-radius: 100px;
    }
  }

  .messagewindow_container_send {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 12px 18px 24px;
  }

  .messagewindow_container_input {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 4px;
    border-bottom: 4px solid ${({ theme }) => theme.global.main};

    & > input {
      color: ${({ theme }) => theme.global.main};
      flex-grow: 1;
      flex-shrink: 1;

      ::placeholder {
        color: ${({ theme }) => theme.global.main};
      }
    }
    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.global.main};
    }
  }

  .messagewindow_counter {
    color: ${({ theme }) => theme.messageWindow.counter};
    align-self: flex-end;
    font-size: ${FONT_SIZE.SMALL};
    line-height: 20px;
  }
`;

export const MessageWindowStyle = styled.div<MessageWindowStyleProps>`
  ${defaultStyle}
`;

MessageWindowStyle.defaultProps = {};

export const IconStyleProps: (props: MessageWindowStyleProps) => IconProps = () => {
  const theme = useTheme();
  return {
    fill: theme.global.negative,
    size: "24px",
  };
};
