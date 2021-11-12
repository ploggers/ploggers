import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationHeader, TouchableView } from '../components';
import * as S from './Styles';
import { crewData } from '../components/Home/dummy';
import { useNavigation } from '@react-navigation/core';

const deviceHeight = Dimensions.get('window').height;

export default function Search() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeword] = useState('');
  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const renderItems = (item: any) => {
    return (
      <TouchableOpacity style={[styles.imageWrapper]} activeOpacity={0.9}>
        <ImageBackground
          style={[styles.image]}
          imageStyle={{ borderRadius: 15 }}
          source={{ uri: item.item.uri }}
        >
          <View style={[styles.imageTextWrapper]}>
            <Text style={[styles.townText]}>{item.item.town}</Text>
            <Text
              style={[styles.titleText]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.item.name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Left={() => (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableView onPress={goBack} style={{ paddingLeft: '2%' }}>
              <Icon name="chevron-back" size={30}></Icon>
            </TouchableView>
            <View style={[styles.searchContainer]}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={[styles.textInput]}
                  value={searchKeyword}
                  onChangeText={setSearchKeword}
                  placeholder="크루 이름, 지역을 검색하세요"
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        )}
      ></NavigationHeader>
      <View style={{ flex: 1, paddingHorizontal: '5%' }}>
        <FlatList
          scrollEnabled
          data={crewData}
          renderItem={renderItems}
          keyExtractor={(item, index) => `_key${index.toString()}`}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingBottom: 3,
    height: '100%',
  },
  textInput: {
    fontFamily: S.fonts.medium,
    flex: 1,
    backgroundColor: S.colors.secondary,
    borderRadius: 7,
    fontSize: 15,
    paddingLeft: 10,
  },
  scrollViewContainer: {
    flex: 12,
    paddingHorizontal: '5%',
  },
  imageWrapper: {
    flex: 1,
    maxWidth: '50%',
    maxHeight: deviceHeight * 0.2,
    padding: 10,
  },
  image: {
    height: '100%',
    justifyContent: 'flex-end',
    padding: 5,
  },
  imageTextWrapper: {
    flex: 0.5,
  },
  titleText: {
    fontFamily: S.fonts.bold,
    fontSize: 25,
    color: 'white',
    paddingVertical: '3%',
  },
  townText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
    color: 'white',
  },
});
