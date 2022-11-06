import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const CalendarAlt: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/calendar_alt.svg`} {...props} />;
};

export default CalendarAlt;
