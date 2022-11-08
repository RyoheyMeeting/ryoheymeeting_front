import { TitlePlate } from "components/TitlePlate/TitlePlate";
import React from "react";
import { TileBackStyle, TileBackStyleProps } from "./TileBackStyle";

type Props = TileBackStyleProps & {
  type: "default" | "onlyBottom";
  title?: string;
};

export const TileBack: React.FC<Props> = ({ type, title, children, ...styleProps }) => {
  return (
    <TileBackStyle {...styleProps}>
      <div className="tileback_main">
        {type !== "onlyBottom" && <img src="/img/tileback_upper_left.png" className="tileback_upper_left" />}
        {title && (
          <div className="tileback_wrapper_plate">
            <TitlePlate title={title} />
          </div>
        )}
        <img src="/img/tileback_lower_right.png" className="tileback_lower_right" />
      </div>
      <div className="titleback_child">{children}</div>
    </TileBackStyle>
  );
};
