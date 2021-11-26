import React from 'react';
import {
  ScrollView,
  Text,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { TouchableView } from '..';
import { homeContentDummy } from './dummy';
import * as S from '@screens/Styles';

interface Props {
  animatedValue: any;
  goDetails: (id: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

export const HomeContent: React.FC<Props> = ({ animatedValue, goDetails }) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
        { useNativeDriver: false },
      )}
    >
      <Text style={[styles.bigText]}>지구를 지키는 소식</Text>
      {homeContentDummy.map((item) => (
        <TouchableView
          key={item.id}
          style={[styles.container]}
          activeOpacity={1}
          onPress={() => goDetails(item.id)}
        >
          <Image style={[styles.image]} source={item.path} />
          <Animated.Text style={[styles.title]}>{item.title}</Animated.Text>
          <Text style={[styles.content]}>{item.content}</Text>
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
    alignItems: 'flex-end',
    paddingLeft: '10%',
  },
  image: {
    width: deviceWidth * 0.9,
    height: 300,
  },
  title: {
    color: 'black',
    fontSize: S.fontSize.title,
    fontFamily: S.fonts.medium,
    paddingTop: '3%',
  },
  content: {
    color: 'black',
    fontSize: S.fontSize.content,
    fontFamily: S.fonts.light,
    paddingVertical: '2%',
  },
  bigText: {
    fontFamily: S.fonts.bold,
    fontSize: S.fontSize.title,
    color: 'black',
    marginLeft: '10%',
    marginVertical: '5%',
  },
});
