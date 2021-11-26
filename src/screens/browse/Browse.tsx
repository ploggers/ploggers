import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { MyCrewCarousel } from '@components/MyCrewCarousel';
import { EventCarousel } from '@components/EventCarousel';
import { CrewNews } from '@components/CrewNews';
import { NewsDummy } from '@components/Home/dummy';
import { styles } from './style';
import axios from 'axios';
import { useDispatch, useStore } from 'react-redux';
import * as U from '@utils';
import * as A from '@store/asyncStorage';
import { getCookie } from '@utils/getCookie';

export default function Browse() {
  const dispatch = useDispatch();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [myTeams, setMyTeams] = useState<any[]>([]);
  const goSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  const goRanking = () => navigation.navigate('Ranking');
  const goCreateCrew = () => navigation.navigate('PloggersCreateCrew');

  useEffect(() => {
    getMyCrews().catch(async (e) => {
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
          const renewedAccessToken = getCookie(tokens, 'accessToken');
          U.writeToStorage('accessJWT', renewedAccessToken);
          dispatch(A.setJWT(renewedAccessToken, refreshJWT));
          setAccessToken(renewedAccessToken);
        });
    });
  };

  const getMyCrews = async () => {
    axios
      .get('/api/users/mycrews', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setMyTeams(response.data);
      });
  };

  return (
    <SafeAreaView style={[S.styles.flex]}>
      <NavigationHeader
        Left={() => (
          <TouchableView style={{ paddingLeft: '2%' }}>
            <Icon
              name="chevron-back"
              size={30}
              style={{ color: 'transparent' }}
            ></Icon>
          </TouchableView>
        )}
        title="지구를 지키는 달리기"
        titleStyle={{ fontFamily: S.fonts.medium }}
        Right={() => (
          <TouchableView style={{ paddingRight: '2%' }} onPress={goSearch}>
            <Icon
              name="search-outline"
              size={30}
              style={{ color: 'black' }}
            ></Icon>
          </TouchableView>
        )}
      ></NavigationHeader>
      <ScrollView
        style={[S.styles.flex]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.menuContainer]}>
          <View style={[styles.iconContainer]}>
            <TouchableOpacity style={[styles.iconWrapper]} onPress={goRanking}>
              <Icon
                name={'trophy'}
                size={50}
                style={[styles.rankingIcon]}
              ></Icon>
              <Text style={[styles.menuText]}>랭킹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconWrapper]}>
              <Icon name={'people'} size={50} style={[styles.crewIcon]}></Icon>
              <Text style={[styles.menuText]}>크루 모집</Text>
            </TouchableOpacity>
            <View style={[styles.iconWrapper]}></View>
            <View style={[styles.iconWrapper]}></View>
          </View>
        </View>
        <View style={[styles.myCrewContainer]}>
          <Text style={[S.styles.bigText, styles.contentTitle]}>내 크루</Text>
          <MyCrewCarousel myTeams={myTeams} />
        </View>
        <View style={[styles.eventContainer]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[S.styles.bigText, styles.contentTitle]}>이벤트</Text>
            <TouchableOpacity>
              <Text style={[styles.totalViewText]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <EventCarousel />
        </View>
        <View style={[styles.newsContainer]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[S.styles.bigText, styles.contentTitle]}>
              크루 소식
            </Text>
            <TouchableOpacity>
              <Text style={[styles.totalViewText]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: '5%' }}>
            <CrewNews dataArray={NewsDummy} />
          </View>
        </View>
      </ScrollView>
      <Icon
        style={[styles.insertBtn]}
        onPress={goCreateCrew}
        name="add-circle"
        size={80}
      />
      <View style={[styles.insertBtnBackground]}></View>
    </SafeAreaView>
  );
}
