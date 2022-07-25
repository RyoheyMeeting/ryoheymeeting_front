import { Pen } from "components/icons";
import { Toggle } from "components/Toggle/Toggle";
import React from "react";
import { MessageWindow } from "../MessageWindow/MessageWindow";
import { AudiencePanelStyle } from "./AudiencePanelStyle";
import { ControlledStamp } from "./components/ControlledStamp/ControlledStamp";
import { useAudiencePanelState } from "./hooks/useAudiencePanelState";

type Props = {};

export const AudiencePanel: React.FC<Props> = () => {
  const {
    // plainReactions,
    // messageReactions,
    // boostActions,
    // muteActions,
    // stamps,
    changeStampId,
    changeStrength,
    changeMessage,
    sendReactionBtn,
    sendMessageBtn,
    toggleBtn,
    messageWindowClass,
  } = useAudiencePanelState();
  return (
    <AudiencePanelStyle>
      <div className="audiencepanel_container_stamp">
        <ControlledStamp
          changeStampId={changeStampId}
          changeStrength={changeStrength}
          sendReactionBtn={sendReactionBtn}
        />
      </div>
      <div className={`audiencepanel_container_messagewindow ${messageWindowClass}`}>
        <div className="audiencepanel_container_toggle">
          <Toggle Icon={Pen} onClick={toggleBtn.handler} />
        </div>
        <MessageWindow changeMessage={changeMessage} sendMessageBtn={sendMessageBtn} maxLetter={20} />
      </div>
    </AudiencePanelStyle>
    // <div>
    //   <h3>視聴者パネル</h3>
    //   <ul>
    //     <li>
    //       <h3>1. スタンプを選択</h3>
    //       <ul>
    //         {Object.keys(stamps).map((key) => (
    //           <label key={key}>
    //             <input
    //               type="radio"
    //               name="stamp"
    //               value={key}
    //               checked={changeStampId.value == key}
    //               onChange={(e) => changeStampId.handler(e.target.value)}
    //             />
    //             <div>{stamps[key].name}</div>
    //           </label>
    //         ))}
    //       </ul>
    //       <h3>2.1. スタンプを送信</h3>
    //       <div>
    //         スタンプの強さ：
    //         <input
    //           type="number"
    //           value={changeStrength.value}
    //           onChange={(e) => changeStrength.handler(Number(e.target.value))}
    //         />
    //         <button disabled={sendReactionBtn.disabled} onClick={sendReactionBtn.handler}>
    //           送信
    //         </button>
    //       </div>
    //       <h3>2.2. メッセージ付きで送信</h3>
    //       <div>
    //         メッセージ：
    //         <input type="text" value={changeMessage.value} onChange={(e) => changeMessage.handler(e.target.value)} />
    //         <button disabled={sendMessageBtn.disabled} onClick={sendMessageBtn.handler}>
    //           送信
    //         </button>
    //       </div>
    //     </li>
    //     <li>
    //       ブーストアクション
    //       <ul>
    //         {boostActions.sortedKey.map((key) => (
    //           <li key={key}>
    //             <div>
    //               使用時間：
    //               {boostActions.data[key].sendAt.toString()}
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </li>
    //     <li>
    //       ミュートアクション
    //       <ul>
    //         {muteActions.sortedKey.map((key) => (
    //           <li key={key}>
    //             <div>
    //               使用時間：
    //               {muteActions.data[key].sendAt.toString()}
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </li>
    //     <li>
    //       スタンプ
    //       <ul>
    //         {plainReactions.sortedKey.map((key) => (
    //           <li key={key}>
    //             <div>
    //               送信者：
    //               {plainReactions.data[key].senderId}
    //             </div>
    //             <div>
    //               スタンプ：
    //               {plainReactions.data[key].stampId}
    //             </div>
    //             <div>
    //               強さ：
    //               {plainReactions.data[key].strength}
    //             </div>
    //             <div>
    //               送信時間：
    //               {plainReactions.data[key].sendAt.toString()}
    //             </div>
    //           </li>
    //         )) || <li>情報がありません</li>}
    //       </ul>
    //     </li>
    //     <li>
    //       メッセージスタンプ
    //       <ul>
    //         {messageReactions.sortedKey.map((key) => (
    //           <li key={key}>
    //             <div>
    //               送信者：
    //               {messageReactions.data[key].senderId}
    //             </div>
    //             <div>
    //               スタンプ：
    //               {messageReactions.data[key].stampId}
    //             </div>
    //             <div>
    //               メッセージ：
    //               {messageReactions.data[key].message}
    //             </div>
    //             <div>
    //               送信時間：
    //               {messageReactions.data[key].sendAt.toString()}
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </li>
    //   </ul>
    // </div>
  );
};
