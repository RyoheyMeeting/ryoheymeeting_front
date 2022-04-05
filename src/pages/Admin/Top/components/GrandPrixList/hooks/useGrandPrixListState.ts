import { EditableResourceRequire, useResourceListState } from "hooks/ResourceList/useResourceListState";
import { generateGrandPrixId, GrandPrix } from "services/GrandPrixes/GrandPrixes";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  grandPrixes: Dict<EditableResourceRequire>;
  grandPrixSortedKeys: string[];
  addGrandPrixBtnHandler: () => void;
  removeListener: (id: string) => void;
};

export const useGrandPrixListState = (): IResponse => {
  const { resources, resourceSortedKeys, addResourceBtnHandler, removeListener } = useResourceListState<GrandPrix>(
    generateGrandPrixId,
    (state: RootState) => state.grandPrixes.grandPrixes
  );

  return {
    grandPrixes: resources,
    grandPrixSortedKeys: resourceSortedKeys,
    addGrandPrixBtnHandler: addResourceBtnHandler,
    removeListener: removeListener,
  };
};
