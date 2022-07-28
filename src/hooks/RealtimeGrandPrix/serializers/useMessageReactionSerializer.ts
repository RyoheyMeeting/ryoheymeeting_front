import { useUsers } from "hooks/Users/Users";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { HotItem, MessageReaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { OtherUser } from "services/Users/Users";
import { RootState } from "store";
import { SerializedStamp, useStampSerializer } from "./useStampSerializer";

export type SerializedMessageReaction = HotItem<MessageReaction> & {
  stamp?: SerializedStamp;
  sender?: OtherUser;
};

export type IResponse = {
  serializedMessageReaction?: SerializedMessageReaction;
};

/**
 * MessageReactionをシリアライズする
 * @param messageReactionId MessageReactionID
 * @returns シリアライズされたMessageReaction
 */
export const useMessageReactionSerializer = (messageReactionId?: string): IResponse => {
  // グランプリ情報を取得
  const realtimeGrandPrix = useSelector((state: RootState) => state.realtimeGrandPrix);

  // MessageReactionを取得
  const messageReaction = useMemo(() => {
    if (messageReactionId && realtimeGrandPrix.messageReactions.data[messageReactionId])
      return realtimeGrandPrix.messageReactions.data[messageReactionId];
    else return undefined;
  }, []);

  // スタンプを取得
  const { serializedStamp } = useStampSerializer(messageReaction?.stampId);

  // 送信者情報を取得
  const { users, load: loadUser } = useUsers();

  useEffect(() => {
    const senderId = messageReaction?.senderId;
    if (senderId && !users[senderId]) {
      loadUser(senderId);
    }
  }, [messageReaction?.senderId, loadUser]);

  const sender = useMemo(() => {
    const senderId = messageReaction?.senderId;
    if (senderId && users[senderId]) return users[senderId];
    else return undefined;
  }, [messageReaction?.senderId, users]);

  return {
    serializedMessageReaction: messageReaction && {
      ...messageReaction,
      stamp: serializedStamp,
      sender: sender,
    },
  };
};
