import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  LogBox,
  Image,
  SectionList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { useDispatch, useStore } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';
import { Agenda } from '@components/Agenda';
import { teamInfo as dummy } from '@components/Home/dummy';
import axios from 'axios';
import * as U from '@utils';
import * as A from '@store/asyncStorage';

export default function CrewHome({ id }: any) {
  console.log(id);
  LogBox.ignoreLogs(['Warning: Encountered two children with the same key,']); // toSetMarkedDatesObjects 함수에서 objectKey 중복에 대한 경고 무시하기
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const [loading, setLoading] = useState<boolean>(true);
  const [teamInfo, setTeamInfo] = useState<any>({});
  const [badgeNum, setBadgeNum] = useState<number>(0);
  const [location, setLocation] = useState<string>();
  const [leader, setLeader] = useState<string>();

  const goBack = () => navigation.navigate('TabNavigator');
  const goBadge = () => navigation.navigate('Log');
  const goMembers = () => navigation.navigate('Members');

  const [agendaData, setAgendaData] = useState<Array<any>>([]);

  useEffect(() => {
    setLoading(true);
    getCrewInfo().catch(async (e) => {
      const errorStatus = e.reponse.status;
      if (errorStatus === 401) {
        // accessToken 만료 -> accessToken 업데이트
        await updateToken();
      } else {
        Alert.alert('비정상적인 접근입니다');
      }
    });
  }, [accessToken]);

  const updateToken = async () => {
    U.readFromStorage('refreshJWT').then((refreshJWT: any) => {
      // accessJWT 재발급
      axios
        .get('/api/users/refresh-access', {
          headers: { Authorization: `Bearer ${refreshJWT}` },
        })
        .then((response) => {
          const tokens = response.headers['set-cookie'][0];
          const renewedAccessToken = U.getCookie(tokens, 'accessToken');
          U.writeToStorage('accessJWT', renewedAccessToken);
          dispatch(A.setJWT(renewedAccessToken, refreshJWT));
          setAccessToken(renewedAccessToken);
        });
    });
  };

  const getCrewInfo = async () => {
    await axios
      .get(`/api/crews/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setTeamInfo(response.data[0]);
        setLocation(response.data[0].location.dongnM);
        setLeader(response.data[0].leader.name);
      })
      .then((_) => setLoading(false));
    // .then((response) => {
    //   axios.get(`/api/crews/${teamInfo.id}/badges-count`).then((res) => {
    //     // setBadgeNum()
    //     console.log('badges', res.data);
    //   });
    // });
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
        viewStyle={{
          borderBottomWidth: 0,
        }}
      ></NavigationHeader>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={S.colors.primary} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: S.colors.sub,
              }}
            >
              <View style={{ marginBottom: '5%' }}>
                <Image
                  source={{
                    uri: `https://ploggers.loca.lt/api/crews/crew_profiles/${teamInfo.id}.jpg`,
                  }}
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
              <Text style={[S.styles.mediumText, { color: 'gray' }]}>
                {location} / {teamInfo.school}
              </Text>
              <Text
                style={[
                  S.styles.bigText,
                  { marginHorizontal: '10%', marginVertical: '5%' },
                ]}
              >
                {teamInfo.text}
              </Text>
            </View>
            <View style={{ backgroundColor: 'white' }}>
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
                  <Text>{dummy.announcement}</Text>
                </View>
              </View>
              <View style={[styles.statusContainer]}>
                <TouchableView style={[styles.infoWrapper, styles.borderRight]}>
                  <Text style={[S.styles.bigText, S.styles.flex]}>
                    {teamInfo.crewScore}점
                  </Text>
                  <Text
                    style={[S.styles.mediumText, { flex: 1, color: 'gray' }]}
                  >
                    점수
                  </Text>
                </TouchableView>
                <TouchableView
                  onPress={goBadge}
                  style={[styles.infoWrapper, styles.borderRight]}
                >
                  <Text style={[S.styles.bigText, S.styles.flex]}>
                    {dummy.badges.length}개
                  </Text>
                  <Text
                    style={[S.styles.mediumText, { flex: 1, color: 'gray' }]}
                  >
                    배지
                  </Text>
                </TouchableView>
                <TouchableView
                  onPress={goMembers}
                  style={[styles.infoWrapper, styles.borderRight]}
                >
                  <Text style={[S.styles.bigText, S.styles.flex]}>
                    {dummy.users.length}명
                  </Text>
                  <Text
                    style={[S.styles.mediumText, { flex: 1, color: 'gray' }]}
                  >
                    크루원
                  </Text>
                </TouchableView>
                <TouchableView style={[styles.infoWrapper]}>
                  <Text style={[S.styles.bigText, S.styles.flex]}>
                    {leader}
                  </Text>
                  <Text
                    style={[S.styles.mediumText, { flex: 1, color: 'gray' }]}
                  >
                    리더
                  </Text>
                </TouchableView>
              </View>
            </View>
          </View>
          <View style={[styles.agendaContainer]}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
              }}
            >
              <Text style={[styles.agendaText]}>다가오는 일정</Text>
            </View>
            <SectionList
              disableVirtualization={false}
              stickySectionHeadersEnabled={false}
              sections={agendaData}
              renderItem={({ item, section }: any) => (
                <Agenda title={section.title} data={item} />
              )}
              keyExtractor={(item: any, index: number) => item.group + index}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
