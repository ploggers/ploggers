import React, { useCallback, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { badgeDummy } from '@components/Home/dummy';

export default function PloggersBadge() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const goSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);
  const [selectedBadge, setSelectedBadge] = useState(0);

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Left={() => (
          <TouchableView style={{ paddingLeft: '2%' }}>
            <Icon
              name="chevron-back"
              size={30}
              style={{ color: 'black' }}
            ></Icon>
          </TouchableView>
        )}
        title="크루 배지"
        titleStyle={{ fontFamily: S.fonts.medium }}
        Right={() => (
          <TouchableView style={{ paddingRight: '2%' }} onPress={goSearch}>
            <Icon
              name="search-outline"
              size={30}
              style={{ color: 'transparent' }}
            ></Icon>
          </TouchableView>
        )}
      ></NavigationHeader>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: S.colors.sub,
            alignItems: 'center',
            paddingBottom: 25,
          }}
        >
          <View style={{ flex: 4 }}>
            <Image
              style={[styles.badge, styles.selected]}
              source={badgeDummy[selectedBadge].src}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontFamily: S.fonts.bold,
                fontSize: S.fontSize.medium,
                textAlign: 'center',
              }}
            >
              {badgeDummy[selectedBadge].name}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: S.fontSize.small,
                fontFamily: S.fonts.light,
                paddingHorizontal: '20%',
                paddingVertical: 3,
              }}
            >
              {badgeDummy[selectedBadge].desc}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: '2%',
            }}
          >
            {badgeDummy.map((elem, idx) => (
              <TouchableOpacity
                key={elem.id}
                onPress={() => setSelectedBadge(idx)}
              >
                <Image
                  style={
                    idx === selectedBadge
                      ? [styles.badge, styles.selected]
                      : [styles.badge]
                  }
                  source={elem.src}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </SafeAreaView>
  );
}
