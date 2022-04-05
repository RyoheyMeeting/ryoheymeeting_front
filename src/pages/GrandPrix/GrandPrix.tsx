import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { Link } from "react-router-dom";
import { UserRole } from "services/User/User";
import { useGrandPrixState } from "./hooks/useGrandPrixState";

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

  if (!grandPrix || error)
    return (
      <WithHeaderFooter>
        情報が存在しません。
        {error}
      </WithHeaderFooter>
    );

  return (
    <WithHeaderFooter>
      <h1>グランプリ</h1>
      <ul>
        <li>
          副題：
          {grandPrix.subtitle}
        </li>
        <li>
          ナンバリング：
          {grandPrix.number}
        </li>
        <li>
          開催日：
          {grandPrix.eventDate.toString()}
        </li>
        <li>
          ステータス：
          {grandPrix.status}
        </li>
        <li>
          説明：
          <pre>{grandPrix.description}</pre>
        </li>
        <li>
          <h3>プレゼンター</h3>
          <ul>
            {sortedPresentersKey.map((key) => (
              <li key={key}>
                <div>
                  <img src={presenters[key].user?.photoURL} alt="" />
                </div>
                <div>{presenters[key].user?.displayName}</div>
                <div>
                  獲得ポイント：
                  {presenters[key]?.earnedCollvoPoint}
                  CP
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li>
          {isParticipated ? (
            <button disabled={unparticipateBtn.disabled} onClick={unparticipateBtn.handler}>
              発表参加取り消し
            </button>
          ) : (
            <button disabled={participateBtn.disabled} onClick={participateBtn.handler}>
              発表者として参加する
            </button>
          )}
        </li>
        <li>
          <Link to={`/reaction/${id}`}>リアルタイムリアクションページ</Link>
        </li>
        {user?.role == UserRole.staff ? (
          <li>
            <Link to={`/admin/gpcontroller/${id}`}>コントローラページ</Link>
          </li>
        ) : undefined}
      </ul>
    </WithHeaderFooter>
  );
};
