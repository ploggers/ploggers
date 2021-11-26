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
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { crewData } from '@components/Home/dummy';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';

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
    <SafeAreaView style={[S.styles.flex]}>
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
