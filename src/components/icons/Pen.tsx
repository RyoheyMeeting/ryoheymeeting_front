import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Pen: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/pen.svg`} {...props} />;
};

export default Pen;
