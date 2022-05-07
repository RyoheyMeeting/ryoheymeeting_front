import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const VolumeUp: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/volume_up.svg`} {...props} />;
};

export default VolumeUp;
