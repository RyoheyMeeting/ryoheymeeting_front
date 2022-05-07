import React, { ComponentProps } from "react";
import { IconPrototype, IconsDir } from "./components/IconPrototype/IconPrototype";

type Props = Omit<ComponentProps<typeof IconPrototype>, "filename">;

const ShoppingCart: React.FC<Props> = ({ ...props }) => {
  return <IconPrototype filename={`${IconsDir()}/shopping_cart.svg`} {...props} />;
};

export default ShoppingCart;
