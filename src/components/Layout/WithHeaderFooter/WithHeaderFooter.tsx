import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import React from "react";
import { BaseLayout } from "../BaseLayout/BaseLayout";
import { useHeaderState } from "./hooks/useHeaderState";

type Props = {
  children: React.ReactNode;
};

export const WithHeaderFooter: React.FC<Props> = ({ children }) => {
  const { user, isLogin } = useHeaderState();
  return (
    <BaseLayout>
      <Header user={isLogin ? user : undefined} />
      {children}
      <Footer />
    </BaseLayout>
  );
};
