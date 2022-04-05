import { BaseLayout } from "components/Layout/BaseLayout/BaseLayout";
import React from "react";
import { AudiencePanel } from "./components/AudiencePanel/AudiencePanel";
import { PresenterPanel } from "./components/PresenterPanel/PresenterPanel";
import { useReactionState } from "./hooks/useReactionState";

type Props = {};

export const Reaction: React.FC<Props> = () => {
  const { isEntered, realtimeGrandPrix, currentPresenter, nextPresenter, isPresenter, error } = useReactionState();

  if (error) return <BaseLayout>{error}</BaseLayout>;

  if (!isEntered)
    return (
      <BaseLayout>
        <h1>入場中</h1>
        <div>グランプリが開催されていない場合は入場できません。</div>
      </BaseLayout>
    );

  if (!currentPresenter)
    return (
      <BaseLayout>
        <h1>リアクション</h1>
        <div>発表が始まっておりません。</div>
      </BaseLayout>
    );

  return (
    <BaseLayout>
      <h1>リアクション</h1>
      <div>
        現在の発表者：
        {currentPresenter ? currentPresenter.user?.displayName : "いません"}
      </div>
      <div>I am {isPresenter ? "" : "not"} a presenter.</div>
      <div>
        次の発表者は...
        <div>{nextPresenter ? nextPresenter.nextDescription : "いません"}</div>
      </div>
      {isPresenter ? <PresenterPanel /> : <AudiencePanel />}
      <h3>デバッグ用</h3>
      <div>{JSON.stringify(realtimeGrandPrix)}</div>
    </BaseLayout>
  );
};
