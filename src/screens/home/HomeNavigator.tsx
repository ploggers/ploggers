import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Details from "./Details";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Details" component={Details}></Stack.Screen>
    </Stack.Navigator>
  );
}
