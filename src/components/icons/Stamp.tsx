import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Stamp: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/stamp.svg`} {...props} />;
};

export default Stamp;
