import React, { ComponentProps } from "react";
import { useBlinkStampState } from "./hooks/useBlinkStampState";
import { BlinkStampStyle, BlinkStampStyleProps } from "./BlinkStampStyle";
import { Stamp } from "components/Stamp/Stamp";

type Props = BlinkStampStyleProps & {
  stampProps: ComponentProps<typeof Stamp>;
  quiteCallback?: () => void;
};

export const BlinkStamp: React.FC<Props> = ({ stampProps, quiteCallback, ...styleProps }) => {
  useBlinkStampState(quiteCallback);
  return <BlinkStampStyle {...stampProps} {...styleProps} color="black" size="L" />;
};
