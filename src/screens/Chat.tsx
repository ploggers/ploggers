import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
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
export default function Chat() {
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
        style={[styles.container]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.menuContainer]}>
          <View style={[styles.iconContainer]}>
            <TouchableOpacity style={[styles.iconWrapper]} onPress={goRanking}>
              <Icon
                name={'trophy'}
                size={40}
                style={[styles.rankingIcon]}
              ></Icon>
              <Text style={[styles.menuText]}>랭킹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconWrapper]}>
              <Icon name={'people'} size={40} style={[styles.crewIcon]}></Icon>
              <Text style={[styles.menuText]}>크루 모집</Text>
            </TouchableOpacity>
            <View style={[styles.iconWrapper]}></View>
            <View style={[styles.iconWrapper]}></View>
          </View>
        </View>
        <View style={[styles.myCrewContainer]}>
          <Text style={[styles.bigText, styles.contentTitle]}>내 크루</Text>
          <MyCrewCarousel />
        </View>
        <View style={[styles.eventContainer]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.bigText, styles.contentTitle]}>이벤트</Text>
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
            <Text style={[styles.bigText, styles.contentTitle]}>크루 소식</Text>
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
        size={60}
      />
      <View style={[styles.insertBtnBackground]}></View>
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
    borderColor: S.colors.secondary,
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
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  eventContainer: {
    height: deviceHeight * 0.35,
    borderBottomWidth: 6,
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  newsContainer: {
    flexGrow: 1,
    borderBottomWidth: 6,
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  contentTitle: {
    fontSize: 20,
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
    fontSize: 12,
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
    right: 20,
    color: S.colors.primary,
    zIndex: 1,
  },
  insertBtnBackground: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 0,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
