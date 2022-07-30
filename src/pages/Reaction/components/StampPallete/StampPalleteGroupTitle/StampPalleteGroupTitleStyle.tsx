import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import styled, { css, useTheme } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type StampPalleteGroupTitleStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${FlexGap({ gap: "12px", direction: "row" })}

  .stamppalletegrouptitle_title {
    font-size: ${FONT_SIZE.STRONG};
    font-weight: ${FONT_WEIGHT.BOLD};
    color: ${({ theme }) => theme.global.negative};
  }
`;

export const StampPalleteGroupTitleStyle = styled.div<StampPalleteGroupTitleStyleProps>`
  ${defaultStyle}
`;

StampPalleteGroupTitleStyle.defaultProps = {};

export const IconStyleProps: (props: StampPalleteGroupTitleStyleProps) => IconProps = () => {
  const theme = useTheme();

  return {
    fill: theme.global.negative,
    size: "32px",
  };
};
