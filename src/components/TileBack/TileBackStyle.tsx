import styled, { css } from "styled-components";
import { Z_INDEX } from "styles/constants/constants";

export type TileBackStyleProps = {
  useHeadPadding?: boolean;
};

const defaultStyle = css`
  position: relative;
  width: 100%;
  height: 100%;

  min-height: 200px;

  .tileback_main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    z-index: ${Z_INDEX.BG};

    .tileback_upper_left {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 506px;
      height: 175px;
    }

    .tileback_wrapper_plate {
      position: absolute;
      top: 29px;
      left: 23px;
    }

    .tileback_lower_right {
      position: absolute;
      bottom: 0;
      right: 0;
      display: block;
      width: 506px;
      height: 175px;
    }
  }

  .titleback_child {
    position: relative;
  }
`;

const useHeadPaddingStyle = css`
  .titleback_child {
    padding-top: 96px;
  }
`;

export const TileBackStyle = styled.div<TileBackStyleProps>`
  ${defaultStyle}

  ${({ useHeadPadding }) => useHeadPadding && useHeadPaddingStyle}
`;

TileBackStyle.defaultProps = {
  useHeadPadding: true,
};
