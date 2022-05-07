import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const ChessKing: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/chess_king.svg`} {...props} />;
};

export default ChessKing;
