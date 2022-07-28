import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const ReactionLayout: React.FC<Props> = ({ children }) => {
  return <ReactionLayoutStyle>{children}</ReactionLayoutStyle>;
};

const ReactionLayoutStyle = styled.div`
  display: inline-block;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(/img/reactionlayout_bg.png);
  background-repeat: repeat;
  background-size: 80px;
`;
