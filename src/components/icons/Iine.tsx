import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Iine: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/iine.svg`} {...props} />;
};

export default Iine;
