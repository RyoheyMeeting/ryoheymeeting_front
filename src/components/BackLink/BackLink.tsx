import React from "react";
import { AngleLeftStyleProps, BackLinkStyle, BackLinkStyleProps, IconFullStyle } from "./BackLinkStyle";
import { AngleLeft } from "components/icons";

type Props = BackLinkStyleProps & {
  href?: string;
};

export const BackLink: React.FC<Props> = ({ href, ...styleProps }) => {
  return (
    <BackLinkStyle href={href} {...styleProps}>
      <AngleLeft {...AngleLeftStyleProps(styleProps)} />
      <IconFullStyle src="/img/logo_full.svg" wrapper="svg" {...styleProps} />
    </BackLinkStyle>
  );
};
