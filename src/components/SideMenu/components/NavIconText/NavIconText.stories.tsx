import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NavIconText } from "./NavIconText";
import { Home } from "components/icons";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "components/NavIconText",
  component: NavIconText,
} as ComponentMeta<typeof NavIconText>;

const Template: ComponentStory<typeof NavIconText> = (args) => (
  // Linkタグを使用しているのでBrowserRouterで囲う
  <BrowserRouter>
    <NavIconText {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  to: "#",
  Icon: Home,
  text: "ホーム",
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
};
