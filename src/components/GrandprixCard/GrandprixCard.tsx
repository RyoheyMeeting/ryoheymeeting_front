import React, { useMemo } from "react";
import { GrandPrix } from "services/GrandPrixes/GrandPrixes";
import { dateToFormat } from "Utils/funcs";
import { GrandprixStatusTag } from "../GrandprixStatusTag/GrandprixStatusTag";
import { GrandprixCardStyle, IconFullStyle } from "./GrandprixCardStyle";

type Props = {
  title: string;
  subTitle: string;
  date: Date;
  status: GrandPrix["status"];
};

export const GrandprixCard: React.FC<Props> = ({ title, subTitle, date, status }) => {
  const dateStr = useMemo(() => dateToFormat(date, "Y/M/D"), [date]);

  return (
    <GrandprixCardStyle status={status}>
      <div className="grandprixcard_logo">
        <IconFullStyle src="/img/logo_full.svg" wrapper="svg" />
      </div>
      <div className="grandprixcard_main">
        <span className="grandprixcard_title">{title}</span>
        <span className="grandprixcard_subtitle">{subTitle}</span>
        <span className="grandprixcard_date">{dateStr} 開催</span>
      </div>
      <GrandprixStatusTag status={status} />
      <div className="grandprixcard_border" />
    </GrandprixCardStyle>
  );
};
