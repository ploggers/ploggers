import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import * as U from '@utils';
import * as A from '@store/asyncStorage';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useStore } from 'react-redux';
import axios from 'axios';

export default function Badge({ id }: any) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const goSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);
  const goBack = () => navigation.goBack();
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [badges, setBadges] = useState<any[]>([]);

  const dispatch = useDispatch();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
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

  useEffect(() => {
    setLoading(true);
    getBadges().catch(async (e) => {
      const errorStatus = e.reponse.status;
      if (errorStatus === 401) {
        // accessToken 만료 -> accessToken 업데이트
        await updateToken();
      } else {
        Alert.alert('비정상적인 접근입니다');
      }
    });
  }, [accessToken]);

  const getBadges = async () => {
    await axios
      .get(`/api/crews/${id}/badges`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log('here', response.data);
        setBadges(response.data);
      })
      .then((_) => setLoading(false));
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Left={() => (
          <TouchableView style={{ paddingLeft: '2%' }} onPress={goBack}>
            <Icon
              name="chevron-back"
              size={30}
              style={{ color: 'black' }}
            ></Icon>
          </TouchableView>
        )}
        title="크루 배지"
        titleStyle={{ fontFamily: S.fonts.medium }}
        Right={() => (
          <TouchableView style={{ paddingRight: '2%' }} onPress={goSearch}>
            <Icon
              name="search-outline"
              size={30}
              style={{ color: 'transparent' }}
            ></Icon>
          </TouchableView>
        )}
      ></NavigationHeader>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={S.colors.primary} />
        </View>
      ) : (
        <View style={[S.styles.flex]}>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: S.colors.sub,
              alignItems: 'center',
              paddingBottom: 25,
            }}
          >
            {badges.length !== 0 ? (
              <>
                <View
                  style={{
                    flex: 4,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={[styles.badge, { marginTop: '5%' }]}
                    source={{
                      uri: `http://localhost:9179/api/badges/badge-${badges[selectedBadge].BadgeId}.png`,
                    }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      fontFamily: S.fonts.bold,
                      fontSize: S.fontSize.medium,
                      textAlign: 'center',
                    }}
                  >
                    {badges[selectedBadge].badge.name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: S.fontSize.small,
                      fontFamily: S.fonts.light,
                      paddingHorizontal: '20%',
                      paddingVertical: 3,
                    }}
                  >
                    {badges[selectedBadge].badge.desc}
                  </Text>
                </View>
              </>
            ) : (
              <Text>아직 배지가 없습니다!</Text>
            )}
          </View>
          <View style={[S.styles.flex]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: '2%',
              }}
            >
              {badges.map((elem, idx) => (
                <TouchableOpacity
                  key={elem.BadgeId}
                  onPress={() => setSelectedBadge(idx)}
                >
                  <Image
                    style={
                      idx === selectedBadge
                        ? [styles.badge, styles.selected]
                        : [styles.badge]
                    }
                    source={{
                      uri: `http://localhost:9179/api/badges/badge-${elem.BadgeId}.png`,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={[S.styles.flex]}></View>
        </View>
      )}
    </SafeAreaView>
  );
}
