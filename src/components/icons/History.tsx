import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const History: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/history.svg`} {...props} />;
};

export default History;
