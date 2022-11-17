import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import { useAuthControllerViewer } from "../api";
import { useNavigation } from "@react-navigation/core";
import Login from "./Login";
import { Divider } from "@rneui/base";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "grey",
    height: 200,
  },
  avatar: {
    width: 200,
    height: 200,
    //borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80,
  },
  // name: {
  //   fontSize: 22,
  //   color: "#FFFFFF",
  //   fontWeight: "600",
  // },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

const Profile = () => {
  const { data: profile } = useAuthControllerViewer({});

  const navigation = useNavigation();
  if (profile) {
    return (
      <>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.header}></View>
            <Image
              style={styles.avatar}
              source={{
                uri: `http://localhost:3001/ProfilePic/${profile?.profileImage}`,
              }}
            />
            {/*<View style={styles.body}>*/}
            {/*  <View style={styles.bodyContent}>*/}
            {/*    <Text style={styles.name}>John Doe</Text>*/}
            {/*    <Text style={styles.info}>UX Designer / Mobile developer</Text>*/}
            {/*    <Text style={styles.description}>*/}
            {/*      Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum*/}
            {/*      electram expetendis, omittam deseruisse consequuntur ius an,*/}
            {/*    </Text>*/}

            {/*  </View>*/}
            {/*</View>*/}
            <View style={{ marginTop: 100 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text></Text>
                <Text style={{ fontSize: 16, margin: 3 }}>
                  {profile?.firstName} {profile?.lastName}
                </Text>

                <Entypo name="edit" size="11" color="rgba(28, 28, 30, 0.68)" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 25,
                }}
              >
                <Text></Text>
                <Text style={{ fontSize: 16, margin: 3 }}>
                  {profile?.email}
                </Text>
                <Entypo name="edit" size="11" color="rgba(28, 28, 30, 0.68)" />
              </View>
              <Divider
                style={{
                  shadowOpacity: 0.8,
                  shadowColor: "#000000",
                  shadowOffset: {
                    height: 1,
                    width: 1,
                  },
                }}
              ></Divider>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 16,
                }}
              >
                <Text style={{ fontSize: 18, color: "rgba(28, 28, 30, 0.68)" }}>
                  Drafts
                </Text>
                <Entypo
                  name="shopping-cart"
                  color="rgba(28, 28, 30, 0.68)"
                  size={26}
                />
              </View>
              <Divider
                style={{
                  shadowOpacity: 0.8,
                  shadowColor: "#000000",
                  shadowOffset: {
                    height: 1,
                    width: 1,
                  },
                }}
              ></Divider>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 16,
                }}
              >
                <Text style={{ fontSize: 18, color: "rgba(28, 28, 30, 0.68)" }}>
                  Purchased
                </Text>
                <MaterialCommunityIcons
                  name="cart-check"
                  color="rgba(28, 28, 30, 0.68)"
                  size={26}
                />
              </View>
            </View>
            <Divider
              style={{
                shadowOpacity: 0.8,
                shadowColor: "#000000",
                shadowOffset: {
                  height: 1,
                  width: 1,
                },
              }}
            ></Divider>
          </View>
        </SafeAreaView>
      </>
    );
  } else if (!profile) {
    // navigation.navigate("Login");
    return <Login />;
  }
};

export default Profile;
