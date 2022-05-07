import styled, { css } from "styled-components";

export type MessageStyleProps = {};

const defaultStyle = css`
  background-color: ${({ theme }) => theme.message.bg};

  .polygon {
    width: 100px;
    height: 100px;
    fill: ${({ theme }) => theme.message.bg};
  }
`;

export const MessageStyle = styled.div<MessageStyleProps>`
  ${defaultStyle}
`;

MessageStyle.defaultProps = {};
