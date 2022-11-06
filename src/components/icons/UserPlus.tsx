import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const UserPlus: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/user_plus.svg`} {...props} />;
};

export default UserPlus;
