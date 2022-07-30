import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";

export const SendableStampButtonSideStyle = styled(ReactSVG)`
  fill: ${({ theme }) => theme.sendableStamp.button};
  width: 29px;
  height: 104px;
`;

export const SubmitStyle = styled(ReactSVG)`
  fill: ${({ theme }) => theme.global.negative};
  width: 14px;
  height: 70px;
`;

export type SendableStampStyleProps = {};

const defaultStyle = css`
  display: inline-flex;
  padding: 6px;

  position: relative;

  border-radius: 12px;

  .sendablestamp_button_submit {
    display: inline-flex;
    flex-direction: row;

    position: absolute;
    top: 50%;
    left: 0;

    opacity: 0;
    transform: translate(0, -50%);
    transition: opacity 0.1s ease-out, transform 0.1s ease-out;

    height: 104px;

    z-index: 10;
  }

  .sendablestamp_button_submit_value {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 12px 4px 12px;

    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: ${({ theme }) => theme.sendableStamp.button};

    transform: translateX(1px);
  }

  .sendablestamp_button_message {
    display: inline-flex;
    flex-direction: row;

    position: absolute;
    top: 50%;
    right: 0;

    height: 104px;

    opacity: 0;
    transform: translate(0, -50%);
    transition: opacity 0.1s ease-out, transform 0.1s ease-out;

    z-index: 10;
  }

  .sendablestamp_button_message_value {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;

    height: 100%;
    border-radius: 0 4px 4px 0;
    background-color: ${({ theme }) => theme.sendableStamp.button};

    transform: translateX(-1px);
  }
`;

const hoverStyle = css`
  background-color: ${({ theme }) => theme.sendableStamp.border}B5;

  .sendablestamp_button_submit {
    opacity: 1;
    transform: translate(-100%, -50%);
  }

  .sendablestamp_button_message {
    opacity: 1;
    transform: translate(100%, -50%);
  }
`;

export const SendableStampStyle = styled.div<SendableStampStyleProps>`
  ${defaultStyle}

  &&:hover {
    ${hoverStyle}
  }
`;

SendableStampStyle.defaultProps = {};
