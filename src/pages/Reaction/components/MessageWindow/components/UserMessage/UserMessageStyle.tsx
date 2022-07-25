import { Message } from "components/Message/Message";
import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type UserMessageStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${FlexGap({ gap: "7px", direction: "row" })}
`;

export const UserMessageStyle = styled.div<UserMessageStyleProps>`
  ${defaultStyle}
`;

UserMessageStyle.defaultProps = {};

export const MessageStyle = styled(Message)`
  flex-grow: 1;
  flex-shrink: 1;
`;
