import React from "react";
import { usePresenterPanelState } from "./hooks/usePresenterPanelState";

type Props = {};

export const PresenterPanel: React.FC<Props> = () => {
  const { plainReactions, messageReactions, boostActions, muteActions, execBoostBtn, execMuteBtn } =
    usePresenterPanelState();

  return (
    <div>
      <h2>プレゼンターパネル</h2>
      <ul>
        <li>
          ブーストアクション：
          {execBoostBtn.disabled ? "使用済み" : "使用可能"}
          <button disabled={execBoostBtn.disabled} onClick={execBoostBtn.handler}>
            ブースト！
          </button>
          <ul>
            {boostActions.sortedKey.map((key) => (
              <li key={key}>
                <div>
                  使用時間：
                  {boostActions.data[key].sendAt.toString()}
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li>
          ミュートアクション：
          {execMuteBtn.disabled ? "使用済み" : "使用可能"}
          <button disabled={execMuteBtn.disabled} onClick={execMuteBtn.handler}>
            ミュート！
          </button>
          <ul>
            {muteActions.sortedKey.map((key) => (
              <li key={key}>
                <div>
                  使用時間：
                  {muteActions.data[key].sendAt.toString()}
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li>
          スタンプ
          <ul>
            {plainReactions.sortedKey.map((key) => (
              <li key={key}>
                <div>
                  送信者：
                  {plainReactions.data[key].senderId}
                </div>
                <div>
                  スタンプ：
                  {plainReactions.data[key].stampId}
                </div>
                <div>
                  強さ：
                  {plainReactions.data[key].strength}
                </div>
                <div>
                  送信時間：
                  {plainReactions.data[key].sendAt.toString()}
                </div>
              </li>
            )) || <li>情報がありません</li>}
          </ul>
        </li>
        <li>
          メッセージスタンプ
          <ul>
            {messageReactions.sortedKey.map((key) => (
              <li key={key}>
                <div>
                  送信者：
                  {messageReactions.data[key].senderId}
                </div>
                <div>
                  スタンプ：
                  {messageReactions.data[key].stampId}
                </div>
                <div>
                  メッセージ：
                  {messageReactions.data[key].message}
                </div>
                <div>
                  送信時間：
                  {messageReactions.data[key].sendAt.toString()}
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
