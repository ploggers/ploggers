import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationHeader, TouchableView } from '../components';
import * as S from './Styles';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { MyCrewCarousel } from '../components/MyCrewCarousel';
import { EventCarousel } from '../components/EventCarousel';
import { CrewNews } from '../components/CrewNews';
import { NewsDummy } from '../components/Home/dummy';

const deviceHeight = Dimensions.get('window').height;
export default function PloggersBadge() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const goSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  const goRanking = () => {
    navigation.navigate('Ranking');
  };
  const goCreateCrew = () => {
    navigation.navigate('PloggersCreateCrew');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Left={() => (
          <TouchableView style={{ paddingLeft: '2%' }}>
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: S.colors.sub,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 4 }}>
            <Image
              source={require('../assets/images/badges/badge1.png')}
              style={{ flex: 1, resizeMode: 'contain' }}
            ></Image>
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontFamily: S.fonts.bold,
                fontSize: S.fontSize.medium,
                textAlign: 'center',
              }}
            >
              북악산 배지
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
              2021년 북악산 플로깅 이벤트에 참여한 크루에게 주어지는 배지입니다.
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: '2%',
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={require('../assets/images/badges/badge1.png')}
            ></Image>
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={require('../assets/images/badges/badge2.png')}
            ></Image>
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={require('../assets/images/badges/badge3.png')}
            ></Image>
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 344,
          left: 31,
          width: 76,
          height: 76,
          borderColor: S.colors.secondary,
          borderWidth: 4,
          borderRadius: 38,
        }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flexGrow: 1,
    borderBottomWidth: 6,
    borderColor: S.colors.sub,
    paddingVertical: 15,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  rankingIcon: {
    color: '#FFD700',
  },
  crewIcon: {
    color: S.colors.primary,
  },
  myCrewContainer: {
    height: deviceHeight * 0.35,
    borderBottomWidth: 6,
    borderColor: S.colors.sub,
    paddingVertical: 15,
  },
  eventContainer: {
    height: deviceHeight * 0.35,
    borderBottomWidth: 6,
    borderColor: S.colors.sub,
    paddingVertical: 15,
  },
  newsContainer: {
    flexGrow: 1,
    borderBottomWidth: 6,
    borderColor: S.colors.sub,
    paddingVertical: 15,
  },
  contentTitle: {
    fontSize: S.fontSize.medium,
    paddingLeft: '5%',
    paddingVertical: '3%',
    textAlign: 'left',
  },
  bigText: {
    fontFamily: S.fonts.bold,
  },
  totalViewText: {
    fontFamily: S.fonts.medium,
    paddingRight: '5%',
    paddingVertical: '3%',
    textAlign: 'left',
    fontSize: 15,
    color: S.colors.secondary,
  },
  menuText: {
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.small,
    paddingTop: 3,
  },
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  category: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
  },
  insertBtn: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    color: S.colors.primary,
    zIndex: 1,
  },
  insertBtnBackground: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    zIndex: 0,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
