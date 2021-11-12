import { useNavigation, StackActions } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useStore } from 'react-redux';
import { NavigationHeader, TouchableView } from '../components';
import { MyCrewCarousel } from '../components/MyCrewCarousel';
import * as S from './Styles';
import * as L from '../store/login';
import * as U from '../utils';
import * as A from '../store/asyncStorage';
import * as I from '../store/isAuthorized';

/* TODO
1. 내 점수, 내 배지, 마이 크루 서버에서 데이터 GET
 */

export default function MyPage() {
  const store = useStore();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { name } = store.getState().login.loggedUser;

  const goFollowGroups = useCallback(() => {
    navigation.navigate('FollowGroups');
  }, []);

  const logout = useCallback(() => {
    dispatch(L.logoutAction());
    dispatch(A.setJWT('', ''));
    dispatch(I.setIsAuthorized(false));
    U.removeStorage(L.loggedUserKey);
    U.removeStorage('accessJWT');
    U.removeStorage('refreshJWT');
    navigation.dispatch(StackActions.popToTop());
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: S.colors.primary }]}
    >
      <NavigationHeader
        Right={() => (
          <TouchableView style={{ paddingHorizontal: '5%' }}>
            <AntDesign name="setting" size={30} color={'white'}></AntDesign>
          </TouchableView>
        )}
        viewStyle={{ borderBottomWidth: 0 }}
      ></NavigationHeader>

      <View style={{ height: '100%' }}>
        <View
          style={[
            styles.profileContainer,
            { backgroundColor: S.colors.primary },
          ]}
        >
          <View style={{ flex: 1, paddingHorizontal: '5%' }}>
            <Text
              style={[
                styles.bigText,
                { textAlign: 'left', fontSize: 35, color: 'white' },
              ]}
            >
              {name}님
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
          >
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
                  borderRightColor: S.colors.secondary,
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: S.colors.secondary,
                      paddingLeft: '10%',
                      paddingTop: '5%',
                      paddingBottom: '7%',
                    },
                  ]}
                >
                  내 점수
                </Text>
                <Text
                  style={[
                    styles.bigText,
                    {
                      paddingLeft: '10%',
                      color: S.colors.primary,
                      fontSize: 25,
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
                  borderRightColor: S.colors.secondary,
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: S.colors.secondary,
                      paddingLeft: '10%',
                      paddingTop: '5%',
                      paddingBottom: '7%',
                    },
                  ]}
                >
                  내 배지
                </Text>
                <Text
                  style={[
                    styles.bigText,
                    {
                      paddingLeft: '10%',
                      color: S.colors.primary,
                      fontSize: 25,
                      textAlign: 'left',
                    },
                  ]}
                >
                  3개
                </Text>
              </TouchableView>
              <TouchableView
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  height: '100%',
                  borderRightColor: S.colors.secondary,
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: S.colors.secondary,
                      paddingLeft: '10%',
                      paddingTop: '5%',
                      paddingBottom: '7%',
                    },
                  ]}
                >
                  내 크루
                </Text>
                <Text
                  style={[
                    styles.bigText,
                    {
                      paddingLeft: '10%',
                      color: S.colors.primary,
                      fontSize: 25,
                      textAlign: 'left',
                    },
                  ]}
                >
                  2개
                </Text>
              </TouchableView>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.menuContainer,
            { borderTopWidth: 6, borderColor: S.colors.secondary },
          ]}
        >
          <View style={{ flex: 1 }}>
            <TouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.mediumText]}>프로필 관리</Text>
            </TouchableView>
            <TouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.mediumText]}>설정</Text>
            </TouchableView>
            <TouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.mediumText]}>문의하기</Text>
            </TouchableView>
            <TouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}
              onPress={() => {
                Alert.alert('로그아웃하시겠습니까?', '', [
                  {
                    text: '아니요',
                  },
                  {
                    text: '네',
                    onPress: logout,
                  },
                ]);
              }}
            >
              <Text style={[styles.mediumText]}>로그아웃</Text>
            </TouchableView>
            <View style={{ flex: 1 }}></View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          ></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.5,
  },
  menuContainer: {
    flex: 2,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
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
});
