import styled, { css, useTheme } from "styled-components";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { Link } from "react-router-dom";

export type IconTextStyleProps = {
  status?: "Default" | "Active";
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

const hoverStyle = css`
  background-color: ${({ theme }) => theme.iconText.hover};
`;

const activeStyle = css`
  pointer-events: none;

  .icontext_label {
    color: ${({ theme }) => theme.iconText.active.font};
  }
`;

export const IconTextStyle = styled(Link)<IconTextStyleProps>`
  ${defaultStyle}

  :hover {
    ${({ status }) => status === "Default" && hoverStyle}
  }
  ${({ status }) => status === "Active" && activeStyle}
`;

IconTextStyle.defaultProps = {
  status: "Default",
};

export const IconStyleProps: (props: IconTextStyleProps) => IconProps = ({ status }) => {
  const theme = useTheme();

  return {
    fill: status == "Active" ? theme.iconText.active.font : theme.global.font,
    size: "24px",
  };
};
