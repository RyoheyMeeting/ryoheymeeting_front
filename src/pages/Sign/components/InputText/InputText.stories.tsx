import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InputText } from "./InputText";
import { VpnKey } from "components/icons";

export default {
  title: "components/Sign/InputText",
  component: InputText,
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Password",
  Icon: VpnKey,
};

export const Written = Template.bind({});
Written.args = {
  ...Default.args,
  value: "hoge",
};
