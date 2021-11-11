<<<<<<< HEAD
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, HomeContent } from '../components/Home';
import { MyCrewCarousel } from '../components/MyCrewCarousel';
=======
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, HomeContent } from '../components/Home';
import { MyCrewCarousel } from '../components/MyCrewCarousel';
>>>>>>> 055e566519851ec6d4da0de751cc16937f609180

const Home = () => {
  const navigation = useNavigation();
  const goDetails = useCallback(() => {
    navigation.navigate('Details');
  }, []);

  const offset = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Carousel animatedValue={offset} goDetails={goDetails} />
        <HomeContent animatedValue={offset}>
          <MyCrewCarousel />
        </HomeContent>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
