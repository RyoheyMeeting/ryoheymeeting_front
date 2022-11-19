import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Plus: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/plus.svg`} {...props} />;
};

export default Plus;
