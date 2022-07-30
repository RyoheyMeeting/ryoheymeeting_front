import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { ActionList, HotItem, MessageReaction, PlainReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { ButtonOpts } from "Types/Utils";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { PresenterWithUser } from "hooks/Presenters/usePresenters";
import { useGrandPrixInfo } from "pages/Reaction/hooks/useGrandPrixInfo";
import { useStampsGroupByType } from "hooks/Stamps/useStampsGroupByType";
import { SerializedStamp, useStampSerializer } from "hooks/RealtimeGrandPrix/serializers/useStampSerializer";
import { UseTimerProps } from "hooks/Timer/useTimer";

type KeyWithSendableStampHandler = {
  key: string;
  onReactionButtonClick: () => void;
  onMessageButtonClick: () => void;
};

export type IResponse = {
  plainReactions: ActionList<HotItem<PlainReaction>>;
  messageReactions: ActionList<HotItem<MessageReaction>>;
  currentPresenter?: PresenterWithUser;
  nextPresenter?: PresenterWithUser;
  isNextPresenter: boolean;
  psychoStampKeysWithHandler: KeyWithSendableStampHandler[];
  waitStampKeysWithHandler: KeyWithSendableStampHandler[];
  goodStampKeysWithHandler: KeyWithSendableStampHandler[];
  serializedMessageStamp?: SerializedStamp;
  timerProps?: UseTimerProps;
  changeMessage: {
    value: string;
    handler: ChangeEventHandler<HTMLTextAreaElement>;
  };
  sendMessageBtn: ButtonOpts;
};

export const useAudiencePanelState = (): IResponse => {
  // 各情報を取得
  const { realtimeGrandPrix, addPlainReaction, addMessageReaction } = useRealtimeGrandPrix();
  const { plainReactions, messageReactions, currentPresenter, nextPresenter, isNextPresenter } = useGrandPrixInfo();
  const { goodStampKeys, psychoStampKeys, waitStampKeys } = useStampsGroupByType();
  const { id: userId } = useSelector((state: RootState) => state.user);

  // 状態定義
  const [messageStampId, setMessageStampId] = useState<string | undefined>();
  const [message, setMessage] = useState("");

  // メッセージスタンプをシリアライズ
  const { serializedStamp: serializedMessageStamp } = useStampSerializer(messageStampId);

  // PlainReaction送信関数
  const sendPlainReaction = useCallback(
    (stampId?: string) => {
      if (userId && stampId) {
        addPlainReaction({
          stampId: stampId,
          sendAt: new Date(Date.now()),
          senderId: userId,
          strength: 1,
        });
      }
    },
    [addPlainReaction, userId]
  );

  // MessageReaction送信関数
  const sendMessageReaction = useCallback(
    (stampId?: string, message?: string) => {
      if (userId && stampId && message) {
        // 送信
        addMessageReaction({
          stampId: stampId,
          sendAt: new Date(Date.now()),
          senderId: userId,
          message: message,
        });

        // 送信したらフォームをリセットする
        setMessage("");
        setMessageStampId(undefined);
      }
    },
    [addMessageReaction, userId, setMessage]
  );

  // キー・ハンドラ生成関数
  const _generateKeysWithHandler = useCallback(
    (keys: string[]) => {
      return keys.map((key) => ({
        key: key,
        onReactionButtonClick: () => {
          sendPlainReaction(key);
        },
        onMessageButtonClick: () => {
          setMessageStampId(key);
        },
      }));
    },
    [sendPlainReaction, setMessageStampId]
  );

  // スタンプ送信ハンドラを準備
  const goodStampKeysWithHandler = useMemo(
    () => _generateKeysWithHandler(goodStampKeys),
    [goodStampKeys, sendPlainReaction]
  );
  const psychoStampKeysWithHandler = useMemo(
    () => _generateKeysWithHandler(psychoStampKeys),
    [psychoStampKeys, sendPlainReaction]
  );
  const waitStampKeysWithHandler = useMemo(
    () => _generateKeysWithHandler(waitStampKeys),
    [waitStampKeys, sendPlainReaction]
  );

  // メッセージフォーム用
  const _changeMessageHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  return {
    plainReactions,
    messageReactions,
    currentPresenter,
    nextPresenter,
    isNextPresenter,
    goodStampKeysWithHandler,
    psychoStampKeysWithHandler,
    waitStampKeysWithHandler,
    serializedMessageStamp,
    timerProps: realtimeGrandPrix.grandPrix && {
      maxTime: realtimeGrandPrix.grandPrix.presentationTime,
      startTime: realtimeGrandPrix.grandPrix.startTime,
    },
    changeMessage: {
      value: message,
      handler: _changeMessageHandler,
    },
    sendMessageBtn: {
      disabled: !messageStampId || message == "",
      handler: () => sendMessageReaction(messageStampId, message),
    },
  };
};
