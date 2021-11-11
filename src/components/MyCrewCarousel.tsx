import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { crewData } from "./Home/dummy";
import { TouchableView } from ".";
import * as S from "../screens/Styles";

const deviceWidth = Dimensions.get("window").width;
const gap = deviceWidth * 0.02;
const offset = deviceWidth * 0.03;
const pageWidth = deviceWidth * 0.4;

export const MyCrewCarousel: React.FC = () => {
  const renderItems = (item: any) => {
    return (
      <TouchableView style={[styles.imageWrapper]} activeOpacity={0.9}>
        <ImageBackground
          style={[styles.image]}
          imageStyle={{ borderRadius: 15 }}
          source={{ uri: item.item.uri }}
        >
          <View style={[styles.imageTextWrapper]}>
            <Text
              style={[styles.imageText]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.item.name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableView>
    );
  };
  return (
    <View style={[styles.container]}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={crewData}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.id}`}
        pagingEnabled
        renderItem={renderItems}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: pageWidth,
    marginHorizontal: gap / 2,
    paddingBottom: "10%",
  },
  image: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  imageTextWrapper: {
    flex: 0.3,
    justifyContent: "center",
  },
  imageText: {
    fontFamily: S.fonts.bold,
    fontSize: 25,
    color: "white",
    paddingBottom: "10%",
  },
});
