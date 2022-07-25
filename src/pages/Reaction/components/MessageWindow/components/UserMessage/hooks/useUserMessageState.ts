import { useReactionMessage } from "hooks/RealtimeGrandPrix/useReactionMessage";
import { useStampImage } from "hooks/StampResources/useStampImage";
import { useEffect } from "react";
import { OtherUser } from "services/Users/Users";

export type IResponse = {
  sender?: OtherUser;
  message: string;
  stampName?: string;
  stampUrl?: string;
};

export const useUserMessageState = (messageId: string): IResponse => {
  const reactionMessage = useReactionMessage(messageId);
  const { urls, loadUrl } = useStampImage();

  useEffect(() => {
    loadUrl(reactionMessage.stampId);
  }, [reactionMessage.stampId]);

  return {
    sender: reactionMessage.sender,
    message: reactionMessage.message,
    stampName: reactionMessage.stamp?.name,
    stampUrl: urls[reactionMessage.stampId],
  };
};
