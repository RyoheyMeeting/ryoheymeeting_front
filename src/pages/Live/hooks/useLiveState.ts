import { BlinkPlainReaction } from "components/BlinkPlainReaction/BlinkPlainReaction";
import { PresenterWithUser } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useRealtimeGrandPrixSetup } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrixSetup";
import { useTimer } from "hooks/Timer/useTimer";
import { useGrandPrixInfo } from "pages/Reaction/hooks/useGrandPrixInfo";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { donePlainReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";

export type IResponse = {
  currentPresenter?: PresenterWithUser;
  remainTime?: Date;
  blinkPlainReactions: { [key: string]: ComponentProps<typeof BlinkPlainReaction> };
};

export const Status = {
  loading: 0,
  standby: 1,
  entered: 2,
  error: 3,
} as const;
export type StatusType = typeof Status[keyof typeof Status];

export const useLiveState = (): IResponse => {
  // セットアップ
  useRealtimeGrandPrixSetup();
  const { realtimeGrandPrix, enterGrandPrix, exitGrandPrix } = useRealtimeGrandPrix();
  const { grandPrixes } = useSelector((state: RootState) => state.grandPrixes);
  const [status, setStatus] = useState<StatusType>(Status.loading);
  const { id } = useParams();

  useEffect(() => {
    if (id && id in grandPrixes) {
      setStatus(Status.standby);
    }
  }, [id, grandPrixes]);

  useEffect(() => {
    if (id) {
      if (status == Status.standby) {
        // 入場
        enterGrandPrix(id);
      } else if (status == Status.entered) {
        // ページを離れるときは退場処理をする
        return () => {
          exitGrandPrix();
        };
      }
    }
  }, [status]);

  // 現在のプレゼンター取得
  const { currentPresenter } = useGrandPrixInfo();

  // タイマー取得
  const { remainTime } = useTimer(
    realtimeGrandPrix.grandPrix
      ? {
          maxTime: realtimeGrandPrix.grandPrix.presentationTime,
          startTime: realtimeGrandPrix.grandPrix.startTime,
        }
      : {
          maxTime: new Date(600000),
          startTime: undefined,
        }
  );

  // スタンプ管理
  const { plainReactions } = useSelector((state: RootState) => state.realtimeGrandPrix);
  const dispatch = useDispatch();
  const [blinkPlainReactions, setBlinkPlainReactions] = useState<IResponse["blinkPlainReactions"]>({});

  useEffect(() => {
    const yetPlainReactionKeys = realtimeGrandPrix.plainReactions.sortedKey.filter(
      (key) => !realtimeGrandPrix.plainReactions.data[key].done
    );

    yetPlainReactionKeys.forEach((yetPlainReactionKey) => {
      showStamp(yetPlainReactionKey);
    });
  }, [realtimeGrandPrix.plainReactions]);

  const showStamp = useCallback(
    (plainReactionId) => {
      // 入力チェック
      if (!plainReactionId) return;

      // 準備
      const nowWithOffset = new Date(new Date().getTime() - 60000);
      const plainReaction = plainReactions.data[plainReactionId];

      // 表示済み・現在時刻より前過ぎる場合は表示しない
      if (!plainReactionId || !plainReaction || plainReaction.done || plainReaction.sendAt < nowWithOffset) return;

      // 削除用コールバックを作成（毎回生成する必要があるのでuseCallbackは使用しない）
      const quiteCallback = () => {
        setBlinkPlainReactions((values) => {
          // 表示後はスタンプを削除
          delete values[plainReactionId];
          return {
            ...values,
          };
        });
      };

      // スタンプを表示
      setBlinkPlainReactions((values) => {
        return {
          ...values,
          [plainReactionId]: {
            plainReactionId,
            quiteCallback,
          },
        };
      });

      // PlainReactionを表示したことにする
      dispatch(donePlainReaction(plainReactionId));
    },
    [setBlinkPlainReactions, plainReactions]
  );

  return {
    currentPresenter,
    remainTime,
    blinkPlainReactions,
  };
};
