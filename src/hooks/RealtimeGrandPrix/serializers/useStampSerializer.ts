import { useStampImage } from "hooks/StampResources/useStampImage";
import { useStampSound } from "hooks/StampResources/useStampSound";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Stamp } from "services/Stamps/Stamps";
import { RootState } from "store";
import { SerializedStampType, useStampTypeSerializer } from "./useStampTypeSerializer";

export type SerializedStamp = Stamp & {
  type?: SerializedStampType;
  imageDataUrl?: string;
  soundDataUrl?: string;
};

export type IResponse = {
  serializedStamp?: SerializedStamp;
};

/**
 * Stampをシリアライズする
 * @param stampId StampID
 * @returns シリアライズされたStamp
 */
export const useStampSerializer = (stampId?: string): IResponse => {
  // スタンプの取得
  const { stamps } = useSelector((state: RootState) => state.stamps);
  const stamp = useMemo(() => {
    if (stampId && stamps[stampId]) return stamps[stampId];
    return undefined;
  }, [stampId, stamps]);

  // スタンプタイプのシリアライズ
  const { serializedStampType } = useStampTypeSerializer(stamp?.typeId);

  // スタンプ画像を取得
  const { urls: imageUrls, loadUrl: loadImageUrl } = useStampImage();

  useEffect(() => {
    if (stampId && !imageUrls[stampId]) {
      loadImageUrl(stampId);
    }
  }, [stampId, loadImageUrl]);

  const imageDataUrl = useMemo(() => {
    if (stampId && imageUrls[stampId]) return imageUrls[stampId];
    else return undefined;
  }, [stampId, imageUrls]);

  // スタンプ音声を取得
  const { urls: soundUrls, loadUrl: loadSoundUrl } = useStampSound();

  useEffect(() => {
    if (stampId && !soundUrls[stampId]) {
      loadSoundUrl(stampId);
    }
  }, [stampId, loadSoundUrl]);

  const soundDataUrl = useMemo(() => {
    if (stampId && soundUrls[stampId]) return soundUrls[stampId];
    else return undefined;
  }, [stampId, soundUrls]);

  return {
    serializedStamp: stamp && {
      ...stamp,
      type: serializedStampType,
      imageDataUrl,
      soundDataUrl,
    },
  };
};
