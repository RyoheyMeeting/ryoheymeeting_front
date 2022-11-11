import { EditableResourceRequire, useResourceListState } from "hooks/ResourceList/useResourceListState";
import { generateId, StampType } from "services/StampTypes/StampTypes";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  stampTypes: Dict<EditableResourceRequire>;
  stampTypeSortedKeys: string[];
  addStampTypeBtnHandler: () => void;
  removeListener: (id: string) => void;
  toOld: (id: string) => void;
};

export const useStampTypeListState = (): IResponse => {
  const { resources, resourceSortedKeys, addResourceBtnHandler, removeListener, toOld } =
    useResourceListState<StampType>(generateId, (state: RootState) => state.stampTypes.stampTypes);

  return {
    stampTypes: resources,
    stampTypeSortedKeys: resourceSortedKeys,
    addStampTypeBtnHandler: addResourceBtnHandler,
    removeListener,
    toOld,
  };
};
