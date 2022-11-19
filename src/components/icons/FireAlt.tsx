import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const FireAlt: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/fire_alt.svg`} {...props} />;
};

export default FireAlt;
