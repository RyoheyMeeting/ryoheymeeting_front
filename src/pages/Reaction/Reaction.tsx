import { ReactionLayout } from "components/Layout/ReactionLayout/ReactionLayout";
import config from "config";
import React from "react";
import { AudiencePanel } from "./components/AudiencePanel/AudiencePanel";
import { PresenterPanel } from "./components/PresenterPanel/PresenterPanel";
import { useReactionState } from "./hooks/useReactionState";
import { ReactionStyle } from "./ReactionStyle";

type Props = {};

export const Reaction: React.FC<Props> = () => {
  const { isEntered, realtimeGrandPrix, currentPresenter, nextPresenter, isPresenter, error } = useReactionState();

  if (error) return <ReactionLayout>{error}</ReactionLayout>;

  if (!isEntered)
    return (
      <ReactionLayout>
        <h1>入場中</h1>
        <div>グランプリが開催されていない場合は入場できません。</div>
      </ReactionLayout>
    );

  if (!currentPresenter)
    return (
      <ReactionLayout>
        <h1>リアクション</h1>
        <div>発表が始まっておりません。</div>
      </ReactionLayout>
    );

  return (
    <ReactionLayout>
      <ReactionStyle>{isPresenter ? <PresenterPanel /> : <AudiencePanel />}</ReactionStyle>
      {config.isDev && (
        <>
          <h1>デバッグ用</h1>
          <div>
            現在の発表者：
            {currentPresenter ? currentPresenter.user?.displayName : "いません"}
          </div>
          <div>I am {isPresenter ? "" : "not"} a presenter.</div>
          <div>
            次の発表者は...
            <div>{nextPresenter ? nextPresenter.nextDescription : "いません"}</div>
          </div>
          <div>{JSON.stringify(realtimeGrandPrix)}</div>
        </>
      )}
    </ReactionLayout>
  );
};
