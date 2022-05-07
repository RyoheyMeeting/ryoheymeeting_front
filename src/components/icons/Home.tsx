import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const Home: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/home.svg`} {...props} />;
};

export default Home;
