import { useMemo, useCallback, useState } from "react";

export type IResponse = {
  playSound: (soundUrl?: string) => void;
  changeVolume: (volume: number) => void;
};

export const usePlaySound = (): IResponse => {
  const audio = useMemo(() => new Audio(), []);
  const [volume, setVolume] = useState(1);

  const playSound = useCallback(
    (soundUrl?: string) => {
      console.log(soundUrl);
      if (audio && soundUrl) {
        audio.src = soundUrl;
        audio.volume = volume;
        audio.play();
      }
    },
    [audio, volume]
  );

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume < 0 ? 0 : newVolume > 1 ? 1 : newVolume);
  }, []);

  return {
    playSound,
    changeVolume,
  };
};
