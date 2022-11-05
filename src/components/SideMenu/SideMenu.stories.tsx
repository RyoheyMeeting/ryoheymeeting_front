import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideMenu } from "./SideMenu";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "components/SideMenu",
  component: SideMenu,
} as ComponentMeta<typeof SideMenu>;

const Template: ComponentStory<typeof SideMenu> = (args) => (
  <BrowserRouter>
    <SideMenu {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {};
