import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Psyco: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/psyco.svg`} {...props} />;
};

export default Psyco;
