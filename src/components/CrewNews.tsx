import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import * as S from "../screens/Styles";

interface Props {
  dataArray: any;
}

const deviceHeight = Dimensions.get("window").height;

export const CrewNews: React.FC<Props> = ({ dataArray }) => {
  return dataArray.map((item: any) => {
    return (
      <View style={[styles.container]} key={item.id}>
        <View style={{ flex: 3, flexDirection: "row" }}>
          <View style={{ flex: 2, paddingRight: 10 }}>
            <Text style={[styles.titleText]} numberOfLines={3}>
              {item.title}
            </Text>
            <Text style={[styles.contentText]}>{item.content}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Image style={[styles.image]} source={{ uri: item.uri }}></Image>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.dateText]}>{item.date}</Text>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    height: deviceHeight * 0.25,
    borderBottomWidth: 1,
    borderColor: S.colors.secondary,
    paddingVertical: 10,
  },
  titleText: {
    fontFamily: S.fonts.medium,
    fontSize: 20,
    lineHeight: 22,
  },
  contentText: {
    fontFamily: S.fonts.light,
    fontSize: 13,
    paddingVertical: "5%",
    lineHeight: 15,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
  },
  dateText: {
    fontFamily: S.fonts.light,
    fontSize: 11,
    paddingVertical: "3%",
  },
});
