import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Cog: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/cog.svg`} {...props} />;
};

export default Cog;
