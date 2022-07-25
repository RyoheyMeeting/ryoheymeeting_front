import { useSelector } from "react-redux";
import { MessageReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { Stamp } from "services/Stamps/Stamps";
import { StampType } from "services/StampTypes/StampTypes";
import { OtherUser } from "services/Users/Users";
import { RootState } from "store";
import { useReaction } from "./useReaction";

export type IResponse = MessageReaction & {
  stamp?: Stamp & {
    type?: StampType;
  };
  sender?: OtherUser;
};

export const useReactionMessage = (messageId: string): IResponse => {
  const { messageReactions } = useSelector((state: RootState) => state.realtimeGrandPrix);
  const messageReaction = messageReactions.data[messageId];
  const reaction = useReaction(messageReaction);
  return {
    ...messageReaction,
    ...reaction,
  };
};
