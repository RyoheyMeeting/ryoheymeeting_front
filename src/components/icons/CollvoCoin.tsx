import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const CollvoCoin: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/collvo_coin.svg`} {...props} />;
};

export default CollvoCoin;
