import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const UserCog: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/user_cog.svg`} {...props} />;
};

export default UserCog;
