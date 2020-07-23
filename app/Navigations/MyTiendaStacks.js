import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTiendaScreen from "../screens/MyTienda/MyTienda";
import AddMyTienda from "../screens/MyTienda/AddMyTienda";

const Stack = createStackNavigator();

export default function TopListStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTiendaScreen"
        component={MyTiendaScreen}
        options={{ title: "Tienda" }}
      />
      <Stack.Screen
        name="Add-Tienda"
        component={AddMyTienda}
        options={{ title: "GESTION" }}
      />
    </Stack.Navigator>
  );
}
