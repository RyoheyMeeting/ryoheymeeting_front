import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import styled, { css, keyframes, useTheme } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

export type ActionButtonStyleProps = {
  actionType?: "mute" | "boost";
  status?: "default" | "doing" | "disabled";
};

const rainbow = keyframes`
  0% { border-color: Magenta; }
  33% { border-color: yellow; }
  66% { border-color: Cyan; }
  100% { border-color: Magenta; }
`;

const defaultStyle = css`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 17px;

  background: ${({ theme }) => theme.global.main};
  color: ${({ theme }) => theme.global.negative};

  font-size: ${FONT_SIZE.COMMAND_TEXT};
  font-weight: ${FONT_WEIGHT.BOLD};
  line-height: 150%;
`;

const mutingStyle = css`
  background: ${({ theme }) => theme.actionButton.muting.bg};
  font-size: 4rem;
  line-height: 72px;
`;

const boostingStyle = css`
  border-style: solid;
  border-width: 8px;
  animation: ${rainbow} 1s linear infinite;
`;

const disabledStyle = css`
  background: ${({ theme }) => theme.actionButton.disabled.bg};
  & > * {
    opacity: 0.2;
  }
`;

export const ActionButtonStyle = styled.button<ActionButtonStyleProps>`
  ${defaultStyle}

  ${({ actionType, status }) =>
    status == "doing"
      ? actionType == "mute"
        ? mutingStyle
        : actionType == "boost" && boostingStyle
      : status == "disabled" && disabledStyle}
`;

ActionButtonStyle.defaultProps = {
  actionType: "mute",
  status: "default",
};

export const IconStyleProps: (props: ActionButtonStyleProps) => IconProps = () => {
  const theme = useTheme();
  return {
    fill: theme.global.negative,
    size: "64px",
  };
};
