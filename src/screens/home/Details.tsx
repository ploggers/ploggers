import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, TouchableView } from '@components';
import { ScrollView, Image } from 'react-native';
import { styles } from './style';
import { useDispatch, useStore } from 'react-redux';
import axios from 'axios';
import * as U from '@utils';
import * as A from '@store/asyncStorage';

export default function Details({ route }: any) {
  const navigation = useNavigation();
  const imageDimension = Image.resolveAssetSource(route.params.image.path);
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
    <SafeAreaView
      style={[styles.container, { marginBottom: 40 }]}
      edges={['left', 'right', 'top']}
    >
      <NavigationHeader
        Left={() => (
          <TouchableView onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30}></Icon>
          </TouchableView>
        )}
      ></NavigationHeader>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={route.params.image.path}
          style={[
            styles.image,
            {
              aspectRatio: imageDimension.width / imageDimension.height,
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
