import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Psycho: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/psycho.svg`} {...props} />;
};

export default Psycho;
