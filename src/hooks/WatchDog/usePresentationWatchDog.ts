import { useEffect } from "react";
import { ModerateSound } from "services/ModerateSounds/ModerateSounds";
import { useWatchDog } from "./useWatchDog";

export type WatchDogType = {
  startTime?: Date;
  maxTime: Date;
  /** イベント発生時間（絶対日付） */
  eventTimePattern: ModerateSound["type"];
  /** イベント関数 */
  eventFunc: () => void;
};

type HookType = (props: WatchDogType) => void;

export const usePresentationWatchDog: HookType = ({ startTime, maxTime, eventTimePattern, eventFunc }) => {
  const eventTime = new Date(
    startTime ? maxTime.getTime() + startTime.getTime() - (eventTimePattern === "remain5" ? 5 * 60 * 1000 : 0) : 0
  );

  useWatchDog({
    enabled: !!startTime && eventTimePattern !== "start",
    eventTime,
    eventFunc,
  });

  useEffect(() => {
    if (!!startTime && eventTimePattern === "start") {
      eventFunc();
    }
  }, [startTime]);
};
