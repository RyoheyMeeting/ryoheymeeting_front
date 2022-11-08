import React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export const Portal: React.FC<Props> = ({ children }) => {
  const portalElem = document.getElementById("portal");

  if (!portalElem) {
    console.error("Portal Element is not found.");
    return <></>;
  }

  return createPortal(children, portalElem);
};
