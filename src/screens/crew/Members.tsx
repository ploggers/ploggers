import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useStore } from 'react-redux';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import * as U from '@utils';
import * as A from '@store/asyncStorage';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Avatar, Card } from 'react-native-paper';
import { members } from '@components/Home/dummy';
import { styles } from './style';
import axios from 'axios';

export default function Members() {
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState<Array<any>>(members);
  const dispatch = useDispatch();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);

  useEffect(() => {
    setLoading(true);
    getMembers().catch(async (e) => {
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

  const getMembers = async () => {
    console.log('get members');
    setLoading(false);
  };

  const renderItem = (item: any) => {
    return (
      <View style={[S.styles.flex]}>
        <Card>
          <Card.Content>
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar.Text
                label={item.item.name[0]}
                size={50}
                style={{ backgroundColor: S.colors.primary }}
                color="white"
                labelStyle={{ fontFamily: S.fonts.bold, fontSize: 25 }}
              />
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
                  {item.item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: S.fonts.medium,
                    fontSize: 12,
                    color: 'grey',
                    marginBottom: 1,
                  }}
                >
                  {item.item.role}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Right={() => <TouchableView></TouchableView>}
      ></NavigationHeader>
      <View style={[styles.searchContainer]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <TouchableView style={[styles.searchBar]} activeOpacity={0.7}>
            <Text>
              <Icon name="search-outline" size={20}></Icon>
              <Text
                style={{
                  fontFamily: S.fonts.medium,
                  fontSize: 20,
                  color: 'grey',
                }}
              >
                구성원의 이름을 검색하세요
              </Text>
            </Text>
          </TouchableView>
        </View>
      </View>
      <View style={{ flex: 4 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={S.colors.primary} />
          </View>
        ) : (
          <FlatList
            data={searchedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            onEndReachedThreshold={0.8}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="large" color={S.colors.primary} />
              ) : (
                <></>
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
