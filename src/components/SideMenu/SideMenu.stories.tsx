import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideMenu } from "./SideMenu";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

export default {
  title: "components/SideMenu",
  component: SideMenu,
} as ComponentMeta<typeof SideMenu>;

const Wrapper = styled.div`
  height: 100vh;
`;

const Template: ComponentStory<typeof SideMenu> = (args) => (
  <BrowserRouter>
    <Wrapper>
      <SideMenu {...args} />
    </Wrapper>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {};
