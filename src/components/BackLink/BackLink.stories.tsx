import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BackLink } from "./BackLink";

export default {
  title: "components/BackLink",
  component: BackLink,
} as ComponentMeta<typeof BackLink>;

const Template: ComponentStory<typeof BackLink> = (args) => <BackLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "white",
  href: "#",
};
