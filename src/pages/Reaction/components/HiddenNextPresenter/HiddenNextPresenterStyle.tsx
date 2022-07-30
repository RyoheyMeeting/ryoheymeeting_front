import styled, { css } from "styled-components";
import { NextPresenter } from "../NextPresenter/NextPresenter";

export const NextPresenterStyle = styled(NextPresenter)``;

export type HiddenNextPresenterStyleProps = {
  hide: boolean;
};

const defaultStyle = css`
  ${NextPresenterStyle} {
    opacity: 0;
    transform: translate(-30%, 0);
    transition: all 0.5s ease;
  }
`;

const showStyle = css`
  ${NextPresenterStyle} {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

export const HiddenNextPresenterStyle = styled.div<HiddenNextPresenterStyleProps>`
  ${defaultStyle}

  ${({ hide }) => !hide && showStyle}
`;

HiddenNextPresenterStyle.defaultProps = {
  hide: true,
};
