import React, { useState, useCallback, useEffect } from 'react';
import { AutoFocusProvider, useAutoFocus } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as L from '../store/login';
import * as U from '../utils';
import * as A from '../store/asyncStorage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as S from './Styles';
import { NavigationHeader, TouchableView } from '../components';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { getCookie } from '../utils';

/*
Todo
2. 비밀번호 표시 이후 비밀번호 한 번에 지워지는 버그 해결
3. 키보드 가리지 않게 하기
5. 오토포커싱
 */
export default function PloggersCreateCrew() {
  const [desc, setDesc] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isDescValid, setIsDescValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const focus = useAutoFocus();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBack = useCallback(() => navigation.navigate('Auth'), []);
  // const goOnboarding = useCallback(() => {
  //   if (desc !== '' && name !== '') {
  //     setLoading(true);
  //     axios
  //       .post('/api/users', {
  //         desc,
  //         name,
  //       })
  //       .then(() => {
  //         axios
  //           .post('/api/users/login', { desc  })
  //           .then((response) => {
  //             let tokens = response.headers['set-cookie'][0];
  //             const accessToken = getCookie(tokens, 'accessToken');
  //             const refreshToken = getCookie(tokens, 'refreshToken');
  //             U.writeToStorage('accessJWT', accessToken);
  //             U.writeToStorage('refreshJWT', refreshToken);
  //             dispatch(L.signUpAction({ name, desc,  }));
  //             tokens = { accessToken, refreshToken };
  //             return tokens;
  //           })
  //           .then((tokens) => {
  //             dispatch(A.setJWT(tokens.accessToken, tokens.refreshToken));
  //             dispatch(L.loginAction({ desc, name,  }));
  //             setLoading(false);
  //             navigation.navigate('OnBoarding');
  //           })
  //           .catch((e) => {
  //             setLoading(false);
  //             Alert.alert('비정상적인 접근입니다', '', [{ text: '확인' }]);
  //           });
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //         if (e.response.status === 409) {
  //           Alert.alert('이미 존재하는 계정입니다', '', [{ text: '확인' }]);
  //         }
  //       });
  //   } else Alert.alert('모든 정보를 입력해주세요', '', [{ text: '확인' }]);
  // }, [name, desc, ]);
  const goLogin = () => navigation.goBack();

  useEffect(() => {
    if (desc !== '' && name !== '' && isDescValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [desc, name, isDescValid]);

  // input validation
  useEffect(() => {
    if (desc.length <= 50) {
      setIsDescValid(true);
    } else {
      setIsDescValid(false);
    }
  }, [desc]);

  useEffect(() => {
    // name exist
    if (true) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  }, [name]);

  return (
    <SafeAreaView style={[styles.container]}>
      {loading === true ? (
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
          color={S.colors.primary}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <NavigationHeader
            Left={() => (
              <TouchableView onPress={goBack}>
                <Icon name="close" size={30}></Icon>
              </TouchableView>
            )}
          ></NavigationHeader>
          <View style={[styles.textInputContainer]}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.startText]}>크루 생성하기</Text>
            </View>
            <View style={{ flex: 1, marginBottom: 10 }}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={name}
                onChangeText={setName}
                placeholder="크루 이름"
                placeholderTextColor="gray"
                autoCapitalize="none"
              />
              <Text
                style={[
                  styles.validText,
                  { color: isNameValid ? Colors.green500 : Colors.red500 },
                ]}
              >
                {name === ''
                  ? ' '
                  : isNameValid
                  ? '사용 가능한 이름입니다 :)'
                  : '이미 존재하는 이름입니다 :('}
              </Text>
            </View>
            <View style={{ flex: 2, marginBottom: 10 }}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={desc}
                onChangeText={setDesc}
                placeholder="크루 소개 (50자)"
                placeholderTextColor="gray"
                autoCapitalize="none"
              />
              <Text
                style={[
                  styles.validText,
                  { color: isDescValid ? Colors.green500 : Colors.red500 },
                ]}
              >
                {desc === ''
                  ? ' '
                  : isDescValid
                  ? '올바른 이메일 형식입니다 :)'
                  : '이메일을 확인해주세요 :('}
              </Text>
            </View>
          </View>
          <View style={[styles.buttonContainer]}>
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
                <Text style={[styles.bigText, { color: S.colors.primary }]}>
                  생성하기
                </Text>
              </TouchableView>
              <View style={{ flex: 2 }}></View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flex: 2,
    paddingHorizontal: '5%',
  },
  startText: {
    fontFamily: S.fonts.bold,
    fontSize: 35,
  },
  textInput: {
    fontFamily: S.fonts.medium,
    flex: 1,
    backgroundColor: S.colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  bigText: {
    fontFamily: S.fonts.bold,
    textAlign: 'center',
    fontSize: 18,
  },
  validText: {
    fontFamily: S.fonts.light,
    fontWeight: '600',
    marginHorizontal: 10,
  },
});
