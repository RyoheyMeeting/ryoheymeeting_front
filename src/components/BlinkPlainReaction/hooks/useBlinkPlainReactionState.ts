import { Stamp } from "components/Stamp/Stamp";
import { usePlainReactionSerializer } from "hooks/RealtimeGrandPrix/serializers/usePlainReactionSerializer";
import { ComponentProps, useEffect, useMemo, useState } from "react";

export type IResponse = {
  stampProps: ComponentProps<typeof Stamp>;
  animate: boolean;
};

export const useBlinkPlainReactionState = (
  plainReactionId: string,
  playSoundEffect: boolean,
  quiteCallback?: () => void
): IResponse => {
  const { serializedPlainReaction } = usePlainReactionSerializer(plainReactionId);
  const [animate, setAnimate] = useState(false);
  const sound = useMemo(
    () => new Audio(serializedPlainReaction?.stamp?.soundDataUrl),
    [serializedPlainReaction?.stamp?.soundDataUrl]
  );

  useEffect(() => {
    if (!animate && !serializedPlainReaction?.stamp?.loadingResource) {
      if (playSoundEffect) sound.play();
      setAnimate(true);
      setTimeout(() => {
        if (quiteCallback) quiteCallback();
      }, 3000);
    }
  }, [serializedPlainReaction?.stamp?.loadingResource]);

  return {
    stampProps: {
      stampName: serializedPlainReaction?.stamp?.name,
      stampUrl: serializedPlainReaction?.stamp?.imageDataUrl,
    },
    animate,
  };
};
