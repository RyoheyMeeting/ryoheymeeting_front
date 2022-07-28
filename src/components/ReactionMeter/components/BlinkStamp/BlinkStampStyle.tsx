import { Stamp } from "components/Stamp/Stamp";
import styled, { css } from "styled-components";
import { Properties } from "csstype";

export type BlinkStampStyleProps = {
  duration?: Properties["transitionDuration"];
};

const defaultStyle = css<BlinkStampStyleProps>``;

export const BlinkStampStyle = styled(Stamp)<BlinkStampStyleProps>`
  ${defaultStyle}
`;

BlinkStampStyle.defaultProps = {
  duration: "2s",
};
