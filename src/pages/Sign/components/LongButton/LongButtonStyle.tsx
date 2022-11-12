import styled, { css, useTheme } from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";

export type LongButtonStyleProps = {
  priority?: "primary" | "secondary" | "tertiary";
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
  ${FlexGap({ gap: "24px", direction: "row" })}
  width: 100%;
  height: 64px;
  border-radius: 12px;
  box-shadow: 0px 0px 40px rgba(70, 70, 70, 0.1);
  font-size: ${FONT_SIZE.STRONG};
  font-weight: ${FONT_WEIGHT.BOLD};
  white-space: nowrap;
`;

const primaryStyle = css`
  background-color: ${({ theme }) => theme.global.main};
  color: ${({ theme }) => theme.longButton.negative};
`;

const secondaryStyle = css`
  background-color: ${({ theme }) => theme.longButton.negative};
  color: ${({ theme }) => theme.global.main};
  border: 4px solid ${({ theme }) => theme.global.main};
`;

const tertiaryStyle = css`
  background-color: ${({ theme }) => theme.longButton.negative};
  color: ${({ theme }) => theme.longButton.gray};
  border: 2px solid ${({ theme }) => theme.longButton.gray};
`;

export const LongButtonStyle = styled.button<LongButtonStyleProps>`
  ${defaultStyle}

  ${({ priority }) => priority === "primary" && primaryStyle}
  ${({ priority }) => priority === "secondary" && secondaryStyle}
  ${({ priority }) => priority === "tertiary" && tertiaryStyle}
`;

LongButtonStyle.defaultProps = {
  priority: "primary",
};

export const IconStyleProps: (props: LongButtonStyleProps) => IconProps = ({ priority }) => {
  const theme = useTheme();

  const fill =
    priority === "primary"
      ? theme.global.negative
      : priority === "secondary"
      ? theme.global.main
      : priority === "tertiary"
      ? theme.longButton.gray
      : theme.global.main;

  return {
    fill: fill,
    size: "36px",
  };
};
