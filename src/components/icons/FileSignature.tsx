import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const FileSignature: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/file_signature.svg`} {...props} />;
};

export default FileSignature;
