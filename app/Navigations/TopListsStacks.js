import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurantsScreen from "../screens/TopRestaurants";

const Stack = createStackNavigator();

export default function TopListStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopRestaurantsScreen"
        component={TopRestaurantsScreen}
        options={{ title: "CAMP" }}
      />
    </Stack.Navigator>
  );
}
