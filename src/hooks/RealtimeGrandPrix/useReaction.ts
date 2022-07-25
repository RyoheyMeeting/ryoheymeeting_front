import { useSelector } from "react-redux";
import { Reaction } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import { Stamp } from "services/Stamps/Stamps";
import { StampType } from "services/StampTypes/StampTypes";
import { OtherUser } from "services/Users/Users";
import { RootState } from "store";

export type IResponse = Reaction & {
  stamp?: Stamp & {
    type?: StampType;
  };
  sender?: OtherUser;
};

export const useReaction = (reaction: Reaction): IResponse => {
  const { users } = useSelector((state: RootState) => state.users);
  const { stamps } = useSelector((state: RootState) => state.stamps);
  const { stampTypes } = useSelector((state: RootState) => state.stampTypes);
  return {
    ...reaction,
    sender: users[reaction.senderId],
    stamp: {
      ...stamps[reaction.stampId],
      type:
        stamps[reaction.stampId] &&
        (stamps[reaction.stampId].typeId in stampTypes ? true : undefined) &&
        stampTypes[stamps[reaction.stampId].typeId],
    },
  };
};
