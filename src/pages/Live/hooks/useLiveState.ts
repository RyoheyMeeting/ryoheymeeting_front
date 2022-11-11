import { ComponentProps, useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { BlinkPlainReaction } from "components/BlinkPlainReaction/BlinkPlainReaction";
import { useModerateSound } from "hooks/ModerateSoundResources/useModerateSound";
import { PresenterWithUser } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useRealtimeGrandPrixSetup } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrixSetup";
import { useTimer } from "hooks/Timer/useTimer";
import { usePresentationWatchDog } from "hooks/WatchDog/usePresentationWatchDog";
import { useGrandPrixInfo } from "pages/Reaction/hooks/useGrandPrixInfo";
import { donePlainReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { PRESENTATION_TIME } from "styles/constants/constants";
import { randomChoice } from "Utils/funcs";

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
          maxTime: new Date(PRESENTATION_TIME),
          startTime: undefined,
        }
  );

  // プレゼン進行ボイスの再生
  const { moderateSounds, groupedModerateSoundIds, loadUrl } = useModerateSound();

  const sounds = useMemo(() => {
    return {
      start: new Audio(),
      remain5: new Audio(),
      finish: new Audio(),
    };
  }, []);

  useEffect(() => {
    const startChoiced = randomChoice(groupedModerateSoundIds.start);
    if (startChoiced && moderateSounds[startChoiced].downloadURL) {
      sounds.start.src = moderateSounds[startChoiced].downloadURL || "";
    }
    const remain5Choiced = randomChoice(groupedModerateSoundIds.remain5);
    if (remain5Choiced && moderateSounds[remain5Choiced].downloadURL) {
      sounds.remain5.src = moderateSounds[remain5Choiced].downloadURL || "";
    }
    const finishChoiced = randomChoice(groupedModerateSoundIds.finish);
    if (finishChoiced && moderateSounds[finishChoiced].downloadURL) {
      sounds.finish.src = moderateSounds[finishChoiced].downloadURL || "";
    }
  }, [moderateSounds, realtimeGrandPrix.grandPrix?.startTime]);

  // 事前にすべてロード
  useEffect(() => {
    Object.keys(moderateSounds).map(async (id, index) => {
      console.log(`進行ボイスをロード中: ${index + 1}/${Object.keys(moderateSounds).length}`);
      await loadUrl(id);
    });
  }, [moderateSounds]);

  // タイマーをセット
  usePresentationWatchDog({
    startTime: realtimeGrandPrix.grandPrix?.startTime,
    maxTime: realtimeGrandPrix.grandPrix?.presentationTime || new Date(PRESENTATION_TIME),
    eventTimePattern: "start",
    eventFunc: () => {
      console.log("start!");
      if (sounds.start) sounds.start.play();
    },
  });

  usePresentationWatchDog({
    startTime: realtimeGrandPrix.grandPrix?.startTime,
    maxTime: realtimeGrandPrix.grandPrix?.presentationTime || new Date(PRESENTATION_TIME),
    eventTimePattern: "remain5",
    eventFunc: () => {
      console.log("remain5!");
      if (sounds.remain5) sounds.remain5.play();
    },
  });

  usePresentationWatchDog({
    startTime: realtimeGrandPrix.grandPrix?.startTime,
    maxTime: realtimeGrandPrix.grandPrix?.presentationTime || new Date(PRESENTATION_TIME),
    eventTimePattern: "finish",
    eventFunc: () => {
      console.log("finish!");
      if (sounds.finish) sounds.finish.play();
    },
  });

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
      const nowWithOffset = new Date(new Date().getTime() - 5000);
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
