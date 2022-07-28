import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StampType } from "services/StampTypes/StampTypes";
import { RootState } from "store";

export type SerializedStampType = StampType;

export type IResponse = {
  serializedStampType?: SerializedStampType;
};

/**
 * StampTypeをシリアライズする
 * @param stampTypeId StampTypeID
 * @returns シリアライズされたStampType
 */
export const useStampTypeSerializer = (stampTypeId?: string): IResponse => {
  const { stampTypes } = useSelector((state: RootState) => state.stampTypes);
  const stampType = useMemo(() => {
    if (stampTypeId && stampTypes[stampTypeId]) return stampTypes[stampTypeId];
    else return undefined;
  }, [stampTypeId, stampTypes]);

  return {
    serializedStampType: stampType,
  };
};
