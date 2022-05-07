import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const SignOut: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/sign_out.svg`} {...props} />;
};

export default SignOut;
