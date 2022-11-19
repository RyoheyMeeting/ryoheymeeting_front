import React, { ComponentProps } from "react";
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
  WithHeaderFooterStyleProps,
} from "./WithHeaderFooterStyle";

type Props = WithHeaderFooterStyleProps & {
  children: React.ReactNode;
  headerProps?: Partial<Pick<ComponentProps<typeof Header>, "color" | "fill">>;
};

export const WithHeaderFooter: React.FC<Props> = ({ children, headerProps, ...styleProps }) => {
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
    <WithHeaderFooterStyle {...styleProps}>
      <ContentWrapper {...styleProps}>
        <div className="layout_wrapper_main">{children}</div>
        <Footer />
      </ContentWrapper>

      <HeaderWrapper isOpen={isOpenSideMenu}>
        <Header
          user={isLogin ? user : undefined}
          onClickMenu={toggleSideMenuHandler}
          onClickUserMenu={toggleUserMenuHandler}
          {...headerProps}
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
