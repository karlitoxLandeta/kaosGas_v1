import React from "react";
import { Icon } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import SearchScreenStacks from "./SearchStacks";
import TopListsScreenStacks from "./TopListsStacks";
import AccountScreenStacks from "./Accountstacks";
import MyTiendaScreenStacks from "./MyTiendaStacks";
import UsuarioScreenStacks from "./UsuarioStacks";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="AccountScreenStacks"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "tomato",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="RestaurantsScreenStacks"
          component={RestaurantsScreenStacks}
          options={{ title: "Compromisos" }}
        />
        <Tab.Screen
          name="MyTiendaScreenStacks"
          component={MyTiendaScreenStacks}
          options={{ title: "Lista" }}
        />
        <Tab.Screen
          name="SearchScreenStacks"
          component={SearchScreenStacks}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="TopListsScreenStacks"
          component={TopListsScreenStacks}
          options={{ title: "Seguimientos" }}
        />

        <Tab.Screen
          name="AccountScreenStacks"
          component={AccountScreenStacks}
          options={{ title: "Mi Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "RestaurantsScreenStacks":
      iconName = "compass-outline";
      break;
    case "SearchScreenStacks":
      iconName = "magnify";
      break;
    case "TopListsScreenStacks":
      iconName = "star-outline";
      break;
    case "TopListsScreenStacks":
      iconName = "star-outline";
      break;
    case "AccountScreenStacks":
      iconName = "home-outline";
      break;
    case "MyTiendaScreenStacks":
      iconName = "home-outline";
      break;
    case "UsuarioScreenStacks":
      iconName = "user-alert-outline";
      break;

    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
