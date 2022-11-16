import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import { GrandPrix, GrandPrixStatus } from "services/GrandPrixes/GrandPrixes";
import { FlexGap } from "styles/Utils/FlexGap";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";

export const IconFullStyle = styled(ReactSVG)`
  width: 370px;
  height: 79px;
  transform: rotate(-19deg);
`;

type PrivateProps = {
  status: GrandPrix["status"];
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 240px;
  padding: 24px;
  ${FlexGap({ gap: "24px", direction: "column" })}
  border-radius: 16px;
  overflow: hidden;
  position: relative;

  .grandprixcard_logo {
    position: absolute;
    bottom: -32px;
    right: 0;
    transition: transform .05s ease;
  }

  .grandprixcard_main {
    max-width: 100%;

    .grandprixcard_title,
    .grandprixcard_subtitle,
    .grandprixcard_date {
      line-height: 150%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .grandprixcard_title {
      font-size: ${FONT_SIZE.STRONG};
      font-weight: ${FONT_WEIGHT.BOLD};
    }

    .grandprixcard_subtitle {
      font-size: 18px;
      font-weight: ${FONT_WEIGHT.BOLD};
    }

    .grandprixcard_date {
      font-size: ${FONT_SIZE.SMALL};
      font-weight: ${FONT_WEIGHT.REGULAR};
    }
  }

  .grandprixcard_border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
  }
`;

const yetStyle = css`
  background-color: ${({ theme }) => theme.grandPrixCard.yet.bg};

  ${IconFullStyle} {
    fill: ${({ theme }) => theme.grandPrixCard.yet.font};
  }

  .grandprixcard_title,
  .grandprixcard_subtitle {
    color: ${({ theme }) => theme.grandPrixCard.yet.font};
  }

  .grandprixcard_date {
    color: ${({ theme }) => theme.grandPrixCard.yet.fontGray};
  }

  :hover {
    .grandprixcard_logo {
      transform: translateY(-50px);
    }

    .grandprixcard_border {
      border: 4px solid ${({ theme }) => theme.grandPrixCard.yet.active.border};
    }
  }
`;

const doingStyle = css`
  background-color: ${({ theme }) => theme.grandPrixCard.doing.bg};

  ${IconFullStyle} {
    fill: ${({ theme }) => theme.grandPrixCard.doing.font};
  }

  .grandprixcard_title,
  .grandprixcard_subtitle {
    color: ${({ theme }) => theme.grandPrixCard.doing.font};
  }

  .grandprixcard_date {
    color: ${({ theme }) => theme.grandPrixCard.doing.fontGray};
  }

  :hover {
    .grandprixcard_logo {
      transform: translateY(-50px);
    }

    .grandprixcard_border {
      border: 4px solid ${({ theme }) => theme.grandPrixCard.doing.active.border};
    }
  }
`;

const doneStyle = css`
  background-color: ${({ theme }) => theme.grandPrixCard.done.bg};

  ${IconFullStyle} {
    fill: ${({ theme }) => theme.grandPrixCard.done.border};
  }

  .grandprixcard_title,
  .grandprixcard_subtitle {
    color: ${({ theme }) => theme.grandPrixCard.done.font};
  }

  .grandprixcard_date {
    color: ${({ theme }) => theme.grandPrixCard.done.fontGray};
  }

  .grandprixcard_border {
    border: 1px solid ${({ theme }) => theme.grandPrixCard.done.border};
  }

  :hover {
    .grandprixcard_logo {
      transform: translateY(-50px);
    }

    .grandprixcard_border {
      border: 4px solid ${({ theme }) => theme.grandPrixCard.done.active.border};
    }
  }
`;

export const GrandprixCardStyle = styled.div<PrivateProps>`
  ${defaultStyle}

  ${({ status }) => status === GrandPrixStatus.yet && yetStyle}
  ${({ status }) => status === GrandPrixStatus.doing && doingStyle}
  ${({ status }) => status === GrandPrixStatus.done && doneStyle}
`;
