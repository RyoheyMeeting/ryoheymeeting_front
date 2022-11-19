import React, { MouseEventHandler } from "react";
import styled from "styled-components";

type Props = {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Buttonate: React.FC<Props> = ({ onClick, disabled, children }) => {
  return (
    <ButtonStyle onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  display: flex;
`;
