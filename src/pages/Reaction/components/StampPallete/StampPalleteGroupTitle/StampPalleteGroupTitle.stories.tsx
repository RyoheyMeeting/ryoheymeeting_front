import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StampPalleteGroupTitle } from "./StampPalleteGroupTitle";
import { StampPallete } from "../StampPallete";
import { Iine, Psycho } from "components/icons";

export default {
  title: "components/StampPalleteGroupTitle",
  component: StampPalleteGroupTitle,
} as ComponentMeta<typeof StampPalleteGroupTitle>;

const Template: ComponentStory<typeof StampPalleteGroupTitle> = (args) => (
  <StampPallete>
    <StampPalleteGroupTitle {...args} />
  </StampPallete>
);

export const Default = Template.bind({});
Default.args = {
  Icon: Psycho,
  title: "Psycho",
};

export const Good = Template.bind({});
Good.args = {
  Icon: Iine,
  title: "Good",
};
