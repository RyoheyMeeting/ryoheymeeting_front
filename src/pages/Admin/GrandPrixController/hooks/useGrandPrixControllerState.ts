import { useCollvoPoints } from "hooks/CollvoPoint/useCollvoPoints";
import { usePresenters } from "hooks/Presenters/usePresenters";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import { useRealtimeGrandPrixSetup } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrixSetup";
import { useTimer } from "hooks/Timer/useTimer";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonOpts, Dict } from "Types/Utils";

export const Status = {
  loading: 0,
  standby: 1,
  error: 2,
} as const;
export type StatusType = typeof Status[keyof typeof Status];

export const useGrandPrixControllerState = () => {
  useRealtimeGrandPrixSetup();
  const { realtimeGrandPrix, createGrandPrix, enterGrandPrix, updateGrandPrix } = useRealtimeGrandPrix();
  const { presenters, setGrandPrixId } = usePresenters();
  const [presenterBtns, setPresenterBtns] = useState<Dict<ButtonOpts>>({});
  const [status, setStatus] = useState<StatusType>(Status.loading);
  const [error, setError] = useState<string>();
  const [createBtnDisabled, setCreateBtnDisabled] = useState(false);
  const [toggleEnabledBtnDisabled, setToggleEnabledBtnDisabled] = useState(false);
  const { id } = useParams();
  const { presenterCollvoPoints, reload, canDistribute, distributeCollvoPoint } = useCollvoPoints(id || "");

  const sortedPresenterKeys = useMemo(
    () => Object.keys(presenters).sort((a, b) => (presenters[a].index < presenters[b].index ? -1 : 1)),
    [presenters]
  );

  useEffect(() => {
    reload();
  }, [presenters]);

  useEffect(() => {
    if (id) {
      // 部屋が存在する場合入室
      enterGrandPrix(id).then(() => {
        setStatus(Status.standby);
      });

      // プレゼンター一覧を更新
      setGrandPrixId(id);
    } else {
      setError("idが不正です");
      setStatus(Status.error);
    }
  }, []);

  useEffect(() => {
    const btns: Dict<ButtonOpts> = {};
    sortedPresenterKeys.forEach((key, index) => {
      btns[key] = {
        disabled: realtimeGrandPrix.grandPrix?.currentPresenterId == key,
        handler: () => {
          const current = key;
          const next = index + 1 < sortedPresenterKeys.length ? sortedPresenterKeys[index + 1] : null;
          updateGrandPrix({
            currentPresenterId: current,
            nextPresenterId: next,
          });
        },
      };
    });
    setPresenterBtns(btns);
  }, [sortedPresenterKeys, realtimeGrandPrix.grandPrix?.currentPresenterId, realtimeGrandPrix]);

  const _createBtnHandler = () => {
    if (id) {
      // 部屋作成処理中はボタンを押せないようにする
      setCreateBtnDisabled(true);
      // 部屋作成
      createGrandPrix(id).finally(() => {
        // ボタンを押せるように戻す
        setCreateBtnDisabled(false);
      });
    }
  };

  const _toggleEnabledBtnHandler = () => {
    if (id) {
      setToggleEnabledBtnDisabled(true);
      updateGrandPrix({
        enabled: !realtimeGrandPrix.grandPrix?.enabled,
      }).finally(() => {
        setToggleEnabledBtnDisabled(false);
      });
    }
  };

  const _resetPresenterBtnHandler = () => {
    updateGrandPrix({
      currentPresenterId: null,
      nextPresenterId: null,
    });
  };

  // タイマー機能
  const initialTime = new Date(600000);
  const { remainTime } = useTimer({
    maxTime: realtimeGrandPrix.grandPrix?.presentationTime || initialTime,
    startTime: realtimeGrandPrix.grandPrix?.startTime,
  });

  const startTimer = () => {
    if (realtimeGrandPrix.grandPrix) {
      updateGrandPrix({
        ...realtimeGrandPrix.grandPrix,
        startTime: new Date(),
      });
    }
  };

  const stopTimer = () => {
    if (realtimeGrandPrix.grandPrix) {
      updateGrandPrix({
        ...realtimeGrandPrix.grandPrix,
        presentationTime: remainTime,
        startTime: null,
      });
    }
  };

  const resetTimer = () => {
    if (realtimeGrandPrix.grandPrix) {
      updateGrandPrix({
        ...realtimeGrandPrix.grandPrix,
        presentationTime: initialTime,
        startTime: null,
      });
    }
  };

  return {
    grandPrixId: id,
    realtimeGrandPrix: realtimeGrandPrix.grandPrix,
    presenters: presenters,
    presenterCollvoPoints,
    recalcCPHandler: reload,
    canDistribute,
    distributeCollvoPoint,
    sortedPresenterKeys: sortedPresenterKeys,
    changePresenterBtns: presenterBtns,
    loading: status == Status.loading,
    isCreated: status == Status.standby && realtimeGrandPrix.isEntered,
    enabled: !!realtimeGrandPrix.grandPrix?.enabled,
    error: error,
    createBtn: {
      disabled: status != Status.standby || realtimeGrandPrix.isEntered || createBtnDisabled,
      handler: _createBtnHandler,
    },
    toggleEnabledBtn: {
      disabled: status != Status.standby || !realtimeGrandPrix.isEntered || toggleEnabledBtnDisabled,
      handler: _toggleEnabledBtnHandler,
    },
    resetPresenterBtn: {
      handler: _resetPresenterBtnHandler,
    },
    startTimer,
    stopTimer,
    resetTimer,
  };
};
