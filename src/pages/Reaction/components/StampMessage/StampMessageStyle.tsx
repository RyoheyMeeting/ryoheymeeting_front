import { Stamp } from "components/Stamp/Stamp";
import { UserIcon } from "components/UserIcon/UserIcon";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { FONT_SIZE, FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/Utils/FlexGap";

export type StampMessageStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;

  width: 664px;
  color: ${({ theme }) => theme.global.negative};

  .stampmessage_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 18px;
    ${FlexGap({ gap: "4px", direction: "row" })}

    flex-grow: 1;

    background-color: ${({ theme }) => theme.stampMessage.bg};
  }

  .stampmessage_value {
    display: flex;
    flex-direction: column;
    ${FlexGap({ gap: "8px", direction: "column" })}
    padding: 8px 0;

    flex-grow: 1;
  }

  .stampmessage_user {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    ${FlexGap({ gap: "16px", direction: "row" })}

    width: 100%;
  }

  .stampmessage_user_name {
    font-size: ${FONT_SIZE.STRONG};
    font-weight: ${FONT_WEIGHT.BOLD};
    width: 100%;
  }

  .stampmessage_message {
    & > span {
      width: 100%;
    }
  }
`;

export const StampMessageStyle = styled.div<StampMessageStyleProps>`
  ${defaultStyle}
`;

StampMessageStyle.defaultProps = {};

export const StampMessageSideStyle = styled(ReactSVG)`
  display: block;
  flex-shrink: 0;

  width: 33px;
  align-self: stretch;
  fill: ${({ theme }) => theme.stampMessage.bg};

  div,
  svg {
    height: 100%;
    width: 33px;
  }
`;

export const UserIconStyle = styled(UserIcon)`
  flex-shrink: 0;
`;

export const StampStyle = styled(Stamp)`
  flex-shrink: 0;
  margin: -7px 0;
`;
