import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import styled, { css, useTheme } from "styled-components";

export type ToggleStyleProps = {};

const defaultStyle = css`
  /* Auto layout */
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 12px;

  /* main */
  background-color: ${({ theme }) => theme.global.main}; //背景色の引用指定
  border-radius: 8px 0px 0px 8px;
`;

export const ToggleStyle = styled.div<ToggleStyleProps>`
  ${defaultStyle}
`;

ToggleStyle.defaultProps = {};

export const IconStyleProps: (props: ToggleStyleProps) => IconProps = () => {
  const theme = useTheme();
  return {
    fill: theme.toggle.icon,
    size: "24px",
  };
};
