import React from "react";
import { SendableStamp } from "../SendableStamp/SendableStamp";
import { useStampToSendableStampState, UseStampToSendableStampStateProps } from "./hooks/useStampToSendableStampState";

type Props = UseStampToSendableStampStateProps & {};

export const StampToSendableStamp: React.FC<Props> = ({ ...hooksProps }) => {
  const { sendableStampProps } = useStampToSendableStampState(hooksProps);
  return <SendableStamp {...sendableStampProps} />;
};
