import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAsync, User } from "services/User/User";
import { RootState } from "store";

export type IResponse = {
  isLogin: boolean;
  user?: User;
  logoutBtnHandler: () => void;
};

export const useHeaderState = (): IResponse => {
  const { isLogin, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = () => {
    dispatch(signOutAsync());
    navigate("/");
  };

  return {
    isLogin: isLogin,
    user: user,
    logoutBtnHandler: _logout,
  };
};
