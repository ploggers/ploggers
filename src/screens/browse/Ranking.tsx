import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '@screens/Styles';
import { ActivityIndicator, Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';
import { useDispatch, useStore } from 'react-redux';
import axios from 'axios';
import * as U from '@utils';
import * as A from '@store/asyncStorage';

export default function Ranking() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [totalRanking, setTotalRanking] = useState<any[]>([]);
  const [schoolRanking, setSchoolRanking] = useState<any[]>([]);
  const dispatch = useDispatch();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    const jobs = [
      { path: '/api/crews/ranking-all', setFunc: setTotalRanking },
      { path: '/api/crews/ranking-school', setFunc: setSchoolRanking },
    ];
    setLoading(true);
    getFunc(jobs)
      .then((_) => setLoading(false))
      .catch(async (e) => {
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

  const getFunc = async (job: any[]) => {
    job.map(async (e: any) => {
      const response = await axios.get(e.path, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(e.path, response.data);
      e.setFunc(response.data);
    });
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        <Card>
          <Card.Content
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text>{index + 1}</Text>
              <View
                style={{
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: S.fonts.medium,
                    fontSize: 18,
                    marginBottom: 1,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: S.fonts.medium,
                    fontSize: 12,
                    color: 'grey',
                    marginBottom: 1,
                  }}
                >
                  {item.school}
                </Text>
              </View>
            </View>
            <View style={[styles.scoreBox]}>
              <Text style={[styles.scoreText]}>{`${item.crewScore}점`}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={[S.styles.flex]}>
      <NavigationHeader
        Left={() => (
          <TouchableView onPress={goBack} style={{ paddingLeft: '2%' }}>
            <Icon name="chevron-back" size={30}></Icon>
          </TouchableView>
        )}
        title="랭킹"
        titleStyle={{ fontFamily: S.fonts.medium }}
        Right={() => (
          <TouchableView style={{ paddingRight: '2%' }}>
            <Icon
              name="chevron-back"
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
        <>
          <View style={[styles.rankingCategoryContainer]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableView
                style={[
                  styles.categoryWrapper,
                  {
                    backgroundColor:
                      selectedCategory == '전체' ? S.colors.primary : 'white',
                    borderColor:
                      selectedCategory == '전체'
                        ? S.colors.primary
                        : S.colors.secondary,
                  },
                ]}
                onPress={() => setSelectedCategory('전체')}
              >
                <View style={[styles.category]}>
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color:
                          selectedCategory == '전체'
                            ? 'white'
                            : S.colors.primary,
                      },
                    ]}
                  >
                    전체
                  </Text>
                </View>
              </TouchableView>
              <TouchableView
                style={[
                  styles.categoryWrapper,
                  {
                    backgroundColor:
                      selectedCategory == '대학' ? S.colors.primary : 'white',
                    borderColor:
                      selectedCategory == '대학'
                        ? S.colors.primary
                        : S.colors.secondary,
                  },
                ]}
                onPress={() => setSelectedCategory('대학')}
              >
                <View style={[styles.category]}>
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color:
                          selectedCategory == '대학'
                            ? 'white'
                            : S.colors.primary,
                      },
                    ]}
                  >
                    대학
                  </Text>
                </View>
              </TouchableView>
            </View>
          </View>
          <View style={{ flex: 4, paddingHorizontal: '5%' }}>
            <FlatList
              data={selectedCategory === '전체' ? totalRanking : schoolRanking}
              renderItem={renderItem}
              keyExtractor={(item, index) => `_key${index.toString()}`}
              ListFooterComponent={
                loading ? (
                  <ActivityIndicator size="large" color={S.colors.primary} />
                ) : (
                  <></>
                )
              }
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
