import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrandPrix, reloadGrandPrixesAsync } from "services/GrandPrixes/GrandPrixes";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  grandPrixes: Dict<GrandPrix>;
  sortedKeys: string[];
};

export const useGrandPrixListState = (): IResponse => {
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reloadGrandPrixesAsync());
  }, []);

  return {
    grandPrixes: grandPrixes,
    sortedKeys: Object.keys(grandPrixes)
      .filter((key) => !grandPrixes[key].isDraft)
      .sort((a, b) => (grandPrixes[a].eventDate > grandPrixes[b].eventDate ? -1 : 1)),
  };
};
