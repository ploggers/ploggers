import React, { useState, useCallback, useEffect } from 'react';
import { useAutoFocus } from '@contexts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from '../Styles';
import { NavigationHeader, TouchableView } from '@components';
import { Colors } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './style';
/*
Todo
2. 비밀번호 표시 이후 비밀번호 한 번에 지워지는 버그 해결
3. 키보드 가리지 않게 하기
5. 오토포커싱
 */
export default function PloggersCreateCrew() {
  const [desc, setDesc] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<Array<any>>([]);
  const [locationList, setLocationList] = useState<Array<any>>([
    { label: '운정2동', value: '운정2동' },
    { label: '서대문구', value: '서대문구' },
    { label: '내맘속', value: '내맘속' },
    { label: '니맘속', value: '니맘속' },
    { label: '아몰라', value: '아몰라' },
  ]);
  const [open, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isDescValid, setIsDescValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const focus = useAutoFocus();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBack = useCallback(() => navigation.goBack(), []);

  useEffect(() => {
    if (desc !== '' && name !== '' && isDescValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [desc, name, isDescValid]);

  // input validation
  useEffect(() => {
    if (desc.length > 5 && desc.length <= 20) {
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
          <TouchableView style={{ paddingRight: '2%' }}>
            <Icon
              name="add"
              size={30}
              style={{ color: S.colors.primary }}
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
          placeholder="ex. 파주 불주먹"
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
          value={desc}
          onChangeText={setDesc}
          placeholder="ex. 더 나은 파주를 위하여!"
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
            searchPlaceholder="ex. 운정"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}