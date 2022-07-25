import React from "react";
import { LogoStyle, LogoStyleProps } from "./LogoStyle";

type Props = LogoStyleProps & {};

export const Logo: React.FC<Props> = ({ ...styleProps }) => {
  return (
    <>
      {styleProps.logokind == "square" && <LogoStyle {...styleProps} src="/img/logo_square.svg" wrapper="svg" />}
      {styleProps.logokind == "full" && <LogoStyle {...styleProps} src="/img/logo_full.svg" wrapper="svg" />}
    </>
  );
};
