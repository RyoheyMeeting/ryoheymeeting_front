import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import React from "react";
import { EditablePresenter } from "./components/EditablePresenter/EditablePresenter";
import { useGrandPrixControllerState } from "./hooks/useGrandPrixControllerState";

type Props = {};

export const GrandPrixController: React.FC<Props> = () => {
  const {
    grandPrixId,
    presenters,
    sortedPresenterKeys,
    changePresenterBtns,
    loading,
    enabled,
    error,
    createBtn,
    toggleEnabledBtn,
    resetPresenterBtn,
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
          プレゼンター一覧
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
                <div>プレゼンター情報</div>
                <EditablePresenter grandPrixId={grandPrixId || ""} presenterId={key} />
              </li>
            ))}
          </ul>
          <button onClick={resetPresenterBtn.handler}>誰も発表していない状態にする</button>
        </li>
      </ul>
    </WithHeaderFooter>
  );
};
