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

        // 残り時間を更新
        setRemainTime(new Date(_maxTime - _diff));
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
    if (startTime) {
      startTimer();
    }
  }, [startTime, stopTimer, startTimer]);

  return {
    remainTime,
  };
};
