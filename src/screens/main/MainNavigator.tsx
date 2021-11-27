import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '../auth/AuthNavigator';
import TabNavigator from '../TabNavigator';
import Splash from './Splash';
import CrewNavigator from '../crew/CrewNavigator';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, cardStyleInterpolator: forFade }}
    >
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
      ></Stack.Screen>
      <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
      <Stack.Screen
        name="CrewNavigator"
        component={CrewNavigator}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
