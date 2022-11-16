import styled, { css } from "styled-components";
import { GrandPrix, GrandPrixStatus } from "services/GrandPrixes/GrandPrixes";
import { FONT_WEIGHT } from "styles/constants/constants";

export type GrandprixStatusTagStyleProps = {
  status: GrandPrix["status"];
};

const defaultStyle = css`
  display: inline-block;
  padding: 4px 12px;
  color: ${({ theme }) => theme.global.negative};
  font-size: 18px;
  font-weight: ${FONT_WEIGHT.BOLD};
  line-height: 27px;
  width: 125px;
  border-radius: 35px;
  text-align: center;
`;

const yetStyle = css`
  background-color: ${({ theme }) => theme.grandPrixCard.tag.yet};
`;

const doingStyle = css`
  background-color: ${({ theme }) => theme.grandPrixCard.tag.doing};
`;

const doneStyle = css`
  background-color: ${({ theme }) => theme.grandPrixCard.tag.done};
`;

export const GrandprixStatusTagStyle = styled.div<GrandprixStatusTagStyleProps>`
  ${defaultStyle}

  ${({ status }) => status === GrandPrixStatus.yet && yetStyle}
  ${({ status }) => status === GrandPrixStatus.doing && doingStyle}
  ${({ status }) => status === GrandPrixStatus.done && doneStyle}
`;

GrandprixStatusTagStyle.defaultProps = {
  status: GrandPrixStatus.done,
};
