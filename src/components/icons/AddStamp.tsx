import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const AddStamp: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/add_stamp.svg`} {...props} />;
};

export default AddStamp;
