import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Bars: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/bars.svg`} {...props} />;
};

export default Bars;
