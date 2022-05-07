import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Question: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/question.svg`} {...props} />;
};

export default Question;
