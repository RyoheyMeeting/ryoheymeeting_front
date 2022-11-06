import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const UserAlt: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/user_alt.svg`} {...props} />;
};

export default UserAlt;
