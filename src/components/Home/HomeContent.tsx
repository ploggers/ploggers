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
      <View style={[styles.myCrewCardContainer]}>{children}</View>
      {homeContentDummy.map((item) => (
        <TouchableView key={item.id} style={[styles.container]}>
          <Image style={[styles.image]} source={{ uri: item.uri }} />
          <Text style={[styles.title]}>{item.title}</Text>
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
    marginBottom: 100,
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: 300,
  },
  title: {
    color: '#101010',
    fontSize: 32,
    width: '70%',
  },
  content: {
    color: '#101010',
    fontSize: 16,
    width: '90%',
  },
  myCrewCardContainer: {
    flex: 1,
    borderBottomColor: S.colors.secondary,
    borderBottomWidth: 1,
  },
});
