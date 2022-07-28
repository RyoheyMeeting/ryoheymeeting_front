import { BlinkPlainReaction } from "components/BlinkPlainReaction/BlinkPlainReaction";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { donePlainReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { RootState } from "store";
import { clamp } from "Utils/funcs";

export interface ReactionMeterHandler {
  showStamp: (plainReactionId?: string) => void;
}

export type IResponse = {
  strokeDashoffset: number;
  showStamp: ReactionMeterHandler["showStamp"];
  blinkPlainReactions: { [key: string]: ComponentProps<typeof BlinkPlainReaction> };
};

export const useReactionMeterState = (): IResponse => {
  const { plainReactions } = useSelector((state: RootState) => state.realtimeGrandPrix);
  const dispatch = useDispatch();
  const [blinkPlainReactions, setBlinkPlainReactions] = useState<IResponse["blinkPlainReactions"]>({});

  const strokeDashoffset = useMemo(() => {
    const start = 302;
    const end = 101;

    // duration時間以内にmax件が最大
    const max = 10;

    return start - clamp(Object.keys(blinkPlainReactions).length / max) * (start - end);
  }, [blinkPlainReactions]);

  const showStamp: ReactionMeterHandler["showStamp"] = useCallback(
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
    strokeDashoffset,
    showStamp,
    blinkPlainReactions,
  };
};
