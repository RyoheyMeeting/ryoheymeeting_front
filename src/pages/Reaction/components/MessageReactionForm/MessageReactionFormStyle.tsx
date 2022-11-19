import styled, { css, useTheme } from "styled-components";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { ReactSVG } from "react-svg";
import { FlexGap } from "styles/Utils/FlexGap";

export type MessageReactionFormStyleProps = {
  disabled?: boolean;
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;

  width: 664px;
  height: 144px;
  color: ${({ theme }) => theme.global.negative};

  .messagereactionform_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 18px;
    ${FlexGap({ gap: "8px", direction: "row" })}

    flex-grow: 1;

    background-color: ${({ theme }) => theme.stampMessage.bg};
  }

  .messagereactionform_textarea {
    flex-grow: 1;

    position: relative;

    height: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.messageReactionForm.textarea};
  }

  .messagereactionform_textarea_value {
    padding: 9px 13px;

    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.global.negative};
    resize: none;

    &::placeholder {
      color: ${({ theme }) => theme.messageReactionForm.font};
    }
  }

  .messagereactionform_letternum {
    position: absolute;
    right: 6px;
    bottom: 3px;

    color: ${({ theme }) => theme.messageReactionForm.font};
  }

  .messagereactionform_stamp {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;

    position: relative;

    width: 128px;
    height: 128px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.messageReactionForm.textarea};
  }

  .messagereactionform_submit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${FlexGap({ gap: "4px", direction: "column" })}

    flex-shrink: 0;

    width: 48px;
    height: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.global.main};
  }
`;

const disabledStyle = css`
  .messagereactionform_submit {
    background-color: ${({ theme }) => theme.messageReactionForm.disabled.button};
  }
`;

export const MessageReactionFormStyle = styled.div<MessageReactionFormStyleProps>`
  ${defaultStyle}

  ${({ disabled }) => disabled && disabledStyle}
`;

MessageReactionFormStyle.defaultProps = {
  disabled: false,
};

export const AddStampStyleProps: (props: MessageReactionFormStyleProps) => IconProps = () => {
  const theme = useTheme();

  return {
    fill: theme.messageReactionForm.font,
    size: "64px",
  };
};

export const AngleUpStyleProps: (props: MessageReactionFormStyleProps) => IconProps = ({ disabled }) => {
  const theme = useTheme();

  return {
    fill: disabled ? theme.messageReactionForm.disabled.font : theme.global.negative,
    size: "24px",
  };
};

export const StampMessageSideStyle = styled(ReactSVG)`
  display: block;
  flex-shrink: 0;

  width: 33px;
  align-self: stretch;
  fill: ${({ theme }) => theme.stampMessage.bg};

  div,
  svg {
    height: 100%;
    width: 33px;
  }
`;

export const SubmitStyle = styled(ReactSVG)<MessageReactionFormStyleProps>`
  fill: ${({ theme, disabled }) => (disabled ? theme.messageReactionForm.disabled.font : theme.global.negative)};
  transform: rotate(180deg);

  height: 70px;
  width: 14px;
`;
