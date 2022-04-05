import { useUserAPI } from "hooks/UserAPI/useUserAPI";
import { useDispatch } from "react-redux";
import { signOutAsync, User } from "services/User/User";

export type IResponse = {
  user?: User;
  logoutBtnClickedHandler: () => void;
};

export const useUserTopState = (): IResponse => {
  const { data } = useUserAPI();
  const dispatch = useDispatch();

  const _logoutBtnClickedHandler = () => {
    dispatch(signOutAsync());
  };

  return {
    user: data,
    logoutBtnClickedHandler: _logoutBtnClickedHandler,
  };
};
