import styled, { css, useTheme } from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";

export type ButtonStyleProps = {
  color?: "white" | "orange" | "blueBlack" | "red";
  mode?: "default" | "dark";
  size?: "M" | "S";
};

type PrivateProps = {
  iconPlace?: "left" | "right";
};

const defaultStyle = css`
  display: inline-block;

  .button_outer {
    border-radius: 10px;
    padding-bottom: 4px;
  }

  .button_wrap {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    ${FlexGap({ gap: "10px", direction: "row" })}
    padding: 8px 24px;
  }

  :not(:disabled):active {
    margin-top: 4px;

    .button_outer {
      padding-bottom: 0;
    }
  }
`;

const whiteStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.white.bg};
  }
  .button_outer {
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.white.surface};
    color: ${({ theme }) => theme.button.white.font};
  }
`;

const orangeStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.orange.bg};
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.orange.surface};
    color: ${({ theme }) => theme.button.orange.font};
  }
`;

const blueBlackStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.blueBlack.bg};
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.blueBlack.surface};
    color: ${({ theme }) => theme.button.blueBlack.font};
  }
`;

const redStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.red.bg};
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.red.surface};
    color: ${({ theme }) => theme.button.red.font};
  }
`;

const grayStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.gray.bg};
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.gray.surface};
    color: ${({ theme }) => theme.button.gray.font};
  }
`;

const darkGrayStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.darkGray.bg};
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.darkGray.surface};
    color: ${({ theme }) => theme.button.darkGray.font};
  }
`;

const darkBlueBlackStyle = css`
  .button_outer {
    background-color: ${({ theme }) => theme.button.darkBlueBlack.bg};
  }

  .button_wrap {
    background-color: ${({ theme }) => theme.button.darkBlueBlack.surface};
    color: ${({ theme }) => theme.button.darkBlueBlack.font};
  }
`;

const mStyle = css`
  font-size: ${FONT_SIZE.STRONG};
  font-weight: ${FONT_WEIGHT.BOLD};
  line-height: 160%;
`;

const sStyle = css`
  line-height: 27px;
  .button_wrap {
    padding: 4px 16px 4px 16px;
  }
`;

const leftMStyle = css`
  .button_wrap {
    padding: 8px 24px 8px 18px;
  }
`;

const leftSStyle = css`
  .button_wrap {
    padding: 4px 16px 4px 12px;
  }
`;

const rightMStyle = css`
  .button_wrap {
    padding: 8px 18px 8px 24px;
  }
`;

const rightSStyle = css`
  .button_wrap {
    padding: 4px 12px 4px 16px;
  }
`;

export const ButtonStyle = styled.button<ButtonStyleProps & PrivateProps>`
  ${defaultStyle}

  ${({ color }) => color === "white" && whiteStyle}
  ${({ color }) => color === "orange" && orangeStyle}
  ${({ color }) => color === "red" && redStyle}

  ${({ color, mode }) => color === "blueBlack" && mode === "default" && blueBlackStyle}
  ${({ color, mode }) => color === "blueBlack" && mode === "dark" && darkBlueBlackStyle}

  :disabled {
    ${({ mode }) => mode == "default" && grayStyle}
    ${({ mode }) => mode == "dark" && darkGrayStyle}
  }

  ${({ size }) => size === "M" && mStyle}
  ${({ size }) => size === "S" && sStyle}

  ${({ iconPlace, size }) => iconPlace === "left" && size === "M" && leftMStyle}
  ${({ iconPlace, size }) => iconPlace === "left" && size === "S" && leftSStyle}
  ${({ iconPlace, size }) => iconPlace === "right" && size === "M" && rightMStyle}
  ${({ iconPlace, size }) => iconPlace === "right" && size === "S" && rightSStyle}
`;

ButtonStyle.defaultProps = {
  color: "orange",
  mode: "default",
  size: "M",
};

export const IconStyleProps: (props: ButtonStyleProps & PrivateProps & { disabled: boolean }) => IconProps = ({
  color,
  mode,
  size,
  disabled,
}) => {
  const theme = useTheme();

  const fill =
    mode === "default" && disabled
      ? theme.button.gray.font
      : mode === "dark" && disabled
      ? theme.button.darkGray.font
      : color === "white"
      ? theme.button.white.font
      : color === "orange"
      ? theme.button.orange.font
      : color === "red"
      ? theme.button.red.font
      : mode === "dark" && color === "blueBlack"
      ? theme.button.darkBlueBlack.font
      : mode === "default" && color === "blueBlack"
      ? theme.button.blueBlack.font
      : theme.button.white.font;

  const sizeProp = size === "M" ? "24px" : size === "S" ? "18px" : "24px";

  return {
    fill: fill,
    size: sizeProp,
  };
};
