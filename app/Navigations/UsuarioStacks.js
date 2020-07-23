import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UsuarioScreen from "../screens/Usuario/Usuario";

const Stack = createStackNavigator();

export default function TopListStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UsuarioScreen"
        component={UsuarioScreen}
        options={{ title: "Usuario" }}
      />
    </Stack.Navigator>
  );
}
