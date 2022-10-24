import { Image, View } from "react-native";
import logo from "../images/logo.png";
import { Appbar } from "react-native-paper";
import React from "react";

const Header = () => {
  return (
    <Appbar.Header
      style={{ justifyContent: "space-between", backgroundColor: "white" }}
    >
      <View>
        <Image style={{ width: 120, height: 50, margin: 10 }} source={logo} />
      </View>

      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

export default Header;
