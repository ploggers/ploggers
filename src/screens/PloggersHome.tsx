import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, HomeContent } from '../components/PloggersHome';

const PloggersHome = () => {
  const offset = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Carousel animatedValue={offset} />
        <HomeContent animatedValue={offset} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PloggersHome;
