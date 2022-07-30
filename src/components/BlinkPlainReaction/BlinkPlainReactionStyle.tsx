import { Stamp } from "components/Stamp/Stamp";
import styled, { css, keyframes } from "styled-components";
import { Properties } from "csstype";

export const StampStyle = styled(Stamp)``;

export type BlinkPlainReactionStyleProps = {
  duration?: Properties["transitionDuration"];
  animate?: boolean;
};

const BlinkKeyFrames = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  40%, 60% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`;

const defaultStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;

  ${StampStyle} {
    position: absolute;
    width: 100%;
    height: 100%;

    opacity: 0;
    transform: scale(0);
  }
`;

const animateStyle = css<BlinkPlainReactionStyleProps>`
  color: white;
  ${StampStyle} {
    animation: ${BlinkKeyFrames} ${({ duration }) => duration} linear 0s 1;
  }
`;

export const BlinkPlainReactionStyle = styled.div<BlinkPlainReactionStyleProps>`
  ${defaultStyle}

  ${({ animate }) => animate && animateStyle}
`;

BlinkPlainReactionStyle.defaultProps = {
  duration: "2s",
};
