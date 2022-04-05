import { useDispatch, useSelector } from "react-redux";
import { reloadUserDataAsync, User } from "services/User/User";
import { RootState } from "store";

export type IResponse = {
  data?: User;
  reload: () => void;
};

export const useUserAPI = (): IResponse => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const _reload = () => {
    dispatch(reloadUserDataAsync());
  };

  return {
    data: user.user,
    reload: _reload,
  };
};
