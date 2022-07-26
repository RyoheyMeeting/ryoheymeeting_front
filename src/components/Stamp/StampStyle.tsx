import styled, { css } from "styled-components";

export type StampStyleProps = {
  size?: "SS" | "S" | "M" | "L" | "XL";
  color?: "orange" | "black";
  active?: boolean;
};

const defaultStyle = css`
  background-color: ${({ theme }) => theme.stamp.deactive};

  .stamp_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: multiply;
  }
`;

const orangeStyle = css`
  background-color: ${({ theme }) => theme.global.main};
`;

const blackStyle = css`
  background-color: ${({ theme }) => theme.stamp.black};
`;

const ssStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  padding: 2px;

  .stamp_image {
    border-radius: 2px;
  }
`;

const sStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  padding: 2px;

  .stamp_image {
    border-radius: 2px;
  }
`;

const mStyle = css`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  padding: 4px;

  .stamp_image {
    border-radius: 3px;
  }
`;

const lStyle = css`
  width: 128px;
  height: 128px;
  border-radius: 8px;
  padding: 6px;

  .stamp_image {
    border-radius: 4px;
  }
`;

const xlStyle = css`
  width: 256px;
  height: 256px;
  border-radius: 10px;
  padding: 8px;

  .stamp_image {
    border-radius: 6px;
  }
`;

const activeStyle = css<StampStyleProps>`
  ${({ color }) => color == "orange" && orangeStyle}
  ${({ color }) => color == "black" && blackStyle}

  .stamp_image {
    mix-blend-mode: normal;
  }
`;

export const StampStyle = styled.div<StampStyleProps>`
  ${defaultStyle}

  ${({ size }) => size == "SS" && ssStyle}
  ${({ size }) => size == "S" && sStyle}
  ${({ size }) => size == "M" && mStyle}
  ${({ size }) => size == "L" && lStyle}
  ${({ size }) => size == "XL" && xlStyle}

  ${({ active }) => active && activeStyle}
`;

StampStyle.defaultProps = {
  size: "M",
  color: "orange",
  active: true,
};
