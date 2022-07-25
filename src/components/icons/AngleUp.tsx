import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const AngleUp: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/angle_up.svg`} {...props} />;
};

export default AngleUp;
