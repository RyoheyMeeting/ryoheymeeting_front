import { EditableResourceRequire, useResourceListState } from "hooks/ResourceList/useResourceListState";
import { generateModerateSoundId, ModerateSound } from "services/ModerateSounds/ModerateSounds";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  moderateSounds: Dict<EditableResourceRequire>;
  moderateSoundSortedKeys: string[];
  addModerateSoundBtnHandler: () => void;
  removeListener: (id: string) => void;
  toOld: (id: string) => void;
};

export const useModerateSoundListState = (): IResponse => {
  const { resources, resourceSortedKeys, addResourceBtnHandler, removeListener, toOld } =
    useResourceListState<ModerateSound>(
      generateModerateSoundId,
      (state: RootState) => state.moderateSounds.moderateSounds
    );

  return {
    moderateSounds: resources,
    moderateSoundSortedKeys: resourceSortedKeys,
    addModerateSoundBtnHandler: addResourceBtnHandler,
    removeListener,
    toOld,
  };
};
