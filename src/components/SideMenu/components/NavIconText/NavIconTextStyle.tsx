import styled, { css } from "styled-components";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { FlexGap } from "styles/Utils/FlexGap";
import { NavLink } from "react-router-dom";

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 12px 12px 24px;
  ${FlexGap({ gap: "24px", direction: "row" })}

  width: 100%;
  text-decoration: none;

  svg {
    fill: ${({ theme }) => theme.global.font};
  }

  .icontext_label {
    color: ${({ theme }) => theme.global.font};
    white-space: nowrap;
  }
`;

const hoverStyle = css`
  background-color: ${({ theme }) => theme.navIconText.hoverBG};
`;

const activeStyle = css`
  pointer-events: none;
  svg {
    fill: ${({ theme }) => theme.navIconText.active};
  }

  .icontext_label {
    color: ${({ theme }) => theme.navIconText.active};
  }
`;

export const NavIconTextStyle = styled(NavLink)`
  ${defaultStyle}

  &:not(.active):hover {
    ${hoverStyle}
  }

  &.active {
    ${activeStyle}
  }
`;

NavIconTextStyle.defaultProps = {};

export const IconStyleProps: () => IconProps = () => {
  return {
    size: "24px",
  };
};
