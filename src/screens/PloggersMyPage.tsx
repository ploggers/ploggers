import { useNavigation, StackActions } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useStore } from "react-redux";
import {
  PloggersNavigationHeader,
  PloggersTouchableView,
} from "../components/PloggersMyPage";
import { CrewCard } from "../components/Home";
import * as S from "./Styles";
import * as L from "../store/login";
import * as U from "../utils";
import * as A from "../store/asyncStorage";
import * as I from "../store/isAuthorized";

export default function MyPage() {
  const store = useStore();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isAuthorized } = store.getState().isAuthorized;
  const { name } = store.getState().login.loggedUser;

  const goOnboarding = useCallback(() => {
    navigation.navigate("OnBoarding");
  }, []);
  const goBelongToGroups = useCallback(() => {
    navigation.navigate("BelongToGroups");
  }, []);
  const goFollowGroups = useCallback(() => {
    navigation.navigate("FollowGroups");
  }, []);

  const logout = useCallback(() => {
    dispatch(L.logoutAction());
    dispatch(A.setJWT("", ""));
    dispatch(I.setIsAuthorized(false));
    U.removeStorage(L.loggedUserKey);
    U.removeStorage("accessJWT");
    U.removeStorage("refreshJWT");
    navigation.dispatch(StackActions.popToTop());
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isAuthorized ? S.colors.primary : "white" },
      ]}
    >
      <PloggersNavigationHeader
        Right={() => <PloggersTouchableView></PloggersTouchableView>}
      ></PloggersNavigationHeader>

      <View style={{ height: "100%" }}>
        <View
          style={[
            styles.profileContainer,
            { backgroundColor: S.colors.primary },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.bigText,
                { textAlign: "left", fontSize: 35, color: "white" },
              ]}
            >
              {name}님
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <PloggersTouchableView
                style={{ flexDirection: "column" }}
                onPress={goBelongToGroups}
              >
                <Text
                  style={[
                    styles.bigText,
                    { paddingTop: 5, color: S.colors.primary },
                  ]}
                >
                  내 점수
                </Text>
                <Text
                  style={[
                    styles.bigText,
                    { paddingTop: 5, color: S.colors.primary },
                  ]}
                >
                  940점
                </Text>
              </PloggersTouchableView>
              <PloggersTouchableView
                style={{ flexDirection: "column" }}
                onPress={goFollowGroups}
              >
                <SimpleLineIcons
                  name="badge"
                  size={35}
                  color={S.colors.primary}
                  style={{ alignSelf: "center" }}
                />
                <Text
                  style={[
                    styles.bigText,
                    { paddingTop: 5, color: S.colors.primary },
                  ]}
                >
                  내 배지
                </Text>
              </PloggersTouchableView>
            </View>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
        <Text>마이 크루</Text>
        <CrewCard />
        <View style={[styles.menuContainer]}>
          <View style={{ flex: 1 }}>
            <PloggersTouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text style={[styles.mediumText]}>프로필 관리</Text>
            </PloggersTouchableView>
            <PloggersTouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text style={[styles.mediumText]}>문의하기</Text>
            </PloggersTouchableView>
            <PloggersTouchableView
              style={{
                flex: 1,
                borderBottomColor: S.colors.secondary,
                borderBottomWidth: 1,
                justifyContent: "center",
              }}
              onPress={() => {
                Alert.alert("로그아웃하시겠습니까?", "", [
                  {
                    text: "아니요",
                  },
                  {
                    text: "네",
                    onPress: logout,
                  },
                ]);
              }}
            >
              <Text style={[styles.mediumText]}>로그아웃</Text>
            </PloggersTouchableView>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: "5%",
  },
  menuContainer: {
    flex: 3,
    paddingHorizontal: "5%",
    backgroundColor: "white",
  },
  bigText: {
    fontFamily: S.fonts.bold,
    textAlign: "center",
    fontSize: 18,
  },
  mediumText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
  },
});
