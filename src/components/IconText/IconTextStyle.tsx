import styled, { css, useTheme } from "styled-components";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { FlexGap } from "styles/Utils/FlexGap";

export type IconTextStyleProps = {
  color?: "default" | "orange";
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 12px 12px 24px;
  ${FlexGap({ gap: "24px", direction: "row" })}

  width: 272px;
  text-decoration: none;

  .icontext_label {
    color: ${({ theme }) => theme.global.font};
  }
`;

const orangeStyle = css`
  .icontext_label {
    color: ${({ theme }) => theme.iconText.orange};
  }
`;

export const IconTextStyle = styled.span<IconTextStyleProps>`
  ${defaultStyle}

  ${({ color }) => color === "orange" && orangeStyle}
`;

IconTextStyle.defaultProps = {
  color: "default",
};

export const IconStyleProps: (props: IconTextStyleProps) => IconProps = ({ color }) => {
  const theme = useTheme();

  return {
    fill: color === "orange" ? theme.iconText.orange : theme.global.font,
    size: "24px",
  };
};
