import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Text, LogBox, Image } from 'react-native';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { useStore } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { teamInfo } from '@components/Home/dummy';
import { styles } from './style';

export default function Home() {
  LogBox.ignoreLogs(['Warning: Encountered two children with the same key,']); // toSetMarkedDatesObjects 함수에서 objectKey 중복에 대한 경고 무시하기
  const navigation = useNavigation();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const goBack = () => navigation.navigate('TabNavigator');
  const goBadge = () => navigation.navigate('Log');
  const goMembers = () => navigation.navigate('Members');

  return (
    <SafeAreaView style={[styles.container]}>
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
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <View style={{ marginBottom: '5%' }}>
              <Image
                source={require('@assets/images/crews/crew1.jpg')}
                style={[styles.profileImage]}
              />
            </View>
            <Text
              style={[
                styles.bigText,
                {
                  textAlign: 'left',
                  fontSize: S.fontSize.title,
                  color: 'black',
                },
              ]}
            >
              {teamInfo.name}
            </Text>
            <Text style={[S.styles.mediumText]}>
              {teamInfo.town} / {teamInfo.school}
            </Text>
            <Text
              style={[
                S.styles.bigText,
                { marginHorizontal: '10%', marginVertical: '5%' },
              ]}
            >
              {teamInfo.desc}
            </Text>
          </View>
          <View style={[styles.announcement]}>
            <AntDesign name="notification" size={30} />
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                marginHorizontal: '5%',
              }}
            >
              <Text style={[S.styles.bigText]}>최근 공지</Text>
              <Text>{teamInfo.announcement}</Text>
            </View>
          </View>
          <View style={[styles.statusContainer]}>
            <TouchableView style={[styles.infoWrapper, styles.borderRight]}>
              <Text style={[S.styles.bigText, { flex: 1 }]}>
                {teamInfo.score}점
              </Text>
              <Text style={[S.styles.mediumText, { flex: 1 }]}>점수</Text>
            </TouchableView>
            <TouchableView
              onPress={goBadge}
              style={[styles.infoWrapper, styles.borderRight]}
            >
              <Text style={[S.styles.bigText, { flex: 1 }]}>
                {teamInfo.badges.length}개
              </Text>
              <Text style={[S.styles.mediumText, { flex: 1 }]}>배지</Text>
            </TouchableView>
            <TouchableView
              onPress={goMembers}
              style={[styles.infoWrapper, styles.borderRight]}
            >
              <Text style={[S.styles.bigText, { flex: 1 }]}>
                {teamInfo.users.length}명
              </Text>
              <Text style={[S.styles.mediumText, { flex: 1 }]}>크루원</Text>
            </TouchableView>
            <TouchableView style={[styles.infoWrapper]}>
              <Text style={[S.styles.bigText, { flex: 1 }]}>
                {teamInfo.leader.name}
              </Text>
              <Text style={[S.styles.mediumText, { flex: 1 }]}>리더</Text>
            </TouchableView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
