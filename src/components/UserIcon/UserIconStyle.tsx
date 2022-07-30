import { UserPhotoAlt } from "components/UserPhotoAlt/UserPhotoAlt";
import styled, { css } from "styled-components";

export type UserIconStyleProps = {
  size?: "SS" | "S" | "M" | "L" | "XL";
  color?: "orange" | "white";
};

const defaultStyle = css`
  border-radius: 50%;
  overflow: hidden;

  line-height: 100%;
  color: ${({ theme }) => theme.global.negative};

  .user_photo,
  .user_photo_loading {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  .user_photo {
    object-fit: cover;
  }

  .user_photo_loading {
    background-color: ${({ theme }) => theme.skeleton};
  }
`;

const orangeStyle = css`
  background-color: ${({ theme }) => theme.global.main};
`;

const whiteStyle = css`
  background-color: ${({ theme }) => theme.global.negative};
`;

const ssStyle = css`
  width: 36px;
  height: 36px;
  padding: 2px;

  font-size: 36px;
`;

const sStyle = css`
  width: 48px;
  height: 48px;
  padding: 4px;

  font-size: 48px;
`;

const mStyle = css`
  width: 64px;
  height: 64px;
  padding: 4px;

  font-size: 64px;
`;

const lStyle = css`
  width: 128px;
  height: 128px;
  padding: 8px;

  font-size: 128px;
`;

const xlStyle = css`
  width: 256px;
  height: 256px;
  padding: 8px;

  font-size: 256px;
`;

export const UserIconStyle = styled.div<UserIconStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "orange" && orangeStyle}
  ${({ color }) => color == "white" && whiteStyle}

  ${({ size }) => size == "SS" && ssStyle}
  ${({ size }) => size == "S" && sStyle}
  ${({ size }) => size == "M" && mStyle}
  ${({ size }) => size == "L" && lStyle}
  ${({ size }) => size == "XL" && xlStyle}
`;

UserIconStyle.defaultProps = {
  size: "M",
  color: "orange",
};

export const UserPhotoAltStyle = styled(UserPhotoAlt)`
  border-radius: 50%;
`;
