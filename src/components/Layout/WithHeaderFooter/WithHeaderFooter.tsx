import React from "react";
import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { Portal } from "components/Portal/Portal";
import { SideMenu } from "components/SideMenu/SideMenu";
import { UserMenu } from "components/UserMenu/UserMenu";
import { useHeaderState } from "./hooks/useHeaderState";
import {
  ContentWrapper,
  HeaderWrapper,
  Overlay,
  UserMenuWrapper,
  WithHeaderFooterStyle,
} from "./WithHeaderFooterStyle";

type Props = {
  children: React.ReactNode;
};

export const WithHeaderFooter: React.FC<Props> = ({ children }) => {
  const {
    user,
    isLogin,
    logoutBtnHandler,
    isOpenSideMenu,
    toggleSideMenuHandler,
    closeSideMenuHandler,
    isOpenUserMenu,
    toggleUserMenuHandler,
    closeUserMenuHandler,
  } = useHeaderState();
  return (
    <WithHeaderFooterStyle>
      <ContentWrapper>
        <div className="layout_wrapper_main">{children}</div>
        <Footer />
      </ContentWrapper>

      <HeaderWrapper isOpen={isOpenSideMenu}>
        <Header
          user={isLogin ? user : undefined}
          onClickMenu={toggleSideMenuHandler}
          onClickUserMenu={toggleUserMenuHandler}
        />
        <Overlay isOpen={isOpenSideMenu} onClick={closeSideMenuHandler} />
        <SideMenu user={isLogin ? user : undefined} />
      </HeaderWrapper>

      <Portal>
        <UserMenuWrapper isOpen={isOpenUserMenu} onMouseLeave={closeUserMenuHandler} onClick={closeUserMenuHandler}>
          <UserMenu
            userIconProps={{
              userName: user?.displayName,
              iconUrl: user?.photoURL,
            }}
            onClickLogout={logoutBtnHandler}
          />
        </UserMenuWrapper>
      </Portal>
    </WithHeaderFooterStyle>
  );
};
