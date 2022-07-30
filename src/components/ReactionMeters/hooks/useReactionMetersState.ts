import { ReactionMeterHandler } from "components/ReactionMeter/hooks/useReactionMeterState";
import { RefObject, useCallback, useRef } from "react";

export interface ReactionMetersHandler {
  showStamp: (type?: string, plainReactionId?: string) => void;
}

export type IResponse = {
  showStamp: ReactionMetersHandler["showStamp"];
  psychoReactionMeterRef: RefObject<ReactionMeterHandler>;
  waitReactionMeterRef: RefObject<ReactionMeterHandler>;
  goodReactionMeterRef: RefObject<ReactionMeterHandler>;
};

export const useReactionMetersState = (): IResponse => {
  const psychoReactionMeterRef = useRef<ReactionMeterHandler>(null);
  const waitReactionMeterRef = useRef<ReactionMeterHandler>(null);
  const goodReactionMeterRef = useRef<ReactionMeterHandler>(null);

  const showStamp: ReactionMetersHandler["showStamp"] = useCallback((type, plainReactionId) => {
    switch (type) {
      case "psycho":
        psychoReactionMeterRef.current?.showStamp(plainReactionId);
        break;
      case "wait":
        waitReactionMeterRef.current?.showStamp(plainReactionId);
        break;
      case "good":
        goodReactionMeterRef.current?.showStamp(plainReactionId);
        break;
    }
  }, []);

  return {
    showStamp,
    psychoReactionMeterRef,
    waitReactionMeterRef,
    goodReactionMeterRef,
  };
};
