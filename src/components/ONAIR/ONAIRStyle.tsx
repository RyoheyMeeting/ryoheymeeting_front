import styled, { css } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

export type ONAIRStyleProps = {};

const defaultStyle = css`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 36px;

  background-color: ${({ theme }) => theme.global.main};
  border-radius: 4px;

  font-weight: ${FONT_WEIGHT.BOLD};
  font-size: ${FONT_SIZE.STRONG};
  line-height: 150%;
  color: ${({ theme }) => theme.ONAIR.font};
`;

export const ONAIRStyle = styled.div<ONAIRStyleProps>`
  ${defaultStyle}
`;

ONAIRStyle.defaultProps = {};
