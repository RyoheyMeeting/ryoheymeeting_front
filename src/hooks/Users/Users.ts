import { useDispatch, useSelector } from "react-redux";
import { loadUserAsync, OtherUser } from "services/Users/Users";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type IResponse = {
  users: Dict<OtherUser>;
  load: (userId: string) => void;
};

export const useUsers = (): IResponse => {
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const _load = (userId: string) => {
    dispatch(loadUserAsync(userId));
  };

  return {
    users: users,
    load: _load,
  };
};
