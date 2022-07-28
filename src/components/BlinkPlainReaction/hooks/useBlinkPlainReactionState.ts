import { Stamp } from "components/Stamp/Stamp";
import { usePlainReactionSerializer } from "hooks/RealtimeGrandPrix/serializers/usePlainReactionSerializer";
import { ComponentProps, useEffect, useState } from "react";
import { useImage } from "react-image";

export type IResponse = {
  stampProps: ComponentProps<typeof Stamp>;
  animate: boolean;
};

export const useBlinkPlainReactionState = (plainReactionId: string, quiteCallback?: () => void): IResponse => {
  const { serializedPlainReaction } = usePlainReactionSerializer(plainReactionId);
  const { src, isLoading, error } = useImage({
    srcList: [serializedPlainReaction?.stamp?.imageDataUrl || ""],
    useSuspense: false,
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!animate && (!isLoading || error)) {
      setAnimate(true);
      setTimeout(() => {
        if (quiteCallback) quiteCallback();
      }, 3000);
    }
  }, [isLoading, error]);

  return {
    stampProps: {
      stampName: serializedPlainReaction?.stamp?.name,
      stampUrl: src,
    },
    animate,
  };
};
