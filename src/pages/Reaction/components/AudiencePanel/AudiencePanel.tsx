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
    goodStampKeysWithHandler,
    psychoStampKeysWithHandler,
    waitStampKeysWithHandler,
    serializedMessageStamp,
    changeMessage,
    sendMessageBtn,
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
          <StampPalleteGroupTitle Icon={Iine} title="いいね！" />
          <StampPalleteGroup>
            {goodStampKeysWithHandler.map((keysWithHandler) => (
              <StampToSendableStamp
                key={keysWithHandler.key}
                stampId={keysWithHandler.key}
                sendableStampCallbacks={{
                  onReactionButtonClick: keysWithHandler.onReactionButtonClick,
                  onMessageButtonClick: keysWithHandler.onMessageButtonClick,
                }}
              />
            ))}
          </StampPalleteGroup>
          <StampPalleteGroupTitle Icon={Psycho} title="サイコです！" />
          <StampPalleteGroup>
            {psychoStampKeysWithHandler.map((keysWithHandler) => (
              <StampToSendableStamp
                key={keysWithHandler.key}
                stampId={keysWithHandler.key}
                sendableStampCallbacks={{
                  onReactionButtonClick: keysWithHandler.onReactionButtonClick,
                  onMessageButtonClick: keysWithHandler.onMessageButtonClick,
                }}
              />
            ))}
          </StampPalleteGroup>
          <StampPalleteGroupTitle Icon={Tyottomate} title="ちょっと待て！" />
          <StampPalleteGroup>
            {waitStampKeysWithHandler.map((keysWithHandler) => (
              <StampToSendableStamp
                key={keysWithHandler.key}
                stampId={keysWithHandler.key}
                sendableStampCallbacks={{
                  onReactionButtonClick: keysWithHandler.onReactionButtonClick,
                  onMessageButtonClick: keysWithHandler.onMessageButtonClick,
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
        <MessageReactionForm
          stampProps={
            serializedMessageStamp && {
              stampName: serializedMessageStamp?.name,
              stampUrl: serializedMessageStamp?.imageDataUrl,
            }
          }
          messageValue={changeMessage.value}
          onChangeMessageValue={changeMessage.handler}
          disabled={sendMessageBtn.disabled}
          onSubmit={sendMessageBtn.handler}
        />
      </div>
    </AudiencePanelStyle>
  );
};
