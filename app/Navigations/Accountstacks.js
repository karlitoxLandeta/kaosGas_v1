import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountScreenStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={MyAccountScreen}
        options={{ title: "Mi Cuenta" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registrar" }}
      />
    </Stack.Navigator>
  );
}
