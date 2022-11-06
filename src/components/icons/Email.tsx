import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Email: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/email.svg`} {...props} />;
};

export default Email;
