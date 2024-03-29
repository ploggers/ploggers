import React, { useState, useCallback, useEffect } from 'react';
import { useAutoFocus } from '@contexts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, TextInput, Alert } from 'react-native';
import { useDispatch, useStore } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from '../Styles';
import * as U from '@utils';
import * as A from '@store/asyncStorage';
import { NavigationHeader, TouchableView } from '@components';
import { Colors } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './style';
import axios from 'axios';

export default function CreateCrew() {
  const [locations, setLocations] = useState<Array<any>>([]);
  const [text, settext] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<Array<any>>([]);
  const [locationList, setLocationList] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isTextValid, setIsTextValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const store = useStore();
  const dispatch = useDispatch();
  const { accessJWT } = store.getState().asyncStorage;
  const [accessToken, setAccessToken] = useState<string>(accessJWT);

  const navigation = useNavigation();
  const goBack = useCallback(() => navigation.goBack(), []);

  useEffect(() => {
    // 지역 리스트 가져오기
    getLocationList().catch(async (e) => {
      const errorStatus = e.reponse.status;
      if (errorStatus === 401) {
        // accessToken 만료 -> accessToken 업데이트
        await updateToken();
      } else {
        Alert.alert('비정상적인 접근입니다');
      }
    });
  }, [accessToken]);

  const getLocationList = async () => {
    axios
      .get('/api/locations', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const itemArray: any = [];
        response.data.map((location: any) => {
          const item: object = {
            label: location.dongnM,
            value: location.dongCd,
          };
          itemArray.push(item);
        });
        setLocationList(itemArray);
      });
  };

  const updateToken = async () => {
    U.readFromStorage('refreshJWT').then((refreshJWT: any) => {
      // accessToken 재발급
      axios
        .get('/api/users/refresh-access', {
          headers: { Authorization: `Bearer ${refreshJWT}` },
        })
        .then((response) => {
          const tokens = response.headers['set-cookie'][0];
          const renewedAccessToken = U.getCookie(tokens, 'accessToken');
          U.writeToStorage('accessJWT', renewedAccessToken);
          dispatch(A.setJWT(renewedAccessToken, refreshJWT));
          setAccessToken(renewedAccessToken);
        });
    });
  };

  const createCrew = async () => {
    axios
      .post(
        '/api/crews',
        { name, text, location },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      .then((_) => {
        navigation.navigate('Browse');
      })
      .catch(async (e) => {
        const errorStatus = e.response.status;
        if (errorStatus === 401) {
          await updateToken();
        } else {
          Alert.alert('비정상적인 접근입니다');
        }
      });
  };

  useEffect(() => {
    if (text !== '' && name !== '' && isTextValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [text, name, isTextValid]);

  // input validation
  useEffect(() => {
    if (text.length > 5 && text.length <= 20) {
      setIsTextValid(true);
    } else {
      setIsTextValid(false);
    }
  }, [text]);

  useEffect(() => {
    // name exist
    if (name) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  }, [name]);

  return (
    <SafeAreaView style={[S.styles.flex]}>
      <NavigationHeader
        Left={() => (
          <TouchableView onPress={goBack} style={{ paddingLeft: '2%' }}>
            <Icon name="chevron-back" size={30}></Icon>
          </TouchableView>
        )}
        title="크루 만들기"
        titleStyle={{ fontFamily: S.fonts.medium }}
        Right={() => (
          <TouchableView
            disabled={buttonDisabled}
            onPress={createCrew}
            style={{ paddingRight: '2%' }}
          >
            <Icon
              name="add"
              size={30}
              style={{
                color: buttonDisabled ? S.colors.sub : S.colors.primary,
              }}
            ></Icon>
          </TouchableView>
        )}
      ></NavigationHeader>
      <View style={[styles.qaContainer]}>
        <View style={[styles.questionContainer]}>
          <Text style={[styles.questionText]}>크루의 이름을 정해주세요</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          value={name}
          onChangeText={setName}
          placeholder="ex. 지산텍 크루"
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
      <View style={[styles.qaContainer]}>
        <View style={[styles.questionContainer]}>
          <Text style={[styles.questionText]}>
            크루 소개를 적어주세요 (20자 이하)
          </Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          value={text}
          onChangeText={settext}
          placeholder="ex. 더 나은 우리 동네를 위하여!"
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
        <Text
          style={[
            styles.validText,
            { color: isTextValid ? Colors.green500 : Colors.red500 },
          ]}
        >
          {text === ''
            ? ' '
            : isTextValid
            ? '센스있는 소개네요 :)'
            : '너무 짧아요 :('}
        </Text>
      </View>
      <View style={[styles.qaContainer, { flex: 3 }]}>
        <View style={[styles.questionContainer]}>
          <Text style={[styles.questionText]}>주 활동 지역을 선택해주세요</Text>
        </View>
        <View
          style={{
            flex: 7,
            zIndex: 1,
          }}
        >
          <DropDownPicker
            textStyle={{ fontFamily: S.fonts.medium }}
            labelStyle={{
              fontFamily: S.fonts.medium,
            }}
            badgeColors={S.colors.primary}
            listMode="FLATLIST"
            maxHeight={400}
            open={open}
            value={location}
            items={locationList}
            setOpen={setOpen}
            setValue={setLocation}
            setItems={setLocationList}
            placeholder="동,읍,면을 검색하세요"
            searchable={true}
            searchPlaceholder="ex. 운정2동"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
