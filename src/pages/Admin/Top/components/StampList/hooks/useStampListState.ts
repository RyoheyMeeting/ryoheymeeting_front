import { EditableResourceRequire, useResourceListState } from "hooks/ResourceList/useResourceListState";
import { generateId, Stamp } from "services/Stamps/Stamps";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  stamps: Dict<EditableResourceRequire>;
  stampSortedKeys: string[];
  addStampBtnHandler: () => void;
  removeListener: (id: string) => void;
};

export const useStampListState = (): IResponse => {
  const { resources, resourceSortedKeys, addResourceBtnHandler, removeListener } = useResourceListState<Stamp>(
    generateId,
    (state: RootState) => state.stamps.stamps
  );

  return {
    stamps: resources,
    stampSortedKeys: resourceSortedKeys,
    addStampBtnHandler: addResourceBtnHandler,
    removeListener: removeListener,
  };
};
