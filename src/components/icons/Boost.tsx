import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Boost: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/boost.svg`} {...props} />;
};

export default Boost;
