import { useMessageReactionSerializer } from "hooks/RealtimeGrandPrix/serializers/useMessageReactionSerializer";
import { ComponentProps } from "react";
import { StampMessage } from "../../StampMessage/StampMessage";

export type UseMessageReactionToStampMessageStateProps = {
  plainReactionId: string;
};

export type IResponse = {
  stampMessageProps: ComponentProps<typeof StampMessage>;
};

type HookType = (props: UseMessageReactionToStampMessageStateProps) => IResponse;

export const useMessageReactionToStampMessageState: HookType = ({ plainReactionId }) => {
  const { serializedMessageReaction } = useMessageReactionSerializer(plainReactionId);
  console.log(serializedMessageReaction?.sender);
  return {
    stampMessageProps: {
      stampProps: {
        stampName: serializedMessageReaction?.stamp?.name,
        stampUrl: serializedMessageReaction?.stamp?.imageDataUrl,
      },
      userIconProps: {
        iconUrl: serializedMessageReaction?.sender?.photoURL,
      },
      userName: serializedMessageReaction?.sender?.displayName,
      message: serializedMessageReaction?.message,
    },
  };
};
