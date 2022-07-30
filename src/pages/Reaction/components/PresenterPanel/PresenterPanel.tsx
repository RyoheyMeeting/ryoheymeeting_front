import { BackLink } from "components/BackLink/BackLink";
import { Boost, VolumeSlash } from "components/icons";
import { PresenterIcon } from "components/PresenterIcon/PresenterIcon";
import { ReactionMeters } from "components/ReactionMeters/ReactionMeters";
import React from "react";
import { useParams } from "react-router-dom";
import { ActionButton } from "../ActionButton/ActionButton";
import { HiddenNextPresenter } from "../HiddenNextPresenter/HiddenNextPresenter";
import { MessageReactionToStampMessage } from "../MessageReactionToStampMessage/MessageReactionToStampMessage";
import { usePresenterPanelState } from "./hooks/usePresenterPanelState";
import { PresenterPanelStyle } from "./PresenterPanelStyle";

type Props = {};

export const PresenterPanel: React.FC<Props> = () => {
  const {
    currentPresenter,
    nextPresenter,
    isNextPresenter,
    timerProps,
    execMuteBtn,
    execBoostBtn,
    messageReactions,
    reactionMetersRef,
  } = usePresenterPanelState();

  return (
    <PresenterPanelStyle>
      <div className="presenterpanel_left">
        <div className="presenterpanel_leftup">
          <BackLink color="white" to={`/grandprix/${useParams()["id"]}`} />
          <HiddenNextPresenter
            hide={false}
            nextPresenterProps={{
              introduction: isNextPresenter ? "あなたです！発表の準備をしましょう！" : nextPresenter?.nextDescription,
            }}
          />
        </div>
        <div className="presenterpanel_actions">
          <ActionButton
            Icon={VolumeSlash}
            acitonName="ミュート"
            remainTime={undefined}
            status={execMuteBtn.disabled ? "disabled" : "ready"}
            onClick={execMuteBtn.handler}
          />
          <ActionButton
            Icon={Boost}
            acitonName="ブースト"
            remainTime={undefined}
            status={execBoostBtn.disabled ? "disabled" : "ready"}
            onClick={execBoostBtn.handler}
          />
        </div>
      </div>
      <div className="presenterpanel_center">
        <PresenterIcon
          presenterName={currentPresenter?.user?.displayName}
          photoUrl={currentPresenter?.user?.photoURL}
          size="M"
          timerProps={timerProps}
        />
        <ReactionMeters ref={reactionMetersRef} />
      </div>
      <div className="presenterpanel_right">
        <div className="presetnerpanel_messages">
          {messageReactions.sortedKey.map((key) => (
            <MessageReactionToStampMessage key={key} plainReactionId={key} />
          ))}
        </div>
      </div>
    </PresenterPanelStyle>
  );
};
