import { useStampImage } from "hooks/StampResources/useStampImage";
import { useStampSound } from "hooks/StampResources/useStampSound";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Stamp } from "services/Stamps/Stamps";
import { RootState } from "store";
import { SerializedStampType, useStampTypeSerializer } from "./useStampTypeSerializer";

export type SerializedStamp = Stamp & {
  type?: SerializedStampType;
  loadingResource: boolean;
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
  const { resources: imageResources, loadUrl: loadImageUrl } = useStampImage();

  useEffect(() => {
    if (stampId && !imageResources[stampId]) {
      loadImageUrl(stampId);
    }
  }, [stampId, loadImageUrl]);

  const imageDataUrl = useMemo(() => {
    if (stampId && imageResources[stampId]?.dataUrl) return imageResources[stampId].dataUrl;
    else return undefined;
  }, [stampId, imageResources]);

  // スタンプ音声を取得
  const { resources: soundResources, loadUrl: loadSoundUrl } = useStampSound();

  useEffect(() => {
    if (stampId && !soundResources[stampId]) {
      loadSoundUrl(stampId);
    }
  }, [stampId, loadSoundUrl]);

  const soundDataUrl = useMemo(() => {
    if (stampId && soundResources[stampId]?.dataUrl) return soundResources[stampId].dataUrl;
    else return undefined;
  }, [stampId, soundResources]);

  // リソースのロード状況を取得する
  const loadingResource = useMemo(() => {
    // stampIdがundefinedの場合はロード中として処理
    if (!stampId) return true;

    const loadingImage = !imageResources[stampId] || imageResources[stampId].isDownloading;
    const loadingSound = !soundResources[stampId] || soundResources[stampId].isDownloading;
    return loadingImage || loadingSound;
  }, [imageResources, soundResources]);

  return {
    serializedStamp: stamp && {
      ...stamp,
      type: serializedStampType,
      loadingResource,
      imageDataUrl,
      soundDataUrl,
    },
  };
};
