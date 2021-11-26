import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CrewHome from './CrewHome';
import Chat from './Chat';
import Members from './Members';
import Badge from './Badge';
import Calendar from './Calendar';

import type { RouteProp, ParamListBase } from '@react-navigation/native';
import * as S from '../Styles';

type TabBarIconProps = { focused: boolean; color: string; size: number };

const icons: Record<string, string[]> = {
  Home: ['home', 'home-outline'],
  Chat: ['chatbubble', 'chatbubble-ellipses-outline'],
  Calendar: ['calendar', 'ios-calendar-sharp'],
  Log: ['document-text', 'document-text-outline'],
  MyPage: ['person', 'person-outline'],
};
const screenOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}) => {
  return {
    tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
      const { name } = route;
      const focusedSize = size;
      const focusedColor = focused ? Colors.black : color;
      const [icon, iconOutline] = icons[name];
      const iconName = focused ? icon : iconOutline;
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
    },
  };
};

const Tab = createBottomTabNavigator();

export default function PloggersCrew() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: S.colors.sub },
        activeTintColor: Colors.black,
        labelStyle: {
          fontFamily: S.fonts.medium,
        },
      }}
      screenOptions={screenOptions}
      sceneContainerStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Home"
        component={CrewHome}
        options={{ tabBarLabel: '홈' }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ tabBarLabel: '채팅' }}
      ></Tab.Screen>
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ tabBarLabel: '일정' }}
      ></Tab.Screen>
      <Tab.Screen
        name="Log"
        component={Badge}
        options={{ tabBarLabel: '활동기록' }}
      ></Tab.Screen>
      <Tab.Screen
        name="MyPage"
        component={Members}
        options={{ tabBarLabel: '구성원' }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
