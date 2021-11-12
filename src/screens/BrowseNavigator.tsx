import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Browse from "./Browse";
import Search from "./Search";

const Stack = createStackNavigator();

export default function BrowseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Browse" component={Browse}></Stack.Screen>
      <Stack.Screen name="Search" component={Search}></Stack.Screen>
    </Stack.Navigator>
  );
}
