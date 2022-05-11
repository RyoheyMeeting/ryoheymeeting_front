import styled, { css, useTheme } from "styled-components";
import { Properties } from "csstype";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
export type ReactionBubbleStyleProps = {
  reactionType: "mate" | "psycho" | "iine";
  size: Properties["width"];
};

const defaultStyle = css`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  left: 20px;
  top: 20px;
  border-radius: 50%;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 20px;
  opacity: 0.5;

  & > * {
    opacity: 0.5;
  }
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

const sizeStyle = css<ReactionBubbleStyleProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export const ReactionBubbleStyle = styled.div<ReactionBubbleStyleProps>`
  ${defaultStyle}
  ${({ reactionType }) => reactionType == "mate" && mateStyle}
  ${({ reactionType }) => reactionType == "psycho" && psychoStyle}
  ${({ reactionType }) => reactionType == "iine" && iineStyle}
  ${sizeStyle}
`;

ReactionBubbleStyle.defaultProps = {
  size: "300px",
};

export const IconStyleProps: (props: ReactionBubbleStyleProps) => IconProps = ({ size }) => {
  const theme = useTheme();
  return {
    fill: theme.global.negative,
    size: `calc(${size} / 3)`,
  };
};
