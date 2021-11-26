import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Text, LogBox, Image } from 'react-native';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { useDispatch, useStore } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';

export default function Home() {
  LogBox.ignoreLogs(['Warning: Encountered two children with the same key,']); // toSetMarkedDatesObjects 함수에서 objectKey 중복에 대한 경고 무시하기
  const navigation = useNavigation();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const goBack = () => {
    navigation.navigate('TabNavigator');
  };

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
            <View>
              <Image
                source={require('@assets/images/crews/crew1.jpg')}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150 / 2,
                  overflow: 'hidden',
                  borderWidth: 5,
                  borderColor: S.colors.primary,
                }}
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
              피포피포
            </Text>
            <Text>마포구 / 서강대학교</Text>
            <Text>마포구에서 활동하는 서강대학교 학생들의 크루입니다.</Text>
          </View>
          <View style={[styles.announcement]}>
            <AntDesign name="notification" size={30} />
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={[S.styles.bigText]}>최근 공지</Text>
              <Text>
                다음주에 정모가 예정되어 있습니다. 일정 확인하시고 꼭
                참여해주세요! :)
              </Text>
            </View>
          </View>
          <View style={[styles.statusContainer]}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={[S.styles.bigText]}>김쓰줍</Text>
              <Text style={[S.styles.mediumText]}>리더</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={[S.styles.bigText]}>30명</Text>
              <Text style={[S.styles.mediumText]}>크루원</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={[S.styles.bigText]}>940점</Text>
              <Text style={[S.styles.mediumText]}>점수</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={[S.styles.bigText]}>3개</Text>
              <Text style={[S.styles.mediumText]}>배지</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
