import styled, { css } from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

type PrivateProps = {
  isWritten: boolean;
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  ${FlexGap({ gap: "24px", direction: "row" })}
  width: 100%;
  height: 64px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.inputText.deactive.font};
  background-color: ${({ theme }) => theme.inputText.deactive.bg};

  > * {
    transition: top 0.2s ease, left 0.2s ease, color 0.2s ease, font-size 0.2s ease, font-weight 0.2s ease;
  }

  position: relative;

  .inputtext_placeholder {
    position: absolute;
    top: 14.5px;
    left: 24px;
    display: inline-block;
    color: ${({ theme }) => theme.inputText.placeholder};
    font-size: ${FONT_SIZE.STRONG};
    font-weight: ${FONT_WEIGHT.BOLD};
    pointer-events: none;
    border-radius: 4px;
    padding: 0 4px;
  }

  .inputtext_input {
    display: inline-block;
    flex-grow: 1;
    min-width: 0;
    color: ${({ theme }) => theme.inputText.deactive.font};
    font-size: ${FONT_SIZE.STRONG};
    font-weight: ${FONT_WEIGHT.BOLD};
    line-height: 150%;
  }

  .inputtext_icon {
    flex-shrink: 0;
    svg {
      fill: ${({ theme }) => theme.inputText.deactive.font};
    }
  }

  :focus-within {
    border-color: ${({ theme }) => theme.global.main};
    background-color: ${({ theme }) => theme.inputText.negative};

    .inputtext_placeholder,
    .inputtext_input {
      color: ${({ theme }) => theme.global.main};
    }

    .inputtext_placeholder {
      top: -16px;
      left: 23.5px;
      color: ${({ theme }) => theme.global.main};
      font-size: ${FONT_SIZE.DEFAULT};
      font-weight: ${FONT_WEIGHT.REGULAR};
      background: ${({ theme }) => theme.inputText.negative};
    }

    .inputtext_icon svg {
      fill: ${({ theme }) => theme.global.main};
    }
  }
`;

const writtenStyle = css`
  .inputtext_placeholder {
    top: -16px;
    left: 23.5px;
    color: ${({ theme }) => theme.inputText.deactive.font};
    font-size: ${FONT_SIZE.DEFAULT};
    font-weight: ${FONT_WEIGHT.REGULAR};
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.inputText.negative} 39.58%,
      ${({ theme }) => theme.inputText.deactive.bg} 64.06%
    );
  }

  .inputtext_icon svg {
    fill: ${({ theme }) => theme.inputText.deactive};
  }
`;

export const InputTextStyle = styled.div<PrivateProps>`
  ${defaultStyle}

  ${({ isWritten }) => isWritten && writtenStyle}
`;

InputTextStyle.defaultProps = {};
