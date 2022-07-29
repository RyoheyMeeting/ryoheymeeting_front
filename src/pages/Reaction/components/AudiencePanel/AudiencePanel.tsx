import { BackLink } from "components/BackLink/BackLink";
import { Iine, Psycho, Tyottomate } from "components/icons";
import { PresenterIcon } from "components/PresenterIcon/PresenterIcon";
import React from "react";
import { useParams } from "react-router-dom";
import { HiddenNextPresenter } from "../HiddenNextPresenter/HiddenNextPresenter";
import { MessageReactionForm } from "../MessageReactionForm/MessageReactionForm";
import { MessageReactionToStampMessage } from "../MessageReactionToStampMessage/MessageReactionToStampMessage";
import { StampPalleteGroup } from "../StampPallete/StampPalleteGroup/StampPalleteGroup";
import { StampPalleteGroupTitle } from "../StampPallete/StampPalleteGroupTitle/StampPalleteGroupTitle";
import { StampToSendableStamp } from "../StampToSendableStamp/StampToSendableStamp";
import { AudiencePanelStyle, StampPalleteStyle } from "./AudiencePanelStyle";
import { useAudiencePanelState } from "./hooks/useAudiencePanelState";

type Props = {};

export const AudiencePanel: React.FC<Props> = () => {
  const {
    messageReactions,
    currentPresenter,
    nextPresenter,
    isNextPresenter,
    psychoStampKeys,
    waitStampKeys,
    goodStampKeys,
  } = useAudiencePanelState();

  return (
    <AudiencePanelStyle>
      <div className="audiencepanel_left">
        <div className="audiencepanel_leftup">
          <BackLink color="white" to={`/grandprix/${useParams()["id"]}`} />
          <HiddenNextPresenter
            hide={false}
            nextPresenterProps={{
              introduction: isNextPresenter ? "あなたです！発表の準備をしましょう！" : nextPresenter?.nextDescription,
            }}
          />
        </div>
        <StampPalleteStyle>
          <StampPalleteGroupTitle Icon={Psycho} title="サイコです！" />
          <StampPalleteGroup>
            {psychoStampKeys.map((key) => (
              <StampToSendableStamp
                key={key}
                stampId={key}
                sendableStampCallbacks={{
                  onReactionButtonClick: undefined,
                  onMessageButtonClick: undefined,
                }}
              />
            ))}
          </StampPalleteGroup>
          <StampPalleteGroupTitle Icon={Tyottomate} title="ちょっと待て！" />
          <StampPalleteGroup>
            {waitStampKeys.map((key) => (
              <StampToSendableStamp
                key={key}
                stampId={key}
                sendableStampCallbacks={{
                  onReactionButtonClick: undefined,
                  onMessageButtonClick: undefined,
                }}
              />
            ))}
          </StampPalleteGroup>
          <StampPalleteGroupTitle Icon={Iine} title="いいね！" />
          <StampPalleteGroup>
            {goodStampKeys.map((key) => (
              <StampToSendableStamp
                key={key}
                stampId={key}
                sendableStampCallbacks={{
                  onReactionButtonClick: undefined,
                  onMessageButtonClick: undefined,
                }}
              />
            ))}
          </StampPalleteGroup>
        </StampPalleteStyle>
      </div>
      <div className="audiencepanel_center">
        <PresenterIcon
          presenterName={currentPresenter?.user?.displayName}
          photoUrl={currentPresenter?.user?.photoURL}
          size="M"
        />
      </div>
      <div className="audiencepanel_right">
        <div className="presetnerpanel_messages">
          {messageReactions.sortedKey.map((key) => (
            <MessageReactionToStampMessage key={key} plainReactionId={key} />
          ))}
        </div>
        <MessageReactionForm />
      </div>
    </AudiencePanelStyle>
  );
};

// return (
//   <div>
//     <h3>視聴者パネル</h3>
//     <ul>
//       <li>
//         <h3>1. スタンプを選択</h3>
//         <ul>
//           {Object.keys(stamps).map((key) => (
//             <label key={key}>
//               <input
//                 type="radio"
//                 name="stamp"
//                 value={key}
//                 checked={changeStampId.value == key}
//                 onChange={(e) => changeStampId.handler(e.target.value)}
//               />
//               <div>{stamps[key].name}</div>
//             </label>
//           ))}
//         </ul>
//         <h3>2.1. スタンプを送信</h3>
//         <div>
//           スタンプの強さ：
//           <input
//             type="number"
//             value={changeStrength.value}
//             onChange={(e) => changeStrength.handler(Number(e.target.value))}
//           />
//           <button disabled={sendReactionBtn.disabled} onClick={sendReactionBtn.handler}>
//             送信
//           </button>
//         </div>
//         <h3>2.2. メッセージ付きで送信</h3>
//         <div>
//           メッセージ：
//           <input type="text" value={changeMessage.value} onChange={(e) => changeMessage.handler(e.target.value)} />
//           <button disabled={sendMessageBtn.disabled} onClick={sendMessageBtn.handler}>
//             送信
//           </button>
//         </div>
//       </li>
//       <li>
//         ブーストアクション
//         <ul>
//           {boostActions.sortedKey.map((key) => (
//             <li key={key}>
//               <div>
//                 使用時間：
//                 {boostActions.data[key].sendAt.toString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </li>
//       <li>
//         ミュートアクション
//         <ul>
//           {muteActions.sortedKey.map((key) => (
//             <li key={key}>
//               <div>
//                 使用時間：
//                 {muteActions.data[key].sendAt.toString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </li>
//       <li>
//         スタンプ
//         <ul>
//           {plainReactions.sortedKey.map((key) => (
//             <li key={key}>
//               <div>
//                 送信者：
//                 {plainReactions.data[key].senderId}
//               </div>
//               <div>
//                 スタンプ：
//                 {plainReactions.data[key].stampId}
//               </div>
//               <div>
//                 強さ：
//                 {plainReactions.data[key].strength}
//               </div>
//               <div>
//                 送信時間：
//                 {plainReactions.data[key].sendAt.toString()}
//               </div>
//             </li>
//           )) || <li>情報がありません</li>}
//         </ul>
//       </li>
//       <li>
//         メッセージスタンプ
//         <ul>
//           {messageReactions.sortedKey.map((key) => (
//             <li key={key}>
//               <div>
//                 送信者：
//                 {messageReactions.data[key].senderId}
//               </div>
//               <div>
//                 スタンプ：
//                 {messageReactions.data[key].stampId}
//               </div>
//               <div>
//                 メッセージ：
//                 {messageReactions.data[key].message}
//               </div>
//               <div>
//                 送信時間：
//                 {messageReactions.data[key].sendAt.toString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </li>
//     </ul>
//   </div>
// );
