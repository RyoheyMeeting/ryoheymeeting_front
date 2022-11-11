import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reloadGrandPrixesAsync } from "services/GrandPrixes/GrandPrixes";
import { reloadModerateSoundsAsync } from "services/ModerateSounds/ModerateSounds";
import { reloadStampsAsync } from "services/Stamps/Stamps";
import { reloadStampTypesAsync } from "services/StampTypes/StampTypes";
import { reloadUserDataAsync } from "services/User/User";

export type IResponse = {
  reload: () => void;
};

export const useSetup = (): IResponse => {
  const dispatch = useDispatch();

  useEffect(() => {
    _reload();
  }, []);

  const _reload = () => {
    dispatch(reloadUserDataAsync());
    dispatch(reloadStampsAsync());
    dispatch(reloadStampTypesAsync());
    dispatch(reloadGrandPrixesAsync());
    dispatch(reloadModerateSoundsAsync());
  };

  return {
    reload: _reload,
  };
};
