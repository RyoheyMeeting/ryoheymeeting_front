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
  align-content: flex-end;

  width: 400px;

  .nextpresenter_icon {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;

    width: 86px;
    height: 86px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.nextPresenter.bg};
  }

  .nextpresenter_main {
    display: flex;
    flex-direction: row;

    flex-grow: 1;

    height: 78px;
    width: 314px;
  }

  .nextpresenter_value {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    flex-grow: 1;
    flex-shrink: 1;

    height: 100%;
    width: calc(100% - 55px);
    padding-right: 10px;
    border-radius: 0 8px 8px 0;
    background-color: ${({ theme }) => theme.nextPresenter.bg};
    color: ${({ theme }) => theme.nextPresenter.font};
  }

  .nextpresenter_introduction {
    overflow: hidden;
    width: 100%;

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

NextPresenterStyle.defaultProps = {
  durationTime: "",
};

export const QuestionStyleProps: (props: NextPresenterStyleProps) => IconProps = () => {
  const theme = useTheme();
  return {
    fill: theme.nextPresenter.font,
    size: "36px",
  };
};

export const NextPresenterSideStyle = styled(ReactSVG)`
  flex-shrink: 0;

  fill: ${({ theme }) => theme.nextPresenter.bg};
  height: 78px;
  width: 55px;
`;
