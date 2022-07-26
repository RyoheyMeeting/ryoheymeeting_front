import { Stamp } from "components/Stamp/Stamp";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import { BlinkStamp } from "../components/BlinkStamp/BlinkStamp";

export type IResponse = {
  strokeDashoffset: number;
  showStamp: (stamp: ComponentProps<typeof Stamp>) => void;
  blinkStamps: { [key: string]: ComponentProps<typeof BlinkStamp> };
};

export const useReactionMeterState = (): IResponse => {
  const [blinkStamps] = useState<{ [key: string]: ComponentProps<typeof BlinkStamp> }>({});

  const strokeDashoffset = useMemo(() => {
    const start = 302;
    const end = 101;
    return start - 0.5 * (start - end);
  }, []);

  const showStamp = useCallback(() => {}, []);

  return {
    strokeDashoffset,
    showStamp,
    blinkStamps,
  };
};
