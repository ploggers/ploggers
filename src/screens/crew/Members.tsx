import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from 'react-redux';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Avatar, Card } from 'react-native-paper';
import { members } from '@components/Home/dummy';
import { styles } from './style';

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState<Array<any>>(members);
  const store = useStore();
  const { isAuthorized } = store.getState().isAuthorized;

  const renderItem = (item: any) => {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Content>
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
