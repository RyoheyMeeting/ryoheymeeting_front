import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const LogoContent: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/logo_content.svg`} {...props} />;
};

export default LogoContent;
