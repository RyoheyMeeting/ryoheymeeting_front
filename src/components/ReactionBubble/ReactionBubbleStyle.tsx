import styled, { css } from "styled-components";
import { Properties } from "csstype";
export type ReactionBubbleStyleProps = {
  reactionType: "mate" | "psycho" | "iine";
  size: Properties["width"];
};

const defaultStyle = css<ReactionBubbleStyleProps>`
  /* reactionType=mate */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  width: ${({ size }) => size};
  height: ${({ size }) => size};
  left: 20px;
  top: 20px;
  border-radius: 50%;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 20px;
  background-color: ${({ theme }) => theme.reactionBubble.blue.bg};
  opacity: 0.5;
`;

const mateStyle = css`
  background-color: ${({ theme }) => theme.reactionBubble.blue.bg};
`;
const psychoStyle = css`
  background-color: ${({ theme }) => theme.reactionBubble.yellow.bg};
`;
const iineStyle = css`
  background-color: ${({ theme }) => theme.reactionBubble.red.bg};
`;

export const ReactionBubbleStyle = styled.div<ReactionBubbleStyleProps>`
  ${defaultStyle}
  ${({ reactionType }) => reactionType == "mate" && mateStyle}
  ${({ reactionType }) => reactionType == "psycho" && psychoStyle}
  ${({ reactionType }) => reactionType == "iine" && iineStyle}
`;

ReactionBubbleStyle.defaultProps = {
  size: "300px",
};
