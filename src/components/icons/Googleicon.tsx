import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Googleicon: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/googleicon.svg`} {...props} />;
};

export default Googleicon;
