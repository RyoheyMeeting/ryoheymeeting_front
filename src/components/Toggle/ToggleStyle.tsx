import styled, { css } from "styled-components";

export type ToggleStyleProps = {};

const defaultStyle = css`
  /* Auto layout */
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 12px;

  /* main */
  background-color: ${({ theme }) => theme.global.main}; //背景色の引用指定
  border-radius: 8px 0px 0px 8px;
  fill: white;
`;

export const ToggleStyle = styled.div<ToggleStyleProps>`
  ${defaultStyle}
`;

ToggleStyle.defaultProps = {};
