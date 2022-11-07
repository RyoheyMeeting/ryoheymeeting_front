import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";

export const BalloonTriStyle = styled(ReactSVG)<BalloonStyleProps>`
  display: block;
  position: absolute;
  width: 32px;
  height: 18px;
  fill: ${({ theme }) => theme.global.negative};
`;

export type BalloonStyleProps = {
  triPosition?: "top" | "right" | "bottom" | "left";
  triAlign?: "start" | "center" | "end";
};

const defaultStyle = css`
  display: inline-flex;
  overflow: hidden;

  .balloon_main {
    border-radius: 16px;
    background-color: ${({ theme }) => theme.global.negative};
  }

  .balloon_tri {
    position: relative;

    ${BalloonTriStyle} {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
`;

const topStyle = css`
  flex-direction: column;

  .balloon_tri {
    width: 32px;
    height: 18px;
    margin: 0 21px;

    ${BalloonTriStyle} {
      transform: translate(-50%, -50%);
    }
  }

  .balloon_main {
    min-width: 74px;
    min-height: 60px;
  }
`;

const rightStyle = css`
  flex-direction: row-reverse;

  .balloon_tri {
    width: 18px;
    height: 32px;
    margin: 21px 0;

    ${BalloonTriStyle} {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  .balloon_main {
    min-width: 60px;
    min-height: 74px;
  }
`;

const bottomStyle = css`
  flex-direction: column-reverse;

  .balloon_tri {
    width: 32px;
    height: 18px;
    margin: 0 21px;

    ${BalloonTriStyle} {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }

  .balloon_main {
    min-width: 74px;
    min-height: 60px;
  }
`;

const leftStyle = css`
  flex-direction: row;

  .balloon_tri {
    width: 18px;
    height: 32px;
    margin: 21px 0;

    ${BalloonTriStyle} {
      transform: translate(-50%, -50%) rotate(270deg);
    }
  }

  .balloon_main {
    min-width: 60px;
    min-height: 74px;
  }
`;

const startStyle = css`
  align-items: flex-start;
`;

const centerStyle = css`
  align-items: center;
`;

const endStyle = css`
  align-items: flex-end;
`;

export const BalloonStyle = styled.div<BalloonStyleProps>`
  ${defaultStyle}

  ${({ triPosition }) => triPosition === "top" && topStyle}
  ${({ triPosition }) => triPosition === "right" && rightStyle}
  ${({ triPosition }) => triPosition === "bottom" && bottomStyle}
  ${({ triPosition }) => triPosition === "left" && leftStyle}

  ${({ triAlign }) => triAlign === "start" && startStyle}
  ${({ triAlign }) => triAlign === "center" && centerStyle}
  ${({ triAlign }) => triAlign === "end" && endStyle}
`;

BalloonStyle.defaultProps = {
  triPosition: "top",
  triAlign: "start",
};

