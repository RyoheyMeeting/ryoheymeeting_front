import styled, { css } from "styled-components";
import { Properties } from "csstype";
import { ReactSVG } from "react-svg";

export type LogoStyleProps = {
  size?: Properties["width"];
  logokind?: "square" | "full";
};

const defaultStyle = css`
  display: inline-block;
  & > svg {
    display: block;
    height: 100%;
  }
`;

const squareStyle = css<LogoStyleProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const fullStyle = css<LogoStyleProps>`
  width: calc(225 * ${({ size }) => size} / 48);
  height: ${({ size }) => size};
`;

export const LogoStyle = styled(ReactSVG)`
  ${defaultStyle}

  ${({ logokind }) => logokind == "square" && squareStyle}
  ${({ logokind }) => logokind == "full" && fullStyle}
`;

LogoStyle.defaultProps = {
  size: "36px",
  logokind: "square",
};
