import { useNavigation } from '@react-navigation/core';
import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, HomeContent } from '../../components/Home';
import * as S from '../Styles';
import { Details } from '../../components/Home/dummy';

const Home = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const goDetails = (id: number) =>
    navigation.navigate('Details', { image: Details[id - 1] });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Carousel animatedValue={offset} goDetails={goDetails} />
        <HomeContent animatedValue={offset} goDetails={goDetails}></HomeContent>
        <View style={[styles.pointCircle1]}></View>
        <View style={[styles.pointCircle2]}></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  pointCircle1: {
    zIndex: -1,
    height: 500,
    width: 500,
    borderRadius: 250,
    borderColor: S.colors.primary,
    borderWidth: 2,
    position: 'absolute',
    top: 400,
    left: -250,
    backgroundColor: S.colors.primary,
    opacity: 0.5,
  },
  pointCircle2: {
    zIndex: -1,
    height: 400,
    width: 400,
    borderRadius: 200,
    borderColor: S.colors.sub,
    borderWidth: 2,
    position: 'absolute',
    top: -80,
    right: -100,
    backgroundColor: S.colors.sub,
    opacity: 0.8,
  },
});

export default Home;
