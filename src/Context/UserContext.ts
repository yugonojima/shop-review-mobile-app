import { createContext } from "react";
import { User } from "../types/user";

export type UsercontextValue = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UsercontextValue>({
  user: undefined,
  setUser: () => {},
});
