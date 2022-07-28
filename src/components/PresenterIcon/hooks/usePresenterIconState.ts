import { useMemo } from "react";
import { clamp, max } from "Utils/funcs";

export type IResponse = {
  storkeDashoffset: number;
  remainTime: Date;
};

export const usePresenterIconState = (maxTime: Date, time: Date): IResponse => {
  const storkeDashoffset = useMemo(() => {
    if (maxTime.getTime() != 0) {
      return clamp(time.getTime() / maxTime.getTime()) * 302;
    }
    return 0;
  }, [maxTime, time]);

  const remainTime = useMemo(() => {
    const date = new Date();
    date.setTime(max(maxTime.getTime() - time.getTime(), 0));
    return date;
  }, [maxTime, time]);

  return {
    storkeDashoffset,
    remainTime,
  };
};
