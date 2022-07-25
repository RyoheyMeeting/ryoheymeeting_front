import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { ActionList, HotItem, MessageReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";

export type IResponse = {
  currentNum: number;
  messageReactions: ActionList<HotItem<MessageReaction>>;
};

export const useMessageWindowState = (value: string): IResponse => {
  const { realtimeGrandPrix } = useRealtimeGrandPrix();
  return {
    currentNum: value.length,
    messageReactions: realtimeGrandPrix.messageReactions,
  };
};
