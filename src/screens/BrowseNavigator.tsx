import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Browse from './Browse';
import Search from './Search';
import Ranking from '../components/Ranking';
import PloggersCreateCrew from './PloggersCreateCrew';
import PloggersCrew from './PloggersCrew';

const Stack = createStackNavigator();

export default function BrowseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Browse" component={Browse}></Stack.Screen>
      <Stack.Screen name="Search" component={Search}></Stack.Screen>
      <Stack.Screen name="Ranking" component={Ranking}></Stack.Screen>
      <Stack.Screen
        name="PloggersCreateCrew"
        component={PloggersCreateCrew}
      ></Stack.Screen>
      <Stack.Screen name="PloggersCrew" component={PloggersCrew}></Stack.Screen>
    </Stack.Navigator>
  );
}
