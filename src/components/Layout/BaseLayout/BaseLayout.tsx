import React from "react";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
