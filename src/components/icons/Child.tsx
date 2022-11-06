import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Child: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/child.svg`} {...props} />;
};

export default Child;
