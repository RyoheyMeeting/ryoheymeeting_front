import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const PresentationLayout: React.FC<Props> = ({ children }) => {
  return <PresentationLayoutStyle>{children}</PresentationLayoutStyle>;
};

const PresentationLayoutStyle = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.presentation.bg};
  color: ${({ theme }) => theme.global.negative};
`;
