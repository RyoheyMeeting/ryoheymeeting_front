import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const VpnKey: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/vpn_key.svg`} {...props} />;
};

export default VpnKey;
