import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { Properties } from "csstype";
import { FONT } from "styles/constants/constants";

export const LogoCapStyle = styled(ReactSVG)`
  fill: ${({ theme }) => theme.global.negative};
`;

export type UserPhotoAltStyleProps = {
  size?: Properties["width"];
};

const defaultStyle = css<UserPhotoAltStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ theme }) => theme.global.main};
  overflow: hidden;

  font-family: ${FONT.MOCHIY_POP_ONE};
  color: ${({ theme }) => theme.global.negative};
  font-size: calc(${({ size }) => size} / 2.56);
  line-height: 100%;

  ${LogoCapStyle} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    width: 100%;
    height: 49%;
    fill: ${({ theme }) => theme.global.negative};
  }

  .user_photo_alt_initial {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    overflow: hidden;
    height: 51%;
  }
`;

export const UserPhotoAltStyle = styled.div<UserPhotoAltStyleProps>`
  ${defaultStyle}
`;

UserPhotoAltStyle.defaultProps = {
  size: "24px",
};
