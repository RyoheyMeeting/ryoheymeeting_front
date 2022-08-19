import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconText } from "./IconText";
import { Home } from "components/icons";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "components/IconText",
  component: IconText,
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = (args) => (
  // Linkタグを使用しているのでBrowserRouterで囲う
  <BrowserRouter>
    <IconText {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  to: "#",
  Icon: Home,
  text: "ホーム",
  status: "Default",
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  status: "Active",
};
