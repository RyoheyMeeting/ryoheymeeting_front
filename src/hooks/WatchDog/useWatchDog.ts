import { useState, useEffect } from "react";

export type WatchDogType = {
  enabled: boolean;
  /** イベント発生時間（絶対日付） */
  eventTime: Date;
  /** イベント関数 */
  eventFunc: () => void;
};

type HookType = (props: WatchDogType) => void;

export const useWatchDog: HookType = ({ enabled, eventTime, eventFunc }) => {
  const [timeoutId, setTimeoutId] = useState<number>();

  useEffect(() => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }

    if (!enabled) return;

    const timer = eventTime.getTime() - new Date().getTime();

    if (timer < 0) return;

    const id = window.setTimeout(eventFunc, timer);
    setTimeoutId(id);
  }, [enabled]);
};
