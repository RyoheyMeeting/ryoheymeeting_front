import { useCallback, useState } from "react";
import { useRealtimeGrandPrix } from "hooks/RealtimeGrandPrix/useRealtimeGrandPrix";
import {
  ActionList,
  BoostAction,
  HotItem,
  MessageReaction,
  MuteAction,
  PlainReaction,
} from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { ButtonOpts, Dict } from "Types/Utils";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Stamp } from "services/Stamps/Stamps";

export type IResponse = {
  plainReactions: ActionList<HotItem<PlainReaction>>;
  messageReactions: ActionList<HotItem<MessageReaction>>;
  boostActions: ActionList<HotItem<BoostAction>>;
  muteActions: ActionList<HotItem<MuteAction>>;
  stamps: Dict<Stamp>;
  changeStampId: {
    value: string;
    handler: (value: string) => void;
  };
  changeStrength: {
    value: number;
    handler: (value: number) => void;
  };
  changeMessage: {
    value: string;
    handler: (value: string) => void;
  };
  sendReactionBtn: ButtonOpts;
  sendMessageBtn: ButtonOpts;
};

export const useAudiencePanelState = (): IResponse => {
  const { realtimeGrandPrix, addPlainReaction, addMessageReaction } = useRealtimeGrandPrix();
  const { id: userId } = useSelector((state: RootState) => state.user);
  const { stamps } = useSelector((state: RootState) => state.stamps);
  const [stampId, setStampId] = useState<string>();
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState("");

  const _changeStampIdHandler = useCallback((value: string) => {
    setStampId(value);
  }, []);

  const _changeStrengthHandler = useCallback((value: number) => {
    setStrength(value);
  }, []);

  const _changeMessageHandler = useCallback((value: string) => {
    setMessage(value);
  }, []);

  const _sendPlainReaction = useCallback(() => {
    if (userId && stampId) {
      addPlainReaction({
        stampId: stampId,
        sendAt: new Date(Date.now()),
        senderId: userId,
        strength: strength,
      });
      setStrength(0);
      setStampId(undefined);
    }
  }, [userId, stampId, strength, addPlainReaction]);

  const _sendMessageReaction = useCallback(() => {
    if (userId && stampId) {
      addMessageReaction({
        stampId: stampId,
        sendAt: new Date(Date.now()),
        senderId: userId,
        message: message,
      });
      setMessage("");
      setStampId(undefined);
    }
  }, [userId, stampId, message, addMessageReaction]);

  return {
    plainReactions: realtimeGrandPrix.plainReactions,
    messageReactions: realtimeGrandPrix.messageReactions,
    boostActions: realtimeGrandPrix.boostActions,
    muteActions: realtimeGrandPrix.muteActions,
    stamps: stamps,
    changeStampId: {
      value: stampId || "",
      handler: _changeStampIdHandler,
    },
    changeStrength: {
      value: strength,
      handler: _changeStrengthHandler,
    },
    changeMessage: {
      value: message,
      handler: _changeMessageHandler,
    },
    sendReactionBtn: {
      disabled: !stampId || strength <= 0,
      handler: _sendPlainReaction,
    },
    sendMessageBtn: {
      disabled: !stampId || message == "",
      handler: _sendMessageReaction,
    },
  };
};
