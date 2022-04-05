import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer, { UserState } from "services/User/User";
import realtimeGrandPrixReducer, { RTGrandPrixState } from "services/RealtimeGrandPrix/RealtimeGrandPrix";
import stampsReducer, { StampsState } from "services/Stamps/Stamps";
import stampTypesReducer, { StampTypesState } from "services/StampTypes/StampTypes";
import grandPrixesReducer, { GrandPrixesState } from "services/GrandPrixes/GrandPrixes";
import StampResourcesReducer, { StampResourcesState } from "services/StampResources/StampResources";
import usersReducer, { UsersState } from "services/Users/Users";

export type RootState = {
  user: UserState;
  users: UsersState;
  realtimeGrandPrix: RTGrandPrixState;
  stamps: StampsState;
  stampTypes: StampTypesState;
  grandPrixes: GrandPrixesState;
  stampResources: StampResourcesState;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    realtimeGrandPrix: realtimeGrandPrixReducer,
    stamps: stampsReducer,
    stampTypes: stampTypesReducer,
    grandPrixes: grandPrixesReducer,
    stampResources: StampResourcesReducer,
  },
  middleware: [thunk],
});
