import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Equals: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/equals.svg`} {...props} />;
};

export default Equals;
