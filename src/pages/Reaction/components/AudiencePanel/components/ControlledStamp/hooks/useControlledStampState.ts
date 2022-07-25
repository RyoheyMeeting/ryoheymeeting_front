import { useStampImage } from "hooks/StampResources/useStampImage";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Stamp } from "services/Stamps/Stamps";
import { RootState } from "store";

// 座標の型
interface Position {
  x: number;
  y: number;
}

// ドラッグ＆ドロップ要素の情報をまとめた型
interface DnDItem {
  key: string; // 要素と紐づいた一意な文字列
  position: Position; // 要素の座標
  element: HTMLElement; // DOM情報
}

// useRef()で保持するデータの型
interface RefType {
  pointerPosition: Position;
  previousPosition: Position;
  dragElement: DnDItem | null; // ドラッグしてる要素
}

export type IResponse = {
  stamps: {
    data: Stamp;
    key: string;
    stampUrl?: string;
    events: {
      ref: (value: any) => void;
      onMouseDown: (event: any) => void;
    };
  }[];
  mouseoverHandler: (stampId: string) => void;
};

export const useControlledStampState = (
  changeStampIdHandler: (value: string) => void,
  changeStrengthHandler: (value: number) => void,
  sendReactionHandler?: () => void
): IResponse => {
  const [isDrag, setIsDrag] = useState(false);
  const [prePos, setPrePos] = useState<Position | undefined>();
  const { stamps } = useSelector((state: RootState) => state.stamps);
  const { urls, loadUrl } = useStampImage();

  const state = useRef<RefType>({
    dragElement: null,
    pointerPosition: { x: 0, y: 0 },
    previousPosition: { x: 0, y: 0 },
  }).current;

  // ドラッグ中の処理
  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { dragElement, pointerPosition } = state;

    // ドラッグして無ければ何もしない
    if (!dragElement) return;

    // マウスポインターの移動量を計算
    const x = clientX - pointerPosition.x;
    const y = clientY - pointerPosition.y;

    const dragStyle = dragElement.element.style;

    // 速さを計算して閾値以上ならスタンプウェイトを上げる
    if (prePos) {
      // TODO: 動いている時間に応じてウェイトを変化させる
      changeStrengthHandler(1);
    }
    setPrePos({ x: x, y: y });

    // ドラッグ要素の座標とスタイルを更新
    dragStyle.zIndex = "100";
    dragStyle.cursor = "grabbing";
    dragStyle.transform = `translate(${x}px,${y}px)`;
  };

  const onMouseUp = () => {
    const { dragElement } = state;

    // ドラッグしていなかったら何もしない
    if (!dragElement) return;

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用していたCSSを削除
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";

    // スタンプを送信
    if (sendReactionHandler && prePos) sendReactionHandler();

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);

    setIsDrag(false);
  };

  const onMouseOver = useCallback((stampId: string) => {
    if (isDrag) return;

    changeStampIdHandler(stampId);
  }, []);

  useEffect(() => {
    Object.keys(stamps).forEach((key) => {
      loadUrl(key);
    });
  }, [stamps]);

  return {
    stamps: useMemo(
      () =>
        Object.keys(stamps).map((key) => {
          return {
            data: stamps[key],
            key: key,
            stampUrl: urls[key],
            events: {
              ref: () => {},
              onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
                // ドラッグする要素(DOM)
                const element = event.currentTarget;

                // マウスポインターの座標を保持しておく
                state.pointerPosition.x = event.clientX;
                state.pointerPosition.y = event.clientY;

                // ドラッグしている要素のスタイルを上書き
                element.style.transition = ""; // アニメーションを無効にする
                element.style.cursor = "grabbing"; // カーソルのデザインを変更

                // 要素の座標を取得
                const { left: x, top: y } = element.getBoundingClientRect();
                const position: Position = { x, y };

                // ドラッグする要素を保持しておく
                state.dragElement = { key, element, position };

                // mousemove, mouseupイベントをwindowに登録する
                window.addEventListener("mouseup", onMouseUp);
                window.addEventListener("mousemove", onMouseMove);

                setIsDrag(true);
              },
            },
          };
        }),
      [stamps, urls]
    ),
    mouseoverHandler: onMouseOver,
  };
};
