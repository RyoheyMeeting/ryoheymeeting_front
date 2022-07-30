import { useMemo } from "react";

export type IResponse = {
  durationTime: string;
  isAnimate: boolean;
};

export const useNextPresenterState = (introduction: string): IResponse => {
  const introductionLength = useMemo(() => {
    let length = 0;
    for (var i = 0; i < introduction.length; i++) {
      length += introduction[i].match(/[ -~]/) ? 1 : 2;
    }
    return length;
  }, [introduction]);

  return {
    durationTime: `${(introductionLength - 24) / 3 > 5 ? (introductionLength - 24) / 3 : 5}s`,
    isAnimate: introductionLength > 24,
  };
};
