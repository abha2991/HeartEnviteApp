import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthControllerViewer, useCardControllerFind } from "../api";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Footer from "./Footer";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const myCustomShare = async () => {};

  const { data: profile } = useAuthControllerViewer({});
  const userId = profile?.id;
  const { data: draftData } = useCardControllerFind(userId);
  let totalDrafts;
  let totalPurchased;

  function count(object) {
    let drafts = 0;
    let purchased = 0;
    for (let i = 0; i < object?.length; i++) {
      if (object[i].paymentStatus === "PENDING") {
        drafts++;
      } else if (object[i].paymentStatus === "SUCCESS") {
        purchased++;
      }
    }
    return { drafts, purchased };
  }
  totalDrafts = count(draftData)?.drafts;
  totalPurchased = count(draftData)?.purchased;
  if (profile) {
    return (
      <>
        <View style={{ flex: 0.9 }}>
          <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Avatar.Image
                  source={{
                    uri: `http://localhost:3001/ProfilePic/${profile?.profileImage}`,
                  }}
                  size={120}
                />
                <View style={{ marginLeft: 20 }}>
                  <Title
                    style={[
                      styles.title,
                      {
                        marginTop: 15,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    {profile?.firstName} {profile?.lastName}
                  </Title>
                  <Caption
                    style={[styles.caption, { margin: 10 }]}
                    onPress={() => {
                      navigation.navigate("EditProfileScreen");
                    }}
                  >
                    Edit Profile{" "}
                    <Entypo
                      name="edit"
                      size="11"
                      color="rgba(28, 28, 30, 0.68)"
                    />
                  </Caption>
                </View>
              </View>
            </View>

            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="phone" color="#777777" size={20} />
                <Text style={{ color: "#777777", marginLeft: 20 }}>
                  {profile?.phoneNumber}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="email" color="#777777" size={20} />
                <Text style={{ color: "#777777", marginLeft: 20 }}>
                  {profile?.email}
                </Text>
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 2,
                  },
                ]}
              >
                <Title>{totalDrafts}</Title>

                <Caption
                  style={{ fontWeight: "bold" }}
                  onPress={() => {
                    navigation.navigate("Drafts");
                  }}
                >
                  {" "}
                  <Entypo
                    name="shopping-cart"
                    color="rgba(28, 28, 30, 0.68)"
                    size={14}
                  />{" "}
                  {"  "} Drafts
                </Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>{totalPurchased}</Title>
                <Caption
                  style={{ fontWeight: "bold" }}
                  onPress={() => {
                    navigation.navigate("Purchased");
                  }}
                >
                  <MaterialCommunityIcons
                    name="cart-check"
                    color="rgba(28, 28, 30, 0.68)"
                    size={14}
                  />{" "}
                  {"  "}Purchased
                </Caption>
              </View>
            </View>

            <View style={styles.menuWrapper}>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <Icon name="heart" color="#ff3767" size={25} />
                  <Text style={styles.menuItemText}>Your Favorites</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <Icon name="credit-card" color="#ff3767" size={25} />
                  <Text style={styles.menuItemText}>Payment Details</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple>
                <View style={styles.menuItem}>
                  <Icon name="share" color="#ff3767" size={25} />
                  <Text style={styles.menuItemText}>Tell Your Friends</Text>
                </View>
              </TouchableRipple>
            </View>
          </SafeAreaView>
        </View>
        <View style={{ flex: 0.1 }}>
          <Footer />
        </View>
      </>
    );
  } else {
    navigation.navigate("Login");
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 2,
    borderTopColor: "#dddddd",
    borderTopWidth: 2,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    fontWeight: "bold",
    marginLeft: 20,

    fontSize: 16,
    lineHeight: 26,
  },
});
