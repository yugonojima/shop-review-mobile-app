import React, { useState } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserContext} from "./src/Context/UserContext";
import { initialUser, User } from "./src/types/user";

export default function App() {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user , setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
