import { Stamp } from "components/Stamp/Stamp";
import { ComponentProps, useCallback } from "react";

export type IResponse = {
  showStamp: (type: "psycho" | "wait" | "good", stamp: ComponentProps<typeof Stamp>) => void;
};

export const useReactionMeterState = (): IResponse => {
  const showStamp = useCallback(() => {}, []);

  return {
    showStamp,
  };
};
