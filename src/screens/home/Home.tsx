import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, HomeContent } from '@components/Home';
import { Details } from '@components/Home/dummy';
import { styles } from './style';
import { useDispatch, useStore } from 'react-redux';
import * as U from '@utils';
import * as A from '@store/asyncStorage';
import axios from 'axios';

const Home = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const goDetails = (id: number) =>
    navigation.navigate('Details', { image: Details[id - 1] });
  const dispatch = useDispatch();
  const store = useStore();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);
  const updateToken = async () => {
    U.readFromStorage('refreshJWT').then((refreshJWT: any) => {
      // accessJWT 재발급
      axios
        .get('/api/users/refresh-access', {
          headers: { Authorization: `Bearer ${refreshJWT}` },
        })
        .then((response) => {
          const tokens = response.headers['set-cookie'][0];
          const renewedAccessToken = U.getCookie(tokens, 'accessToken');
          U.writeToStorage('accessJWT', renewedAccessToken);
          dispatch(A.setJWT(renewedAccessToken, refreshJWT));
          setAccessToken(renewedAccessToken);
        });
    });
  };
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
