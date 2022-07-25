import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { ReactSVG } from "react-svg";
import styled, { css, keyframes, useTheme } from "styled-components";

export type NextPresenterStyleProps = {
  durationTime?: string;
};

const AutoScrollKeyFrames = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0%);
  }
  10% {
    opacity: 1;
    transform: translateX(0%);
  }
  80% {
    opacity: 1;
    transform: translateX(calc(-100% + 213px));
  }
  100% {
    opacity: 0;
    transform: translateX(calc(-100% + 213px));
  }
`;

const defaultStyle = css<NextPresenterStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;

  position: relative;
  width: 373px;
  height: 86px;

  .nextpresenter_container_icon {
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 86px;
    height: 86px;

    background: ${({ theme }) => theme.nextPresenter.bg};

    border: 8px solid ${({ theme }) => theme.global.main};
    border-radius: 50%;

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .nextpresenter_container_main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    position: relative;
    border-radius: 8px;
    padding: 8px 8px 8px 54px;

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .nextpresenter_container_message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    color: ${({ theme }) => theme.global.negative};
    flex-grow: 0;
    flex-shrink: 0;
    z-index: 300;
  }

  .nextpresenter_introduction {
    overflow: hidden;
    width: 213px;

    & > span {
      white-space: nowrap;
      display: inline-block;

      animation: ${AutoScrollKeyFrames} ${({ durationTime }) => durationTime} linear 0.5s infinite;
    }

    & > span.nextpresenter_no_animation {
      animation: none;
    }
  }
`;

export const NextPresenterStyle = styled.div<NextPresenterStyleProps>`
  ${defaultStyle}
`;

NextPresenterStyle.defaultProps = {};

export const NextPresenterBG = styled(ReactSVG)`
  position: absolute;
  left: 0%;
  right: 0%;
  bottom: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  fill: ${({ theme }) => theme.nextPresenter.bg};
  stroke: ${({ theme }) => theme.global.main};
  stroke-width: 8px;
  & > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const IconStyleProps: (props: NextPresenterStyleProps) => IconProps = () => {
  const theme = useTheme();
  return {
    fill: theme.global.negative,
    size: "36px",
  };
};
