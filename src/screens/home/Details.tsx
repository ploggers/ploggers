import { useNavigation } from '@react-navigation/core';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, TouchableView } from '../../components';
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
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

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
