import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useStore } from 'react-redux';
import { NavigationHeader, TouchableView } from '../components';
import * as S from './Styles';
import * as U from '../utils';
import * as A from '../store/asyncStorage';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Avatar, Card } from 'react-native-paper';
import { getCookie } from '../utils';

export default function PloggersSearchCrew() {
  const [parentWidth, setParentWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [churchList, setChurchList] = useState<Array<any>>([]);
  const [selectedTempChurch, setSelectedTempChurch] = useState<string>('');
  const [searchDisable, setSearchDisabled] = useState<boolean>(true);
  const [selectedChurch, setSelectedChurch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchedData, setSearchedData] = useState<Array<any>>([
    { name: '권혁준', role: '관리자' },
    { name: '이영빈', role: '구성원' },
    { name: '김홍엽', role: '구성원' },
    { name: '장수용', role: '구성원' },
  ]);
  const [searchAgain, setSearchAgain] = useState<boolean>(false);
  const [followingChanged, setFollowingChanged] = useState<boolean>(false);
  const [isChurchModalVisible, setChurchModalVisible] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const { accessJWT } = store.getState().asyncStorage;
  const { isAuthorized } = store.getState().isAuthorized;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);

  const renderItem = (item: any) => {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Content
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar.Text
                label={item.item.name[0]}
                size={50}
                style={{ backgroundColor: S.colors.secondary }}
                color="white"
                labelStyle={{ fontFamily: S.fonts.bold, fontSize: 25 }}
              />
              <View
                style={{
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: S.fonts.medium,
                    fontSize: 18,
                    marginBottom: 1,
                  }}
                >
                  {item.item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: S.fonts.medium,
                    fontSize: 12,
                    color: 'grey',
                    marginBottom: 1,
                  }}
                >
                  {item.item.role}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Right={() => <TouchableView></TouchableView>}
      ></NavigationHeader>
      <View style={[styles.searchContainer]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <TouchableView
            style={[styles.searchBar]}
            activeOpacity={0.7}
            onPress={() => console.log('church modal')}
            disabled={isAuthorized === false ? true : false}
          >
            <Text>
              <Icon name="search-outline" size={20}></Icon>
              <Text
                style={{
                  fontFamily: S.fonts.medium,
                  fontSize: 20,
                  color: 'grey',
                }}
              >
                지역을 선택해 주세요
              </Text>
            </Text>
          </TouchableView>
        </View>
      </View>

      <View style={{ flex: 4 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={S.colors.primary} />
          </View>
        ) : (
          <FlatList
            data={searchedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            onEndReachedThreshold={0.8}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="large" color={S.colors.primary} />
              ) : (
                <></>
              )
            }
          />
        )}
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
  },
  searchBar: {
    flex: 0.6,
    backgroundColor: S.colors.secondary,
    fontFamily: S.fonts.medium,
    borderRadius: 5,
    fontSize: 18,
    padding: 15,
  },
  text: {
    fontFamily: S.fonts.bold,
    fontSize: 20,
  },
  confirmText: {
    fontFamily: S.fonts.bold,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  category: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
  },
  followingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: S.colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  followingText: {
    fontFamily: S.fonts.medium,
    fontSize: 12,
    color: 'white',
  },
});
