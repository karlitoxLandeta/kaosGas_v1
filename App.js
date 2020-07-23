import React from "react";
import { YellowBox } from "react-native";
import { firebaseApp } from "./app/utils/FireBase";
import Navigation from "./app/Navigations/Navigation";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}
