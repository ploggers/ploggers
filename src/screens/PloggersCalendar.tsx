import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  LogBox,
  Alert,
  Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationHeader,
  TouchableView,
  CalendarView,
  dayType,
  Agenda,
} from '../components';
import * as U from '../utils';
import * as I from '../store/isAuthorized';
import * as S from './Styles';
import * as A from '../store/asyncStorage';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useStore } from 'react-redux';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { isEqual } from 'lodash';
import { getCookie } from '../utils';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

export default function Home() {
  LogBox.ignoreLogs(['Warning: Encountered two children with the same key,']); // toSetMarkedDatesObjects 함수에서 objectKey 중복에 대한 경고 무시하기
  const navigation = useNavigation();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [today, setToday] = useState<string>(moment().format('YYYY-MM-DD'));
  const [currentYearMonth, setCurrentYearMonth] = useState<string>(
    moment().format('YYYY-MM'),
  );
  const [monthlyEventData, setMonthEventData] = useState<Array<any>>([]);
  const prevMonthEventData = useRef(monthlyEventData);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [pastSelectedDate, setPastSelectedDate] = useState<string>('');
  const [agendaData, setAgendaData] = useState<Array<any>>([
    {
      title: 'hi',
      location: '북악산',
      start: '11:00',
      end: '13:00',
      notice: '북악산 이벤트',
      memo: '북악산 이벤트',
      color: 'blue',
    },
  ]);

  const dummy = [
    {
      group: 'hi',
      location: '북악산',
      start: '11:00',
      end: '13:00',
      notice: '북악산 이벤트',
      memo: '북악산 이벤트',
      color: 'blue',
    },
  ];

  const dispatch = useDispatch();

  const goBack = () => {
    navigation.navigate('TabNavigator');
  };

  useEffect(() => {
    // 캘린더 마킹
    if (
      monthlyEventData &&
      !isEqual(monthlyEventData, prevMonthEventData.current)
    ) {
      prevMonthEventData.current = monthlyEventData;
      setMarkedDates({});
      markCalendar();
    }
  });

  const toSetMarkedDatesObjects = (monthlyEventData: Array<any>) => {
    const objects: any = {};
    objects[today] = {
      selected: true,
      selectedColor: S.colors.primary,
      dots: [],
    };
    for (let i = 0; i < monthlyEventData.length; ++i) {
      const objectKey = monthlyEventData[i].date;
      const groupId = monthlyEventData[i].GroupId.toString();
      const color = monthlyEventData[i].color;
      const selected = objectKey === today ? true : false;

      objectKey in objects
        ? (objects[objectKey] = {
            ...objects[objectKey],
            dots: [...objects[objectKey].dots, { key: groupId, color: color }],
          })
        : (objects[objectKey] = {
            selected: selected,
            dots: [{ key: groupId, color: color }],
          });
    }
    return objects;
  };

  const toAgendaType = (arr: Array<any>) => {
    const agenda = [];
    for (let i = 0; i < arr.length; ++i) {
      const object: any = {};
      object.title = arr[i].title;
      object.data = [
        {
          group: arr[i].groupName,
          location: arr[i].location,
          start: arr[i].startTime?.slice(0, 5),
          end: arr[i].endTime?.slice(0, 5),
          notice: arr[i].notice,
          memo: arr[i].memo,
          color: arr[i].color,
        },
      ];
      agenda.push(object);
    }
    return agenda;
  };

  const markCalendar = async () => {
    const toBeMarkedDatesObjects = await toSetMarkedDatesObjects(
      monthlyEventData,
    );

    setMarkedDates(toBeMarkedDatesObjects);

    // 오늘의 아젠다 불러오기
    const todayAgenda = await Promise.all(
      monthlyEventData.filter((event) => event.date == today),
    );
    todayAgenda.sort((a, b) =>
      a.startTime > b.startTime
        ? 1
        : a.startTime == b.startTime
        ? a.GroupId > b.GroupId
          ? 1
          : -1
        : -1,
    );
    setAgendaData(toAgendaType(todayAgenda));
  };

  const onDayPress = async (day: dayType) => {
    const selectedDate = day.dateString;
    // markDates 업데이트
    const newMark = {
      ...markedDates,
      [pastSelectedDate]: {
        ...markedDates[pastSelectedDate],
        selected: false,
      },
      [selectedDate]: { ...markedDates[selectedDate], selected: true },
    };
    setMarkedDates(newMark);
    if (selectedDate === today) {
      setPastSelectedDate('');
    } else {
      setPastSelectedDate(selectedDate);
    }
    // 아젠다 업데이트
    const updatedAgenda = await Promise.all(
      monthlyEventData.filter(
        (event) => event.date.slice(0, 10) == selectedDate,
      ),
    );
    updatedAgenda.sort((a, b) =>
      a.startTime > b.startTime
        ? 1
        : a.startTime == b.startTime
        ? a.GroupId > b.GroupId
          ? 1
          : -1
        : -1,
    );
    setAgendaData(toAgendaType(updatedAgenda));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: S.colors.sub }]}>
      <NavigationHeader
        Left={() => (
          <TouchableView style={{ paddingLeft: '2%' }} onPress={goBack}>
            <Icon name="close" size={30} style={{ color: 'black' }}></Icon>
          </TouchableView>
        )}
        titleStyle={{ fontFamily: S.fonts.medium }}
        Right={() => (
          <TouchableView style={{ paddingRight: '2%' }}>
            <Icon
              name="search-outline"
              size={30}
              style={{ color: 'transparent' }}
            ></Icon>
          </TouchableView>
        )}
        viewStyle={{ borderBottomWidth: 0 }}
      ></NavigationHeader>
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.profileContainer,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View
              style={{
                padding: '5%',
              }}
            >
              <Text
                style={[
                  styles.bigText,
                  {
                    textAlign: 'left',
                    fontSize: S.fontSize.title,
                    color: 'black',
                    marginBottom: '3%',
                  },
                ]}
              >
                피포피포
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={[styles.label]}>리더</Text>
                  <Text style={[styles.content]}>김쓰줍</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={[styles.label]}>크루원</Text>
                  <Text style={[styles.content]}>5명</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={[styles.label]}>지역</Text>
                  <Text style={[styles.content]}>마포구</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={[styles.label]}>대학교</Text>
                  <Text style={[styles.content]}>서강대학교</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginRight: '5%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <Image
                source={require('../assets/images/crews/crew1.jpg')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            </View>
          </View>
          <View style={{ height: '9%' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderBottomColor: S.colors.secondary,
              }}
            >
              <TouchableView
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  height: '100%',
                  borderRightColor: S.colors.sub,
                  backgroundColor: 'white',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontFamily: S.fonts.bold,
                      fontSize: S.fontSize.medium,
                      color: S.colors.secondary,
                      paddingLeft: '10%',
                      paddingTop: '5%',
                      paddingBottom: '5%',
                    },
                  ]}
                >
                  크루 점수
                </Text>
                <Text
                  style={[
                    styles.bigText,
                    {
                      paddingLeft: '10%',
                      color: S.colors.primary,
                      fontSize: S.fontSize.medium,
                      textAlign: 'left',
                    },
                  ]}
                >
                  940점
                </Text>
              </TouchableView>
              <TouchableView
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  height: '100%',
                  backgroundColor: 'white',
                }}
              >
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: S.colors.secondary,
                      fontFamily: S.fonts.bold,
                      fontSize: S.fontSize.medium,
                      paddingLeft: '10%',
                      paddingTop: '5%',
                      paddingBottom: '5%',
                    },
                  ]}
                >
                  크루 배지
                </Text>
                <Text
                  style={[
                    styles.bigText,
                    {
                      paddingLeft: '10%',
                      color: S.colors.primary,
                      fontSize: S.fontSize.medium,
                      textAlign: 'left',
                    },
                  ]}
                >
                  3개
                </Text>
              </TouchableView>
            </View>
          </View>
          <View style={[styles.calendarViewContainer]}>
            <CalendarView
              onVisibleMonthsChange={(month) =>
                setCurrentYearMonth(
                  moment(month[0].dateString).format('YYYY-MM'),
                )
              }
              onDayPress={onDayPress}
              markedDates={markedDates}
            />
          </View>
          <View style={[styles.agendaContainer]}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
              }}
            >
              <Text style={[styles.agendaText]}>일정</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

