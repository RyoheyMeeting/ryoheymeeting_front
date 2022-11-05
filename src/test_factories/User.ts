import { User, UserRole } from "services/User/User";

export const testCommonUser: User = {
  displayName: "山野太郎",
  photoURL: "logo512.png",
  role: UserRole.common,
  collvoPoint: 1024,
  lastLoggedIn: new Date(2022, 11, 6, 2, 14, 32, 5),
  registeredAt: new Date(2022, 8, 5, 1, 11, 12, 3),
  stamps: [],
  participateInfos: [],
  portfolios: [],
};
