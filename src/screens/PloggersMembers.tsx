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

export default function Search() {
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

  // const onLayout = useCallback((event) => {
  //   const { width } = event.nativeEvent.layout;
  //   setParentWidth(width);
  // }, []);

  // useEffect(() => {
  //   // 교회 리스트 가져오기
  //   getChurchList().catch(async (e) => {
  //     const errorStatus = e.response.status;
  //     if (errorStatus === 401) {
  //       await updateToken();
  //     } else {
  //       Alert.alert('비정상적인 접근입니다');
  //     }
  //   });
  // }, [accessToken]);

  // useEffect(() => {
  //   // 그룹 검색
  //   setLoading(true);
  //   search().catch(async (e) => {
  //     const errorStatus = e.response.status;
  //     if (errorStatus === 401) {
  //       await updateToken();
  //     } else {
  //       Alert.alert('비정상적인 접근입니다');
  //     }
  //   });
  // }, [selectedCategory, selectedChurch, searchAgain, accessToken]);

  // const getChurchList = async () => {
  //   await axios
  //     .get('/api/groups/church-list', {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     .then((churchResponse) => {
  //       setChurchList(churchResponse.data);
  //       setSelectedTempChurch(churchResponse.data[0].name);
  //     });
  // };

  // const updateToken = async () => {
  //   U.readFromStorage('refreshJWT').then((refreshJWT: any) => {
  //     // accessJWT 재발급
  //     axios
  //       .get('/api/users/refresh-access', {
  //         headers: { Authorization: `Bearer ${refreshJWT}` },
  //       })
  //       .then((response) => {
  //         const tokens = response.headers['set-cookie'][0];
  //         const renewedAccessToken = getCookie(tokens, 'accessToken');
  //         U.writeToStorage('accessJWT', renewedAccessToken);
  //         dispatch(A.setJWT(renewedAccessToken, refreshJWT));
  //         setAccessToken(renewedAccessToken);
  //       });
  //   });
  // };

  const toggleChurchModal = () => {
    // setChurchModalVisible(!isChurchModalVisible);
  };

  const selectChurch = (selectedTempChurch: string) => {
    //   setSearchDisabled(false);
    //   setSearchAgain(!searchAgain);
    //   setSelectedChurch(selectedTempChurch);
    //   setSelectedCategory('전체');
    //   toggleChurchModal();
  };

  // const search = async () => {
  //   let search_address = '';
  //   selectedCategory === '전체'
  //     ? (search_address = 'all-list')
  //     : selectedCategory === '구역'
  //     ? (search_address = 'district-list')
  //     : selectedCategory === '부서'
  //     ? (search_address = 'department-list')
  //     : (search_address = 'service-list');

  //   const searchResponse = await axios.get(`/api/groups/${search_address}`, {
  //     params: {
  //       church: selectedTempChurch,
  //     },
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   });
  //   const searchGroups = searchResponse.data;
  //   const followGroups = await axios.get('/api/follows/', {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   });
  //   const followGroupsArray = followGroups.data;
  //   const result = await Promise.all(
  //     searchGroups.map(async (group: any) => {
  //       const groupId = group.id;
  //       const followBelongTo = await getIsFollow(groupId, followGroupsArray);
  //       return {
  //         ...group,
  //         follow: followBelongTo.follow,
  //         isBelongTo: followBelongTo.isBelongTo,
  //       };
  //     })
  //   );
  //   setSearchedData(result);
  //   setLoading(false);
  // };

  const churchModal = () => {
    return (
      <Modal
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        isVisible={isChurchModalVisible}
        onSwipeComplete={toggleChurchModal}
        swipeDirection="down"
      >
        <View
          style={{
            flex: 0.7,
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: '5%',
          }}
        >
          <View
            style={{
              height: '8%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableView
              onPress={toggleChurchModal}
              style={{
                alignSelf: 'center',
                flex: 1,
              }}
            >
              <Icon name="close" size={25}></Icon>
            </TouchableView>
            <Text
              style={[
                styles.text,
                {
                  alignSelf: 'center',
                  textAlign: 'center',
                  flex: 1,
                },
              ]}
            >
              교회
            </Text>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={{ flex: 2 }}>
            <Picker
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              itemStyle={{
                fontFamily: S.fonts.medium,
              }}
              selectedValue={selectedTempChurch}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedTempChurch(itemValue);
              }}
            >
              {churchList.map((church) => {
                return (
                  <Picker.Item
                    key={church}
                    label={church.name}
                    value={church.name}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableView
              onPress={() => selectChurch(selectedTempChurch)}
              style={[
                S.buttonStyles.longButton,
                {
                  backgroundColor: S.colors.primary,
                  flex: 0.3,
                },
              ]}
            >
              <Text style={[styles.confirmText]}>검색</Text>
            </TouchableView>
          </View>
        </View>
      </Modal>
    );
  };

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
            onPress={toggleChurchModal}
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
                구성원의 이름을 검색하세요
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
