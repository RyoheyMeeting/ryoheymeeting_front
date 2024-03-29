import React from "react";
import { AngleLeft } from "components/icons";
import { ReactSVG } from "react-svg";
import styled, { css, useTheme } from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";
import { Link } from "react-router-dom";

export type BackLinkStyleProps = {
  color: "white" | "orange";
};

const defaultStyle = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  ${FlexGap({ gap: "8px", direction: "row" })}
`;

const whiteStyle = css`
  color: ${({ theme }) => theme.backLink.white.font};
`;

const orangeStyle = css`
  color: ${({ theme }) => theme.backLink.orange.font};
`;

export const BackLinkStyle = styled(Link)<BackLinkStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "white" && whiteStyle}
  ${({ color }) => color == "orange" && orangeStyle}
`;

BackLinkStyle.defaultProps = {};

export const AngleLeftStyleProps: (props: BackLinkStyleProps) => React.ComponentProps<typeof AngleLeft> = ({
  color,
}) => {
  const theme = useTheme();

  let fill = theme.backLink.white.font;
  if (color === "white") fill = theme.backLink.white.font;
  if (color === "orange") fill = theme.backLink.orange.font;

  return {
    fill: fill,
    size: "32px",
  };
};

const iconFullDefaultStyle = css`
  width: 212.21px;
  height: 48px;
`;

const iconFullWhiteStyle = css`
  fill: ${({ theme }) => theme.backLink.white.font};
`;

const iconFullOrangeStyle = css`
  fill: ${({ theme }) => theme.backLink.orange.font};
`;

export const IconFullStyle = styled(ReactSVG)<BackLinkStyleProps>`
  ${iconFullDefaultStyle}

  ${({ color }) => color == "white" && iconFullWhiteStyle}
  ${({ color }) => color == "orange" && iconFullOrangeStyle}
`;
