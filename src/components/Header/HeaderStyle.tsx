import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { ReactSVG } from "react-svg";
import styled, { css, useTheme } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export type HeaderStyleProps = {
  color?: "default" | "white";
  fill?: "none" | "base";
};

const defaultStyle = css`
  width: 100%;
  color: ${({ theme }) => theme.global.main};
  font-size: ${FONT_SIZE.STRONG};
  font-weight: ${FONT_WEIGHT.BOLD};
  line-height: 160%;

  .header_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 36px 8px 24px;
    ${FlexGap({ gap: "20px", direction: "row" })}
    width: 100%;
  }

  .header_spacer {
    flex-grow: 1;
  }

  .header_login {
    .header_link {
      text-decoration: none;
      color: ${({ theme }) => theme.global.main};
    }

    .header_link_bar {
      margin: 0 5px;
    }
  }

  .header_bar {
    margin: 0 20px;
    height: 4px;
    width: calc(100% - 40px);
    background-color: ${({ theme }) => theme.header.bar};
    border-radius: 2px;
  }
`;

const whiteStyle = css`
  color: ${({ theme }) => theme.global.negative};
`;

const baseStyle = css`
  background-color: ${({ theme }) => theme.global.base};
`;

const noneStyle = css`
  .header_bar {
    opacity: 0.2;
  }
`;

export const HeaderStyle = styled.div<HeaderStyleProps>`
  ${defaultStyle}

  ${({ color }) => color === "white" && whiteStyle}
  ${({ fill }) => fill === "none" && noneStyle}
  ${({ fill }) => fill === "base" && baseStyle}
`;

HeaderStyle.defaultProps = {
  color: "default",
  fill: "base",
};

export const IconStyleProps: (props: HeaderStyleProps) => IconProps = ({ color }) => {
  const theme = useTheme();

  const fill = color === "default" ? theme.global.main : color === "white" ? theme.global.negative : theme.global.main;

  return {
    fill: fill,
    size: "24px",
  };
};

const iconFullDefaultStyle = css`
  height: 36px;
  width: 167px;
  fill: ${({ theme }) => theme.global.main};
`;

const iconFullWhiteStyle = css`
  fill: ${({ theme }) => theme.global.negative};
`;

export const IconFullStyle = styled(ReactSVG)<HeaderStyleProps>`
  ${iconFullDefaultStyle}

  ${({ color }) => color === "white" && iconFullWhiteStyle}
`;
