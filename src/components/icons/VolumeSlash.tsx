import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const VolumeSlash: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/volume_slash.svg`} {...props} />;
};

export default VolumeSlash;
