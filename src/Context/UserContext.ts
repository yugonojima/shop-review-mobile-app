import { createContext } from "react";
import { User } from "../types/user";

export type UsercontextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UsercontextValue>({
  user: null,
  setUser: () => {},
});
