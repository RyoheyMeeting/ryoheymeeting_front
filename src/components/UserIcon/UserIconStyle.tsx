import styled, { css } from "styled-components";

export type UserIconStyleProps = {
  size?: "SS" | "S" | "M" | "L" | "XL";
};

const defaultStyle = css`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.global.main};

  .user_photo {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ssStyle = css`
  width: 36px;
  height: 36px;
  padding: 2px;
`;

const sStyle = css`
  width: 48px;
  height: 48px;
  padding: 4px;
`;

const mStyle = css`
  width: 64px;
  height: 64px;
  padding: 4px;
`;

const lStyle = css`
  width: 128px;
  height: 128px;
  padding: 8px;
`;

const xlStyle = css`
  width: 256px;
  height: 256px;
  padding: 8px;
`;

export const UserIconStyle = styled.div<UserIconStyleProps>`
  ${defaultStyle}

  ${({ size }) => size == "SS" && ssStyle}
  ${({ size }) => size == "S" && sStyle}
  ${({ size }) => size == "M" && mStyle}
  ${({ size }) => size == "L" && lStyle}
  ${({ size }) => size == "XL" && xlStyle}
`;

UserIconStyle.defaultProps = {
  size: "M",
};
