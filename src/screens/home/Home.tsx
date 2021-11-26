import { useNavigation } from '@react-navigation/core';
import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, HomeContent } from '@components/Home';
import { Details } from '@components/Home/dummy';
import { styles } from './style';

const Home = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const goDetails = (id: number) =>
    navigation.navigate('Details', { image: Details[id - 1] });

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Carousel animatedValue={offset} goDetails={goDetails} />
        <HomeContent animatedValue={offset} goDetails={goDetails}></HomeContent>
        <View style={[styles.pointCircle1]}></View>
        <View style={[styles.pointCircle2]}></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
