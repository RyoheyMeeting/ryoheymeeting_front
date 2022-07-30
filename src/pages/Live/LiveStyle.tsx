import styled, { css } from "styled-components";

export type LiveStyleProps = {};

const defaultStyle = css``;

export const LiveStyle = styled.div<LiveStyleProps>`
  ${defaultStyle}
`;

LiveStyle.defaultProps = {};
