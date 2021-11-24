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
          <View style={[styles.imageWrapper]}>
            <Image style={[styles.image]} source={item.path} />
          </View>
          <Animated.Text style={[styles.title]}>{item.title}</Animated.Text>
          <Text style={[styles.content]}>{item.content}</Text>
        </TouchableView>
      ))}
      {/* <View style={[styles.pointCircle]}></View> */}
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
  pointCircle: {
    zIndex: -1,
    flex: 1,
    height: 400,
    width: 400,
    borderRadius: 200,
    borderColor: S.colors.primary,
    borderWidth: 2,
    position: 'absolute',
    top: 1000,
    left: -200,
  },
  imageWrapper: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
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
