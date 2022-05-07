import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Mute: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/mute.svg`} {...props} />;
};

export default Mute;
