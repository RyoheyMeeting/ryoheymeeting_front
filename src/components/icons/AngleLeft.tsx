import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const AngleLeft: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/angle_left.svg`} {...props} />;
};

export default AngleLeft;
