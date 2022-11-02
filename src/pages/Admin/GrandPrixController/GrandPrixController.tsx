import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { Link } from "react-router-dom";
import { EditablePresenter } from "./components/EditablePresenter/EditablePresenter";
import { useGrandPrixControllerState } from "./hooks/useGrandPrixControllerState";

type Props = {};

export const GrandPrixController: React.FC<Props> = () => {
  const {
    grandPrixId,
    presenters,
    presenterCollvoPoints,
    recalcCPHandler,
    sortedPresenterKeys,
    changePresenterBtns,
    loading,
    enabled,
    error,
    createBtn,
    toggleEnabledBtn,
    resetPresenterBtn,
    startTimer,
    stopTimer,
    resetTimer,
  } = useGrandPrixControllerState();

  if (loading) {
    return <WithHeaderFooter>ロード中</WithHeaderFooter>;
  }

  if (error) {
    return <WithHeaderFooter>{error}</WithHeaderFooter>;
  }

  return (
    <WithHeaderFooter>
      <h1>グランプリコントローラ</h1>
      <ul>
        <li>
          <button disabled={createBtn.disabled} onClick={createBtn.handler}>
            部屋を作成
          </button>
        </li>
        <li>
          <button disabled={toggleEnabledBtn.disabled} onClick={toggleEnabledBtn.handler}>
            部屋を
            {enabled ? "無効化" : "有効化"}
          </button>
        </li>
        <li>
          タイマー機能
          <button onClick={startTimer}>開始</button>
          <button onClick={stopTimer}>一時停止</button>
          <button onClick={resetTimer}>リセット</button>
        </li>
        <li>
          プレゼンター一覧
          <button onClick={recalcCPHandler}>CPを再計算する</button>
          <ul>
            {sortedPresenterKeys.map((key) => (
              <li key={key}>
                <div>
                  {presenters[key].user?.displayName}さん
                  <button disabled={changePresenterBtns[key]?.disabled} onClick={changePresenterBtns[key]?.handler}>
                    この人の順番にする
                  </button>
                  {changePresenterBtns[key]?.disabled ? "発表中" : undefined}
                </div>
                <div>プレゼンター情報の編集</div>
                <EditablePresenter grandPrixId={grandPrixId || ""} presenterId={key} />
                <div>現在の獲得ポイント</div>
                <ul>
                  <li>
                    リアクションポイント：
                    {presenterCollvoPoints.data[key]?.reactionPoint}
                  </li>
                  <li>
                    ブーストポイント：
                    {presenterCollvoPoints.data[key]?.boostPoint}
                  </li>
                  <li>
                    順位：
                    {presenterCollvoPoints.data[key]?.rank}位
                  </li>
                  <li>
                    順位ポイント：
                    {presenterCollvoPoints.data[key]?.rankPoint}
                  </li>
                  <li>
                    合計獲得ポイント：
                    {presenterCollvoPoints.data[key]?.totalPoint}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={resetPresenterBtn.handler}>誰も発表していない状態にする</button>
        </li>
        <li>
          <Link to={`/live/${grandPrixId}`}>ライブ画面</Link>
        </li>
      </ul>
    </WithHeaderFooter>
  );
};
