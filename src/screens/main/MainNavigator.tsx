import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '../auth/AuthNavigator';
import TabNavigator from '../TabNavigator';
import Splash from './Splash';
import PloggersCrew from '../crew/PloggersCrew';

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
      <Stack.Screen name="PloggersCrew" component={PloggersCrew}></Stack.Screen>
    </Stack.Navigator>
  );
}

export const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
