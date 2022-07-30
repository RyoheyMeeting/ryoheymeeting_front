import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return <BaseLayoutStyle>{children}</BaseLayoutStyle>;
};

const BaseLayoutStyle = styled.div``;
