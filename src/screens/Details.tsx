import { useNavigation } from '@react-navigation/core';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, TouchableView } from '../components';
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default function Details({ route }: any) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Left={() => (
          <TouchableView onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30}></Icon>
          </TouchableView>
        )}
      ></NavigationHeader>
      <ScrollView>
        <View style={{ width: deviceWidth }}>
          <Image
            style={{ resizeMode: 'cover' }}
            source={route.params.image.path}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
