import { useCallback, useEffect, useState } from "react";

export type UseTimerProps = {
  maxTime: Date;
  startTime?: Date;
};

export type IResponse = {
  remainTime: Date;
};

type HookType = (props: UseTimerProps) => IResponse;

export const useTimer: HookType = ({ maxTime, startTime }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | undefined>();
  const [remainTime, setRemainTime] = useState<Date>(maxTime);

  // タイマー再生関数
  const startTimer = useCallback(() => {
    if (!maxTime || !startTime) return;

    setTimerId(
      setInterval(() => {
        const _maxTime = maxTime.getTime();
        const _diff = new Date().getTime() - startTime.getTime();

        const _remainTime = _maxTime - _diff;

        // 時間をClamp
        if (_remainTime > _maxTime) {
          setRemainTime(maxTime);
        } else if (_remainTime < 0) {
          setRemainTime(new Date(0));
        } else {
          setRemainTime(new Date(_remainTime));
        }
      }, 1000)
    );
  }, [maxTime, startTime]);

  // タイマーストップ関数
  const stopTimer = useCallback(() => {
    setTimerId((_timerId) => {
      if (_timerId) clearInterval(_timerId);
      return undefined;
    });
  }, [setTimerId]);

  // タイマーを開始
  useEffect(() => {
    stopTimer();
    setRemainTime(maxTime);
    if (startTime) {
      startTimer();
    }
  }, [startTime]);

  return {
    remainTime,
  };
};
