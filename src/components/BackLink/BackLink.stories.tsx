import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BackLink } from "./BackLink";
import { HashRouter } from "react-router-dom";

export default {
  title: "components/BackLink",
  component: BackLink,
} as ComponentMeta<typeof BackLink>;

const Template: ComponentStory<typeof BackLink> = (args) => (
  <HashRouter>
    <BackLink {...args} />
  </HashRouter>
);

export const Default = Template.bind({});
Default.args = {
  color: "white",
  to: "#",
};
