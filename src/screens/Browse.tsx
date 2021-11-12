import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationHeader, TouchableView } from "../components";
import Ranking from "../components/Ranking";
import * as S from "./Styles";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { MyCrewCarousel } from "../components/MyCrewCarousel";
import { EventCarousel } from "../components/EventCarousel";
import { CrewNews } from "../components/CrewNews";

import { EventDummy } from "../components/Home/dummy";

const deviceHeight = Dimensions.get("window").height;
export default function Browse() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedRanking, setSelectedRanking] = useState("전체");
  const goSearch = useCallback(() => {
    navigation.navigate("Search");
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationHeader
        Right={() => (
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderColor: S.colors.secondary,
              alignItems: "flex-end",
            }}
          >
            <TouchableView style={{ paddingHorizontal: "5%", marginBottom: 5 }}>
              <Icon
                name={"search-outline"}
                size={30}
                color="black"
                onPress={goSearch}
              />
            </TouchableView>
          </View>
        )}
      ></NavigationHeader>
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.menuContainer]}>
          <View style={[styles.iconContainer]}>
            <TouchableOpacity style={[styles.iconWrapper]}>
              <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon>
              <Text style={[styles.menuText]}>랭킹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconWrapper]}>
              <Icon name={"people"} size={40} style={[styles.icon]}></Icon>
              <Text style={[styles.menuText]}>크루 모집</Text>
            </TouchableOpacity>
            <View style={[styles.iconWrapper]}>
              {/* <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon> */}
            </View>
            <View style={[styles.iconWrapper]}>
              {/* <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon> */}
            </View>
          </View>
          {/* <View style={[styles.iconContainer]}> */}
          {/* <View style={[styles.iconWrapper]}> */}
          {/* <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon> */}
          {/* </View> */}
          {/* <View style={[styles.iconWrapper]}> */}
          {/* <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon> */}
          {/* </View> */}
          {/* <View style={[styles.iconWrapper]}> */}
          {/* <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon> */}
          {/* </View> */}
          {/* <View style={[styles.iconWrapper]}> */}
          {/* <Icon name={"trophy"} size={40} style={[styles.icon]}></Icon> */}
          {/* </View> */}
          {/* </View> */}
        </View>
        <View style={[styles.myCrewContainer]}>
          <Text style={[styles.bigText, styles.contentTitle]}>마이 크루</Text>
          <MyCrewCarousel />
        </View>
        <View style={[styles.eventContainer]}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.bigText, styles.contentTitle]}>이벤트</Text>
            <TouchableOpacity>
              <Text style={[styles.totalViewText]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <EventCarousel />
        </View>
        <View style={[styles.newsContainer]}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.bigText, styles.contentTitle]}>크루 소식</Text>
            <TouchableOpacity>
              <Text style={[styles.totalViewText]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: "5%" }}>
            <CrewNews dataArray={EventDummy} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flexGrow: 1,
    // height: deviceHeight * 0.25,
    borderBottomWidth: 6,
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    color: S.colors.primary,
  },
  myCrewContainer: {
    height: deviceHeight * 0.35,
    borderBottomWidth: 6,
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  eventContainer: {
    height: deviceHeight * 0.35,
    borderBottomWidth: 6,
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  newsContainer: {
    flexGrow: 1,
    borderBottomWidth: 6,
    borderColor: S.colors.secondary,
    paddingVertical: 15,
  },
  contentTitle: {
    fontSize: 20,
    paddingLeft: "5%",
    paddingVertical: "3%",
    textAlign: "left",
  },
  bigText: {
    fontFamily: S.fonts.bold,
  },
  totalViewText: {
    fontFamily: S.fonts.medium,
    paddingRight: "5%",
    paddingVertical: "3%",
    textAlign: "left",
    fontSize: 15,
    color: S.colors.secondary,
  },
  menuText: {
    fontFamily: S.fonts.medium,
    fontSize: 12,
    paddingTop: 3,
  },
  categoryContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  category: {
    flex: 1,
    justifyContent: "center",
  },
  categoryText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
  },
});

// <ScrollView
// style={{ flex: 1, paddingHorizontal: "5%" }}
// contentContainerStyle={{ flexGrow: 1 }}
// >
// <View style={{ flex: 1 }}>
//   <Text
//     style={[
//       styles.bigText,
//       {
//         color: S.colors.primary,
//         fontSize: 20,
//         paddingVertical: "2%",
//         textAlign: "left",
//       },
//     ]}
//   >
//     전체 랭킹
//   </Text>
//   <View style={{ flex: 1 }}>
//     <View
//       style={{
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingHorizontal: "10%",
//       }}
//     >
//       <TouchableView
//         style={[
//           styles.categoryContainer,
//           {
//             backgroundColor:
//               selectedRanking == "전체" ? S.colors.primary : "white",
//             borderColor:
//               selectedRanking == "전체"
//                 ? S.colors.primary
//                 : S.colors.secondary,
//           },
//         ]}
//         onPress={() => setSelectedRanking("전체")}
//       >
//         <View style={[styles.category]}>
//           <Text
//             style={[
//               styles.categoryText,
//               { color: selectedRanking == "전체" ? "white" : "black" },
//             ]}
//           >
//             전체
//           </Text>
//         </View>
//       </TouchableView>
//       <TouchableView
//         style={[
//           styles.categoryContainer,
//           {
//             backgroundColor:
//               selectedRanking == "대학" ? S.colors.primary : "white",
//             borderColor:
//               selectedRanking == "대학"
//                 ? S.colors.primary
//                 : S.colors.secondary,
//           },
//         ]}
//         onPress={() => setSelectedRanking("대학")}
//       >
//         <View style={[styles.category]}>
//           <Text
//             style={[
//               styles.categoryText,
//               { color: selectedRanking == "대학" ? "white" : "black" },
//             ]}
//           >
//             대학
//           </Text>
//         </View>
//       </TouchableView>
//     </View>
//   </View>
//   <View style={{ flex: 25 }}></View>
// </View>
// <View style={{ flex: 2, backgroundColor: "green" }}></View>
// </ScrollView>
