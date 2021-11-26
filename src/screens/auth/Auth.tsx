import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAnimatedValue } from '@hooks';
import { NavigationHeader, TouchableView } from '@components';
import * as S from '../Styles';
import { styles } from './style';
/*
Todo
1. 이용약관 및 개인 정보 정책 페이지 제작 및 연결
 */
export default function Auth() {
  const navigation = useNavigation();
  const goLogin = useCallback(() => {
    navigation.navigate('Login');
  }, []);
  const goSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, []);

  const option = {
    useNativeDriver: true,
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
  };

  const imageAnimValue = useAnimatedValue(0);
  const authAnimValue = useAnimatedValue(0);
  Animated.sequence([
    Animated.timing(imageAnimValue, option),
    Animated.timing(authAnimValue, option),
  ]).start();

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader viewStyle={{ borderBottomWidth: 0 }}></NavigationHeader>
      <View style={[styles.imageContainer]}>
        <Animated.Image
          source={require('@assets/images/splash.png')}
          style={[styles.image, { opacity: imageAnimValue }]}
        />
      </View>
      <View style={[styles.authContainer]}>
        <Animated.View style={{ flex: 1, opacity: authAnimValue }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <TouchableView
              style={[
                S.buttonStyles.longButton,
                { backgroundColor: S.colors.primary },
              ]}
              onPress={goSignUp}
            >
              <Text style={[S.styles.bigText, { color: 'white' }]}>
                이메일로 시작하기
              </Text>
            </TouchableView>
            <View style={{ flex: 2, justifyContent: 'flex-end' }}>
              <Text style={[S.styles.mediumText]}>
                이미 계정을 갖고 계신가요?
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <TouchableView
                style={[
                  S.buttonStyles.longButton,
                  {
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: S.colors.primary,
                  },
                ]}
                onPress={goLogin}
              >
                <Text style={[S.styles.bigText, { color: S.colors.primary }]}>
                  로그인하기
                </Text>
              </TouchableView>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                paddingHorizontal: '10%',
              }}
            >
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>
                  <Text style={[S.styles.smallText]}>
                    {"계정을 등록함으로써, 귀하는 '모임'의 "}
                  </Text>
                  <Text
                    style={[
                      S.styles.smallText,
                      {
                        textDecorationLine: 'underline',
                      },
                    ]}
                  >
                    {'이용약관'}
                  </Text>
                  <Text style={[S.styles.smallText]}>{' 및 \n'}</Text>
                  <Text
                    style={[
                      S.styles.smallText,
                      { textDecorationLine: 'underline' },
                    ]}
                  >
                    개인 정보 보호 정책
                  </Text>
                  <Text style={[S.styles.smallText]}>
                    에 동의하시게 됩니다.
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
