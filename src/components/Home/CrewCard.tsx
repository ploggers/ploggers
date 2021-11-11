import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { PloggersTouchableView } from "../MyPage";
import * as S from "../../screens/Styles";

import { crewData } from "./dummy";

const gap = 0;
const offset = 0;
const deviceWidth = Dimensions.get("window").width * 0.7;

export const CrewCard: React.FC = () => {
  const renderItems = (item: any) => {
    return (
      <Card>
        <Card.Content
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <PloggersTouchableView>
              <Avatar.Text
                label={item.item.name[0]}
                size={50}
                style={{ backgroundColor: item.item.color }}
                color="white"
                labelStyle={{ fontFamily: S.fonts.bold, fontSize: 25 }}
              />
            </PloggersTouchableView>
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: S.fonts.medium,
                  fontSize: 18,
                  marginBottom: 1,
                  color: "black",
                }}
              >
                {item.item.name}
              </Text>
              <Text
                style={{
                  fontFamily: S.fonts.medium,
                  fontSize: 12,
                  color: "grey",
                  marginBottom: 1,
                }}
              >
                Ranking: {item.item.ranking}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontFamily: S.fonts.medium,
                  fontSize: 12,
                  color: "grey",
                }}
              >
                {item.item.town}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
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
        snapToInterval={deviceWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  followingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: S.colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  followingText: {
    fontFamily: S.fonts.medium,
    fontSize: 12,
    color: "white",
  },
});
