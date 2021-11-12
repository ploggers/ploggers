import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { TouchableView } from '..';
import { homeContentDummy } from './dummy';
import * as S from '../../screens/Styles';

interface Props {
  animatedValue: any;
}

const deviceWidth = Dimensions.get('window').width;

export const HomeContent: React.FC<Props> = ({ animatedValue, children }) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
        { useNativeDriver: false }
      )}
    >
      <Text style={[styles.bigText]}>지구를 지키는 소식</Text>
      {homeContentDummy.map((item) => (
        <TouchableView key={item.id} style={[styles.container]}>
          <Image style={[styles.image]} source={{ uri: item.uri }} />
          <View style={{ paddingHorizontal: '5%' }}>
            <Text style={[styles.title]}>{item.title}</Text>
            <Text style={[styles.content]}>{item.content}</Text>
          </View>
        </TouchableView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 500,
  },
  container: {
    flex: 1,
    marginBottom: 50,
  },
  image: {
    width: deviceWidth * 0.9,
    height: 300,
  },
  title: {
    color: '#101010',
    fontSize: 32,
    width: '90%',
  },
  content: {
    color: '#101010',
    fontSize: 16,
    width: '90%',
  },
  myCrewCardContainer: {
    height: '12%',
    borderBottomColor: S.colors.secondary,
    borderBottomWidth: 1,
  },
  bigText: {
    fontFamily: S.fonts.bold,
    fontSize: 24,
    color: S.colors.primary,
    marginLeft: '5%',
    marginVertical: '5%',
  },
});
