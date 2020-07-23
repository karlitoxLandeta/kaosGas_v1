import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";

const Stack = createStackNavigator();

export default function RestaurantsStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
        options={{ title: "Menu pedidos" }}
      />
    </Stack.Navigator>
  );
}
