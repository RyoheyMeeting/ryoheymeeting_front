import { useEffect } from "react";

export type IResponse = {};

export const useBlinkStampState = (quiteCallback?: () => void): IResponse => {
  useEffect(() => {
    setTimeout(() => {
      if (quiteCallback) quiteCallback();
    }, 2100);
  }, []);

  return {};
};
