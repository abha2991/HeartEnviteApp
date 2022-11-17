import { Image, TouchableOpacity, View } from "react-native";
import logo from "../images/logo.png";
import { Appbar } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const Header = () => {
  const navigation = useNavigation();
  return (
    <Appbar.Header
      style={{ justifyContent: "space-between", backgroundColor: "white" }}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <Image style={{ width: 120, height: 50, margin: 10 }} source={logo} />
        </TouchableOpacity>
      </View>

      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

export default Header;
