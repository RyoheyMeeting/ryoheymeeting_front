import React from "react";
import { Link } from "react-router-dom";
import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import { useGrandPrixListState } from "./hooks/useGrandPrixListState";
import { TileBack } from "components/TileBack/TileBack";
import { GrandprixCard } from "components/GrandprixCard/GrandprixCard";
import { GrandPrixListStyle } from "./GrandPrixListStyle";

type Props = {};

export const GrandPrixList: React.FC<Props> = () => {
  const { grandPrixes, sortedKeys } = useGrandPrixListState();
  return (
    <WithHeaderFooter>
      <TileBack type="default" title="プロジェクト一覧" useHeadPadding={true}>
        <GrandPrixListStyle>
          <div className="grandprixlist_wrapper">
            {sortedKeys.map((key) => (
              <Link key={key} to={`/grandprix/${key}/`} className="grandprixlist_card">
                <GrandprixCard
                  title={`第${grandPrixes[key].number}回  遼平会`}
                  subTitle={grandPrixes[key].subtitle}
                  date={grandPrixes[key].eventDate}
                  status={grandPrixes[key].status}
                />
              </Link>
            ))}
          </div>
        </GrandPrixListStyle>
      </TileBack>
    </WithHeaderFooter>
  );
};
