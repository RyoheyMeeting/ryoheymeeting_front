import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type ReactionStyleProps = {};

const defaultStyle = css<ReactionStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;

  .reaction_container_left {
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${FlexGap({ gap: "20px", direction: "column" })}
    padding: 20px 0px 0px 20px;

    flex-grow: 1;
    flex-shrink: 1;
  }

  .reaction_container_status {
    display: flex;
    flex-direction: row;
    ${FlexGap({ gap: "20px", direction: "row" })}
  }

  .reaction_container_center {
    position: absolute;
    left: 50%;
    top: 64px;
    transform: translateX(-50%);
  }

  .reaction_container_right {
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    flex-shrink: 1;
  }

  .reaction_container_message {
    display: flex;
    flex-direction: row;
    align-self: stretch;
  }

  .reaction_container_toggle {
    display: flex;
    justify-content: center;
    padding: 18px 0;
  }
`;

export const ReactionStyle = styled.div<ReactionStyleProps>`
  ${defaultStyle}
`;

ReactionStyle.defaultProps = {};

export const WaitingStyle = styled.div<ReactionStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 64px;
    line-height: 150%;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }

  div {
    position: absolute;
    top: calc(30% + 100px);
    left: 50%;
    transform: translateX(-50%);
  }
`;
