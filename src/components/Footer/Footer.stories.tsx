import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Footer } from "./Footer";
import { HashRouter } from "react-router-dom";

export default {
  title: "components/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => (
  <HashRouter>
    <Footer {...args} />
  </HashRouter>
);

export const Default = Template.bind({});
Default.args = {};
