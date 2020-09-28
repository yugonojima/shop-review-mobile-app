import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/*navigator*/
import { MainTabNavigator } from "./MainTabNavigator";
/*screen*/
import { AuthScreen } from "../screens/AuthScreen";
import { UserContext } from "../Context/UserContext";
export const AppNavigator = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
