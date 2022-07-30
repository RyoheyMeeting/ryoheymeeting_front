import { useTimer, UseTimerProps } from "hooks/Timer/useTimer";
import { useMemo } from "react";
import { clamp } from "Utils/funcs";

export type IResponse = {
  storkeDashoffset: number;
  remainTime: Date;
};

export const usePresenterIconState = (timerProps: UseTimerProps): IResponse => {
  const { remainTime } = useTimer(timerProps);
  const storkeDashoffset = useMemo(() => {
    const _maxTime = timerProps.maxTime.getTime();
    const _remainTime = remainTime.getTime();
    if (_maxTime != 0) {
      return clamp((_maxTime - _remainTime) / _maxTime) * 302;
    }
    return 0;
  }, [remainTime, timerProps]);

  return {
    storkeDashoffset,
    remainTime,
  };
};
