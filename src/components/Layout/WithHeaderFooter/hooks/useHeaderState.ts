import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAsync } from "services/User/User";
import { RootState } from "store";

export const useHeaderState = () => {
  const { isLogin, user } = useSelector((state: RootState) => state.user);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSideMenuHandler = useCallback(() => {
    setIsOpenSideMenu((current) => !current);
  }, []);

  const closeSideMenuHandler = useCallback(() => {
    setIsOpenSideMenu(false);
  }, []);

  const toggleUserMenuHandler = useCallback(() => {
    setIsOpenUserMenu((current) => !current);
  }, []);

  const closeUserMenuHandler = useCallback(() => {
    setIsOpenUserMenu(false);
  }, []);

  const logoutBtnHandler = () => {
    dispatch(signOutAsync());
    navigate("/");
  };

  return {
    isLogin,
    user,
    logoutBtnHandler,
    isOpenSideMenu,
    toggleSideMenuHandler,
    closeSideMenuHandler,
    isOpenUserMenu,
    toggleUserMenuHandler,
    closeUserMenuHandler,
  };
};
