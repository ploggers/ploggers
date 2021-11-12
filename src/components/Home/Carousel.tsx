import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Animated,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableView } from '..';
import { carouselDummy } from './dummy';

interface Props {
  animatedValue: any;
  goDetails: any;
}

const HEADER_HEIGHT = 500;
const deviceWidth = Dimensions.get('window').width;

export const Carousel: React.FC<Props> = ({ animatedValue, goDetails }) => {
  const flatlistRef = useRef<FlatList | null>(null);
  const [page, setPage] = useState(0);
  let scrolled = 0,
    scrollValue = 0;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    infiniteScroll();
  }, []);

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top],
    extrapolate: 'clamp',
  });

  const imageOpacity = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
    scrolled = newPage;
    scrollValue = newPage * deviceWidth;
  };
  const infiniteScroll = () => {
    const numberOfData = carouselDummy.length;

    setInterval(() => {
      scrolled++;
      if (scrolled < numberOfData) {
        scrollValue += deviceWidth;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }
      scroll(scrollValue);
    }, 3000);
  };

  const scroll = (offset: number) => {
    flatlistRef.current?.scrollToOffset({
      animated: true,
      offset,
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { height: headerHeight, opacity: imageOpacity },
      ]}
    >
      <FlatList
        ref={(ref) => (flatlistRef.current = ref)}
        automaticallyAdjustContentInsets={false}
        data={carouselDummy}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.num}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={({ item }) => (
          <TouchableView
            style={[styles.imageWrapper]}
            onPress={goDetails}
            activeOpacity={1}
          >
            <Image style={[styles.image]} source={{ uri: item.uri }} />
          </TouchableView>
        )}
        snapToInterval={deviceWidth}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <View style={[styles.text]}>
        <Text style={{ color: 'white' }}>
          {`${page + 1} / ${carouselDummy.length}`}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
  },
  imageWrapper: { width: deviceWidth },
  image: { height: '100%' },
  text: {
    position: 'absolute',
    right: '10%',
    bottom: '5%',
    backgroundColor: 'black',
    opacity: 0.2,
    borderRadius: 5,
    padding: 5,
  },
});
