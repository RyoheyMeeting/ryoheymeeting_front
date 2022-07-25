import { PresentationLayout } from "components/Layout/PresentationLayout/PresentationLayout";
import { Logo } from "components/Logo/Logo";
import { NextPresenter } from "components/NextPresenter/NextPresenter";
import { ONAIR } from "components/ONAIR/ONAIR";
import { PresenterIcon } from "components/PresenterIcon/PresenterIcon";
import React from "react";
import { AudiencePanel } from "./components/AudiencePanel/AudiencePanel";
import { PresenterPanel } from "./components/PresenterPanel/PresenterPanel";
import { useReactionState } from "./hooks/useReactionState";
import { ReactionStyle, WaitingStyle } from "./ReactionStyle";

type Props = {};

export const Reaction: React.FC<Props> = () => {
  const { isEntered, currentPresenter, nextPresenter, isPresenter, error } = useReactionState();

  if (error) return <PresentationLayout>{error}</PresentationLayout>;

  if (!isEntered)
    return (
      <PresentationLayout>
        <WaitingStyle>
          <h1>入場中</h1>
          <div>グランプリが開催されていない場合は入場できません。</div>
        </WaitingStyle>
      </PresentationLayout>
    );

  if (!currentPresenter)
    return (
      <PresentationLayout>
        <WaitingStyle>
          <h1>準備中...</h1>
          <div>発表が始まっておりません。</div>
        </WaitingStyle>
      </PresentationLayout>
    );

  return (
    <PresentationLayout>
      <ReactionStyle>
        <div className="reaction_container_left">
          <div className="reaction_container_status">
            <Logo logokind="square" size="48px" />
            <ONAIR />
          </div>
          <NextPresenter introduction={nextPresenter?.nextDescription} />
        </div>
        <div className="reaction_container_center">
          <PresenterIcon
            presenterName={currentPresenter.user?.displayName}
            photoUrl={currentPresenter.user?.photoURL}
            size="M"
          />
        </div>
      </ReactionStyle>
      {isPresenter ? <PresenterPanel /> : <AudiencePanel />}
    </PresentationLayout>
  );
};
