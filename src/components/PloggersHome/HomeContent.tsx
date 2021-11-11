import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CrewCard } from './';
import { homeContentDummy } from './dummy';

interface Props {
  animatedValue: any;
}

export const HomeContent: React.FC<Props> = ({ animatedValue }) => {
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
      <CrewCard />
      {homeContentDummy.map((item) => (
        <TouchableOpacity key={item.id} style={[styles.container]}>
          <Image style={[styles.image]} source={{ uri: item.uri }} />
          <Text style={[styles.title]}>{item.title}</Text>
          <Text style={[styles.content]}>{item.content}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 500,
  },
  container: {
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
});
