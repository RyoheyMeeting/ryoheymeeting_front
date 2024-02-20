import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dict } from "Types/Utils";
import { RootState } from "store";
import { loadModerateSoundUrl, ModerateSound } from "services/ModerateSounds/ModerateSounds";

export type IResponse = {
  moderateSounds: Dict<ModerateSound>;
  groupedModerateSoundIds: {
    start: string[];
    remain5: string[];
    finish: string[];
  };
  loadUrl: (moderateSoundId: string) => Promise<void>;
};

export const useModerateSound = (): IResponse => {
  const { moderateSounds } = useSelector((state: RootState) => state.moderateSounds);
  const dispatch = useDispatch();

  const filterByType = useCallback((moderateSounds: Dict<ModerateSound>, type: string) => {
    return Object.keys(moderateSounds).filter((id) => moderateSounds[id].type === type);
  }, []);

  const groupedModerateSoundIds = useMemo(
    () => ({
      start: filterByType(moderateSounds, "start"),
      remain5: filterByType(moderateSounds, "remain5"),
      finish: filterByType(moderateSounds, "finish"),
    }),
    [moderateSounds]
  );

  const loadUrl = useCallback(async (moderateSoundId: string) => {
    await dispatch(loadModerateSoundUrl(moderateSoundId));
  }, []);

  return {
    moderateSounds,
    groupedModerateSoundIds,
    loadUrl,
  };
};
