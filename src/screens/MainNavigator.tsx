import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import OnBoarding from './OnBoarding';
import Splash from './Splash';
import PloggersHome from './PloggersHome';
import PloggersMyPage from './PloggersMyPage';
import PloggersCreateCrew from './PloggersCreateCrew';
import PloggersCrew from './PloggersCrew';
import PloggersSearchCrew from './PloggersSearchCrew';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, cardStyleInterpolator: forFade }}
    >
      {/* <Stack.Screen
        name="PloggersSearchCrew"
        component={PloggersSearchCrew}
      ></Stack.Screen> */}
      <Stack.Screen name="PloggersCrew" component={PloggersCrew}></Stack.Screen>
      <Stack.Screen
        name="PloggersCreateCrew"
        component={PloggersCreateCrew}
      ></Stack.Screen>
      <Stack.Screen
        name="PloggersMyPage"
        component={PloggersMyPage}
      ></Stack.Screen>
      <Stack.Screen name="PloggersHome" component={PloggersHome}></Stack.Screen>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
      ></Stack.Screen>
      <Stack.Screen name="OnBoarding" component={OnBoarding}></Stack.Screen>
      <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
    </Stack.Navigator>
  );
}

export const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
