import { useUsers } from "hooks/Users/Users";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { HotItem, PlainReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { OtherUser } from "services/Users/Users";
import { RootState } from "store";
import { SerializedStamp, useStampSerializer } from "./useStampSerializer";

export type SerializedPlainReaction = HotItem<PlainReaction> & {
  stamp?: SerializedStamp;
  sender?: OtherUser;
};

export type IResponse = {
  serializedPlainReaction?: SerializedPlainReaction;
};

/**
 * PlainReactionをシリアライズする
 * @param plainReactionId PlainReactionID
 * @returns シリアライズされたPlainReaction
 */
export const usePlainReactionSerializer = (plainReactionId?: string): IResponse => {
  // グランプリ情報を取得
  const realtimeGrandPrix = useSelector((state: RootState) => state.realtimeGrandPrix);

  // PlainReactionを取得
  const plainReaction = useMemo(() => {
    if (plainReactionId && realtimeGrandPrix.plainReactions.data[plainReactionId])
      return realtimeGrandPrix.plainReactions.data[plainReactionId];
    else return undefined;
  }, []);

  // スタンプを取得
  const { serializedStamp } = useStampSerializer(plainReaction?.stampId);

  // 送信者情報を取得
  const { users, load: loadUser } = useUsers();

  useEffect(() => {
    const senderId = plainReaction?.senderId;
    if (senderId && !users[senderId]) {
      loadUser(senderId);
    }
  }, [plainReaction?.senderId, loadUser]);

  const sender = useMemo(() => {
    const senderId = plainReaction?.senderId;
    if (senderId && users[senderId]) return users[senderId];
    else return undefined;
  }, [plainReaction?.senderId, users]);

  return {
    serializedPlainReaction: plainReaction && {
      ...plainReaction,
      stamp: serializedStamp,
      sender: sender,
    },
  };
};
