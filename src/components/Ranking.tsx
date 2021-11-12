import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, TouchableView } from '../components';
import * as S from '../screens/Styles';
import { ActivityIndicator, Avatar, Card } from 'react-native-paper';
import { crewData, universityData } from './Home/dummy';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Ranking() {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  // 추후 totalRanking, univRanking fetch해야됨
  const [totalData, setTotalData] = useState<Array<any>>(crewData);

  const renderItem = (item: any) => {
    return (
      <View>
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
              <Text>{item.item.ranking}</Text>
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
                  {item.item.town}
                </Text>
              </View>
            </View>
            <View style={[styles.scoreBox]}>
              <Text style={[styles.scoreText]}>{`${item.item.score}점`}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Right={() => (
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: S.colors.secondary,
              alignItems: 'flex-end',
            }}
          ></View>
        )}
      ></NavigationHeader>
      <View style={[styles.searchContainer]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableView
            style={[
              styles.categoryContainer,
              {
                backgroundColor:
                  selectedCategory == '전체' ? S.colors.primary : 'white',
                borderColor:
                  selectedCategory == '전체'
                    ? S.colors.primary
                    : S.colors.secondary,
              },
            ]}
            onPress={() => setSelectedCategory('전체')}
          >
            <View style={[styles.category]}>
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory == '전체' ? 'white' : 'black' },
                ]}
              >
                전체
              </Text>
            </View>
          </TouchableView>
          <TouchableView
            style={[
              styles.categoryContainer,
              {
                backgroundColor:
                  selectedCategory == '지역' ? S.colors.primary : 'white',
                borderColor:
                  selectedCategory == '지역'
                    ? S.colors.primary
                    : S.colors.secondary,
              },
            ]}
            onPress={() => setSelectedCategory('지역')}
          >
            <View style={[styles.category]}>
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory == '지역' ? 'white' : 'black' },
                ]}
              >
                지역
              </Text>
            </View>
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
            data={selectedCategory === '전체' ? totalData : universityData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `_key${index.toString()}`}
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
    flex: 0.5,
    paddingHorizontal: '5%',
  },
  text: {
    fontFamily: S.fonts.bold,
    fontSize: 20,
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
  scoreBox: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  scoreText: {
    fontSize: 18,
    color: S.colors.primary,
  },
});
