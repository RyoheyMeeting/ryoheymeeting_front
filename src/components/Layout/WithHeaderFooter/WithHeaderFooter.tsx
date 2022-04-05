import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import React from "react";
import { BaseLayout } from "../BaseLayout/BaseLayout";

type Props = {
  children: React.ReactNode;
};

export const WithHeaderFooter: React.FC<Props> = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      {children}
      <Footer />
    </BaseLayout>
  );
};
