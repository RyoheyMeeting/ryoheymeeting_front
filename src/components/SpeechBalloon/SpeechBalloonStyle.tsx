import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { Properties } from "csstype";
import { LARGE_SHADOW } from "styles/colors";

export type SpeechBalloonStyleProps = {
  width: Properties["width"];
};

const defaultStyle = css<SpeechBalloonStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${({ width }) => width};

  filter: drop-shadow(${LARGE_SHADOW});

  .speechballoon_main {
    flex-grow: 1;
    flex-shrink: 1;

    width: calc(100% - 8px);

    background-color: ${({ theme }) => theme.global.negative};

    padding: 10px;
    border-radius: 16px;
  }

  .speechballoon_text {
    width: 100%;
  }
`;

export const SpeechBalloonStyle = styled.div<SpeechBalloonStyleProps>`
  ${defaultStyle}
`;

SpeechBalloonStyle.defaultProps = {
  width: "260px",
};

export const SpeechBalloonTriStyle = styled(ReactSVG)`
  fill: ${({ theme }) => theme.global.negative};
  width: 8px;
  height: 32px;

  flex-shrink: 0;
`;