{
  /* <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
<View style={{ flex: 1 }}>
  <View
    style={[
      styles.profileContainer,
      {
        flex: 1,
        flexDirection: 'row',
      },
    ]}
  >
    <View
      style={{
        padding: '5%',
        backgroundColor: 'green',
      }}
    >
      <Text
        style={[
          styles.bigText,
          {
            textAlign: 'left',
            fontSize: S.fontSize.title,
            color: 'black',
            marginBottom: '3%',
          },
        ]}
      >
        피포피포
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={[styles.label, { flex: 1 }]}>리더</Text>
        <Text style={[styles.content, { flex: 1 }]}>김쓰줍</Text>
        <Text style={[styles.label, { flex: 1 }]}>크루원</Text>
        <Text style={[styles.content, { flex: 1 }]}>5명</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '90%' }}>
        <Text style={[styles.label, { flex: 1 }]}>리더</Text>
        <Text style={[styles.content, { flex: 1 }]}>김쓰줍</Text>
      </View>
    </View>
    <View
      style={{
        justifyContent: 'center',
        marginRight: '5%',
        backgroundColor: 'green',
      }}
    >
      <Image
        source={require('../assets/images/crews/crew1.jpg')}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
    </View>
  </View>
  <View style={[styles.calendarViewContainer]}>
    <CalendarView
      onVisibleMonthsChange={(month) =>
        setCurrentYearMonth(
          moment(month[0].dateString).format('YYYY-MM'),
        )
      }
      onDayPress={onDayPress}
      markedDates={markedDates}
    />
  </View>
  <View style={[styles.agendaContainer]}>
    <View
      style={{
        marginBottom: 10,
        flexDirection: 'row',
      }}
    >
      <Text style={[styles.agendaText]}>일정</Text>
    </View>
  </View>
</View>
</ScrollView> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarViewContainer: {
    flex: 1,
    paddingTop: '5%',
  },
  agendaContainer: {
    paddingHorizontal: '5%',
    paddingTop: '5%',
    height: '100%',
    backgroundColor: 'white',
  },
  agendaText: {
    fontFamily: S.fonts.bold,
    fontSize: S.fontSize.medium,
  },
  profileContainer: {
    height: '30%',
  },
  bigText: {
    fontFamily: S.fonts.bold,
    textAlign: 'center',
    fontSize: 18,
  },
  mediumText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
  },
  content: {
    fontSize: S.fontSize.small,
    color: '#000',
    marginVertical: '2%',
    fontFamily: S.fonts.light,
  },
  label: {
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.small,
    color: S.colors.secondary,
    marginVertical: '2%',
    marginRight: '3%',
  },
});
