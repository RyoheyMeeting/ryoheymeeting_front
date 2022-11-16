import React from "react";
import { GrandPrixStatus } from "services/GrandPrixes/GrandPrixes";
import { GrandprixStatusTagStyle, GrandprixStatusTagStyleProps } from "./GrandprixStatusTagStyle";

type Props = GrandprixStatusTagStyleProps;

export const GrandprixStatusTag: React.FC<Props> = ({ ...styleProps }) => {
  return (
    <GrandprixStatusTagStyle {...styleProps}>
      {styleProps.status === GrandPrixStatus.yet && "次回開催"}
      {styleProps.status === GrandPrixStatus.doing && "開催中！"}
      {styleProps.status === GrandPrixStatus.done && "開催済み"}
    </GrandprixStatusTagStyle>
  );
};
