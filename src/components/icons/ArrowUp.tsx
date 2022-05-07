import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const ArrowUp: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/arrow_up.svg`} {...props} />;
};

export default ArrowUp;
