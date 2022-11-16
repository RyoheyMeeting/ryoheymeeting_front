import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRole } from "services/User/User";
import { GrandPrixStatus } from "services/GrandPrixes/GrandPrixes";
import { dateToFormat } from "Utils/funcs";
import { Button } from "components/Button/Button";
import { AngleLeft, Cog } from "components/icons";
import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import { TileBack } from "components/TileBack/TileBack";
import { UserIcon } from "components/UserIcon/UserIcon";
import { GrandPrixStyle, IconFullStyle } from "./GrandPrixStyle";
import { useGrandPrixState } from "./hooks/useGrandPrixState";
import { GrandprixStatusTag } from "components/GrandprixStatusTag/GrandprixStatusTag";

type Props = {};

export const GrandPrix: React.FC<Props> = () => {
  const {
    id,
    error,
    grandPrix,
    presenters,
    sortedPresentersKey,
    isParticipated,
    user,
    participateBtn,
    unparticipateBtn,
  } = useGrandPrixState();
  const navigate = useNavigate();

  if (!grandPrix || error)
    return (
      <WithHeaderFooter>
        情報が存在しません。
        {error}
      </WithHeaderFooter>
    );

  return (
    <WithHeaderFooter
      useHeadPadding={false}
      headerProps={{
        color: "white",
        fill: "orange",
      }}
    >
      <GrandPrixStyle>
        <div className="grandprix_panel_top">
          <div className="grandprix_logo">
            <IconFullStyle src="/img/logo_full.svg" wrapper="svg" />
          </div>
          <div className="grandprix_statustag">
            <GrandprixStatusTag status={grandPrix.status} />
          </div>
          <Link to="/grandprixlist/" className="grandprix_backlink">
            <AngleLeft className="grandprix_backlink_logo" size={32} />
            <span className="grandprix_backlink_value">グランプリ一覧</span>
          </Link>
          <div className="grandprix_panel_main">
            <div className="grandprix_panel_info">
              <span className="grandprix_title">
                第{grandPrix.number}回遼平会
                {dateToFormat(grandPrix.eventDate, "Y/M/D 開催")}
              </span>
              <span className="grandprix_subtitle">{grandPrix.subtitle}</span>
            </div>
            <div className="grandprix_panel_button">
              {isParticipated ? (
                <div className="grandprix_panel_register">
                  <Button
                    value="発表登録を取り消す"
                    color="red"
                    size="M"
                    mode="default"
                    disabled={unparticipateBtn.disabled}
                    onClick={unparticipateBtn.handler}
                  />
                  <span className="grandprix_register_info">あなたは発表登録しています</span>
                </div>
              ) : (
                <div className="grandprix_panel_register">
                  <Button
                    value="発表登録する"
                    color="white"
                    size="M"
                    mode="default"
                    disabled={participateBtn.disabled}
                    onClick={participateBtn.handler}
                  />
                  <span className="grandprix_register_info">あなたは登録していません</span>
                </div>
              )}
              <Button
                value="入場する"
                color="blueBlack"
                size="M"
                mode="default"
                disabled={grandPrix.status !== GrandPrixStatus.doing}
                onClick={() => navigate(`/reaction/${id}`)}
              />
              {user?.role == UserRole.staff && (
                <Button
                  value="管理者ページ"
                  color="blueBlack"
                  size="M"
                  iconPlace="left"
                  Icon={Cog}
                  mode="default"
                  onClick={() => navigate(`/admin/gpcontroller/${id}`)}
                />
              )}
            </div>
          </div>
        </div>
        <TileBack type="onlyBottom">
          <div className="grandprix_panel_bottom">
            <div className="grandprix_panel_presenters">
              <span className="grandprix_bartitle">発表者</span>
              <div className="grandprix_presenterswrapper">
                {sortedPresentersKey.map((key) => (
                  <div className="grandprix_presentericon" key={key}>
                    <UserIcon
                      userName={presenters[key].user?.displayName}
                      iconUrl={presenters[key].user?.photoURL}
                      size="L"
                      color="orange"
                    />
                    <span className="grandprix_presentername">{presenters[key].user?.displayName}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grandprix_panel_description">{grandPrix.description}</div>
          </div>
        </TileBack>
      </GrandPrixStyle>
    </WithHeaderFooter>
  );
};
