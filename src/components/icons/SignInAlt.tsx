import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const SignInAlt: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/sign_in_alt.svg`} {...props} />;
};

export default SignInAlt;
