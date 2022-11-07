import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserMenu } from "./UserMenu";
import { testCommonUser } from "test_factories/User";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "components/UserMenu",
  component: UserMenu,
} as ComponentMeta<typeof UserMenu>;

const Template: ComponentStory<typeof UserMenu> = (args) => (
  <BrowserRouter>
    <UserMenu {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  userIconProps: {
    userName: testCommonUser.displayName,
    iconUrl: testCommonUser.photoURL,
  },
};
