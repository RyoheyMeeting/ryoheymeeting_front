import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Trash: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/trash.svg`} {...props} />;
};

export default Trash;
