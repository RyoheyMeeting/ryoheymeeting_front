import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Footer } from "./Footer";

export default {
  title: "My Story/components/Footer",
  component: Footer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Plain = Template.bind({});
Plain.args = {};
