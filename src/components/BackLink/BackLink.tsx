import React from "react";
import { AngleLeftStyleProps, BackLinkStyle, BackLinkStyleProps, IconFullStyle } from "./BackLinkStyle";
import { AngleLeft } from "components/icons";
import { To } from "react-router-dom";

type Props = BackLinkStyleProps & {
  to: To;
};

export const BackLink: React.FC<Props> = ({ to, ...styleProps }) => {
  return (
    <BackLinkStyle to={to} {...styleProps}>
      <AngleLeft {...AngleLeftStyleProps(styleProps)} />
      <IconFullStyle src="/img/logo_full.svg" wrapper="svg" {...styleProps} />
    </BackLinkStyle>
  );
};
