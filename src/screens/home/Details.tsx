import { useNavigation } from '@react-navigation/core';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, TouchableView } from '@components';
import { ScrollView, Image } from 'react-native';
import { styles } from './style';

export default function Details({ route }: any) {
  const navigation = useNavigation();
  const imageDimension = Image.resolveAssetSource(route.params.image.path);
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
