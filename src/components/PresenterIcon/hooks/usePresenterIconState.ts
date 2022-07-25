import { useMemo } from "react";
import { clamp } from "Utils/funcs";

export type IResponse = {
  storkeDashoffset: number;
};

export const usePresenterIconState = (maxTime: Date, time: Date): IResponse => {
  const storkeDashoffset = useMemo(() => {
    if (maxTime.getTime() != 0) {
      return clamp(time.getTime() / maxTime.getTime()) * 302;
    }
    return 0;
  }, [maxTime, time]);

  return {
    storkeDashoffset,
  };
};
