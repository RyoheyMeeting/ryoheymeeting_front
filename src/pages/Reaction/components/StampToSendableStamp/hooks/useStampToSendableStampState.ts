import { useStampSerializer } from "hooks/RealtimeGrandPrix/serializers/useStampSerializer";
import { ComponentProps } from "react";
import { SendableStamp } from "../../SendableStamp/SendableStamp";

export type UseStampToSendableStampStateProps = {
  stampId: string;
  sendableStampCallbacks?: Pick<ComponentProps<typeof SendableStamp>, "onMessageButtonClick" | "onReactionButtonClick">;
};

export type IResponse = {
  sendableStampProps: ComponentProps<typeof SendableStamp>;
};

type HookType = (props: UseStampToSendableStampStateProps) => IResponse;

export const useStampToSendableStampState: HookType = ({ stampId, sendableStampCallbacks }) => {
  const { serializedStamp } = useStampSerializer(stampId);

  return {
    sendableStampProps: {
      stampProps: {
        stampName: serializedStamp?.name,
        stampUrl: serializedStamp?.imageDataUrl,
      },
      ...sendableStampCallbacks,
    },
  };
};
