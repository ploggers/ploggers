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
import * as S from '../screens/Styles';
import { useNavigation } from '@react-navigation/core';

const deviceWidth = Dimensions.get('window').width;
const gap = deviceWidth * 0.02;
const offset = deviceWidth * 0.03;
const pageWidth = deviceWidth * 0.4;

export const MyCrewCarousel: React.FC = () => {
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
            <Text style={[styles.townText]}>{item.item.town}</Text>
            <Text
              style={[styles.imageText]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.item.name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableView>
    );
  };
  return (
    <View style={[styles.container]}>
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
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  imageTextWrapper: {
    flex: 0.5,
  },
  imageText: {
    fontFamily: S.fonts.bold,
    fontSize: 25,
    color: 'white',
    paddingVertical: '3%',
  },
  townText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
    color: 'white',
  },
});
