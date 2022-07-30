import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const File: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/file.svg`} {...props} />;
};

export default File;
