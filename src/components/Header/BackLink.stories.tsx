import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "./Header";
import { HashRouter } from "react-router-dom";
import { testCommonUser } from "test_factories/User";

export default {
  title: "components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <HashRouter>
    <Header {...args} />
  </HashRouter>
);

export const Default = Template.bind({});
Default.args = {
  color: "default",
  fill: "base",
};

export const Login = Template.bind({});
Login.args = {
  ...Default.args,
  user: testCommonUser,
  color: "white",
};
