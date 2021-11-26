import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { crewData } from './Home/dummy';
import { TouchableView } from '.';
import * as S from '@screens/Styles';
import { useNavigation } from '@react-navigation/core';

const deviceWidth = Dimensions.get('window').width;
const gap = deviceWidth * 0.02;
const offset = deviceWidth * 0.03;
const pageWidth = deviceWidth * 0.4;

export const MyCrewCarousel: React.FC = ({ myTeams }: any) => {
  const navigation = useNavigation();
  const goCrewHome = () => {
    navigation.navigate('PloggersCrew');
  };
  const renderItems = (item: any) => {
    return (
      <TouchableView
        style={[styles.imageWrapper]}
        activeOpacity={0.9}
        onPress={goCrewHome}
      >
        <ImageBackground
          style={[styles.image]}
          imageStyle={{ borderRadius: 15 }}
          source={item.item.path}
        >
          <View style={[styles.imageTextWrapper]}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1, padding: '5%', marginBottom: '5%' }}>
              <Text style={[styles.subText]}>{item.item.university}</Text>
              <Text style={[styles.subText]}>{item.item.town}</Text>
              <Text
                style={[styles.imageText]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.item.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableView>
    );
  };
  // myTeams.length !== 0
  return (
    <View style={[styles.container]}>
      {true ? (
        <FlatList
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
          data={crewData}
          decelerationRate="fast"
          horizontal
          keyExtractor={(item: any) => `page__${item.id}`}
          pagingEnabled
          renderItem={renderItems}
          snapToInterval={pageWidth + gap}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[S.styles.mediumText]}>소속된 크루가 없어요!</Text>
          <Text style={[S.styles.mediumText]}>
            새로운 크루에 가입을 해보세요!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: pageWidth,
    marginHorizontal: gap / 2,
    paddingBottom: '5%',
  },
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  imageTextWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
  },
  imageText: {
    fontFamily: S.fonts.bold,
    fontSize: S.fontSize.medium,
    color: 'white',
    paddingBottom: '3%',
    paddingLeft: 5,
  },
  subText: {
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.small,
    color: 'white',
    paddingLeft: 5,
  },
});
