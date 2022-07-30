import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export type IResponse = {
  psychoStampKeys: string[];
  waitStampKeys: string[];
  goodStampKeys: string[];
};

export const useStampsGroupByType = (): IResponse => {
  const { stamps } = useSelector((state: RootState) => state.stamps);
  const { stampTypes } = useSelector((state: RootState) => state.stampTypes);

  const psychoStampKeys = useMemo(
    () => Object.keys(stamps).filter((key) => stampTypes[stamps[key].typeId].name == "psycho"),
    [stamps, stampTypes]
  );

  const waitStampKeys = useMemo(
    () => Object.keys(stamps).filter((key) => stampTypes[stamps[key].typeId].name == "wait"),
    [stamps, stampTypes]
  );

  const goodStampKeys = useMemo(
    () => Object.keys(stamps).filter((key) => stampTypes[stamps[key].typeId].name == "good"),
    [stamps, stampTypes]
  );

  return {
    psychoStampKeys,
    waitStampKeys,
    goodStampKeys,
  };
};
