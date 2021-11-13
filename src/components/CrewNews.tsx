import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as S from '../screens/Styles';

interface Props {
  dataArray: any;
}

const deviceHeight = Dimensions.get('window').height;

export const CrewNews: React.FC<Props> = ({ dataArray }) => {
  return dataArray.map((item: any) => {
    return (
      <TouchableOpacity
        style={[styles.container]}
        key={item.id}
        activeOpacity={0.9}
      >
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <View style={{ flex: 2, paddingRight: 10 }}>
            <Text style={[styles.titleText]} numberOfLines={3}>
              {item.title}
            </Text>
            <Text style={[styles.contentText]}>{item.content}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Image style={[styles.image]} source={item.path}></Image>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.dateText]}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    height: deviceHeight * 0.25,
    borderBottomWidth: 1,
    borderColor: S.colors.sub,
    paddingVertical: 10,
  },
  titleText: {
    fontFamily: S.fonts.medium,
    fontSize: S.fontSize.medium,
    lineHeight: 25,
  },
  contentText: {
    fontFamily: S.fonts.light,
    fontSize: S.fontSize.small,
    paddingVertical: '5%',
    lineHeight: 15,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  dateText: {
    fontFamily: S.fonts.light,
    fontSize: S.fontSize.tiny,
    paddingVertical: '3%',
  },
});
