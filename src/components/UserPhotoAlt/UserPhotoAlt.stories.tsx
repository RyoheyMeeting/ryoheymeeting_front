import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserPhotoAlt } from "./UserPhotoAlt";

export default {
  title: "components/UserPhotoAlt",
  component: UserPhotoAlt,
} as ComponentMeta<typeof UserPhotoAlt>;

const Template: ComponentStory<typeof UserPhotoAlt> = (args) => <UserPhotoAlt {...args} />;

export const Default = Template.bind({});
Default.args = {
  userName: "遼平",
  size: "256px",
};

export const Alphabet = Template.bind({});
Alphabet.args = {
  userName: "John",
  size: "36px",
};

export const Noname = Template.bind({});
Noname.args = {
  userName: "",
  size: "36px",
};
