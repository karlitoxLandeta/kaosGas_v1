import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/Search";

const Stack = createStackNavigator();

export default function SearchStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: "Busca tu productos" }}
      />
    </Stack.Navigator>
  );
}
