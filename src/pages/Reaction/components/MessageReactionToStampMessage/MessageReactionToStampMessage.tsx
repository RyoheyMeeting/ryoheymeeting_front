import React from "react";
import { StampMessage } from "../StampMessage/StampMessage";
import {
  useMessageReactionToStampMessageState,
  UseMessageReactionToStampMessageStateProps,
} from "./hooks/useMessageReactionToStampMessageState";

type Props = UseMessageReactionToStampMessageStateProps;

export const MessageReactionToStampMessage: React.FC<Props> = ({ ...hooksProps }) => {
  const { stampMessageProps } = useMessageReactionToStampMessageState(hooksProps);
  return <StampMessage {...stampMessageProps} />;
};
