import styled, { css, useTheme } from "styled-components";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { FlexGap } from "styles/Utils/FlexGap";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

export type ActionButtonStyleProps = {
  status: "ready" | "doing" | "disabled";
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${FlexGap({ gap: "6px", direction: "column" })}

  width: 480px;
  height: 160px;

  clip-path: polygon(0 0, calc(100% - 58px) 0, 100% 100%, 58px 100%);

  .actionbutton_space {
    height: 27px;
  }

  .actionbutton_value {
    display: flex;
    flex-direction: row;
    align-items: center;
    ${FlexGap({ gap: "24px", direction: "row" })}

    width: 240px;
  }

  .actionbutton_action_name {
    font-size: 36px;
    font-weight: ${FONT_WEIGHT.BOLD};

    flex-grow: 1;
  }

  .actionbutton_time {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 27px;
  }

  .actionbutton_time_text {
    font-size: ${FONT_SIZE.DEFAULT};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
`;

const readyStyle = css`
  background-color: ${({ theme }) => theme.actionButton.ready.bg};
  color: ${({ theme }) => theme.actionButton.ready.font};
`;

const doingStyle = css`
  background-color: ${({ theme }) => theme.actionButton.doing.bg};
  color: ${({ theme }) => theme.actionButton.doing.font};
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.actionButton.disabled.bg};
  color: ${({ theme }) => theme.actionButton.disabled.font};
`;

export const ActionButtonStyle = styled.button<ActionButtonStyleProps>`
  ${defaultStyle}

  ${({ status }) => status == "ready" && readyStyle}
  ${({ status }) => status == "doing" && doingStyle}
  ${({ status }) => status == "disabled" && disabledStyle}
`;

ActionButtonStyle.defaultProps = {
  status: "ready",
};

export const IconStyleProps: (props: ActionButtonStyleProps) => IconProps = ({ status }) => {
  const theme = useTheme();

  let fill = theme.actionButton.ready.font;
  if (status == "ready") fill = theme.actionButton.ready.font;
  if (status == "doing") fill = theme.actionButton.doing.font;
  if (status == "disabled") fill = theme.actionButton.disabled.font;

  return {
    fill: fill,
    size: "64px",
  };
};
