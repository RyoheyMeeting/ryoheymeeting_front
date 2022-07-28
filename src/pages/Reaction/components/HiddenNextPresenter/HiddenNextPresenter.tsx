import React, { ComponentProps } from "react";
import { NextPresenter } from "../NextPresenter/NextPresenter";
import {
  HiddenNextPresenterStyle,
  HiddenNextPresenterStyleProps,
  NextPresenterStyle,
} from "./HiddenNextPresenterStyle";

type Props = HiddenNextPresenterStyleProps & {
  nextPresenterProps: ComponentProps<typeof NextPresenter>;
};

export const HiddenNextPresenter: React.FC<Props> = ({ nextPresenterProps, ...styleProps }) => {
  return (
    <HiddenNextPresenterStyle {...styleProps}>
      <NextPresenterStyle {...nextPresenterProps} />
    </HiddenNextPresenterStyle>
  );
};
