import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { EventDummy } from './Home/dummy';
import { TouchableView } from '.';
import * as S from '@screens/Styles';

const deviceWidth = Dimensions.get('window').width;
const gap = 10;
const offset = 20;
const pageWidth = deviceWidth - (gap + offset) * 2;

export const EventCarousel: React.FC = () => {
  const renderItems = (item: any) => {
    return (
      <TouchableView style={[styles.imageWrapper]} activeOpacity={0.9}>
        <ImageBackground style={[styles.image]} source={item.item.path}>
          <View style={[styles.imageTextWrapper]}>
            <Text style={[styles.imageText]}>{item.item.title}</Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1 }}>
          <Text style={[styles.titleText]}>{item.item.title}</Text>
          <Text style={[styles.dateText]}>{item.item.date}</Text>
        </View>
      </TouchableView>
    );
  };
  return (
    <View style={[styles.container]}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={EventDummy}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.id}`}
        pagingEnabled
        renderItem={renderItems}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={true}
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
    height: '85%',
    width: '100%',
    justifyContent: 'flex-end',
    padding: 5,
  },
  imageTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  imageText: {
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.medium,
    color: 'white',
    paddingVertical: '3%',
  },
  titleText: {
    paddingTop: 5,
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.small,
  },
  dateText: {
    paddingTop: 5,
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.tiny,
    color: 'gray',
  },
});
