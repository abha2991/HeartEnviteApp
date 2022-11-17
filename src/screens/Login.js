import React, { useState, createRef } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { SocialIcon } from "react-native-elements";
import { useAuthControllerLogin } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#ff3162",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#ff3162",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#8b9cb5",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },

  socialIcon: {
    height: 50,
    width: "90%",
    margin: 18,
  },
  textRegister: {
    color: "#8b9cb5",
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
  },
});

const Login = () => {
  const { mutateAsync } = useAuthControllerLogin({});
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    //let dataToSend = { email: userEmail, password: userPassword };
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");

    // fetch("http://localhost:3000/api/user/login", {
    //   method: "POST",
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === "success") {
    //       AsyncStorage.setItem("user_id", responseJson.data.email);
    //       console.log(responseJson.data.email);
    //       navigation.replace("DrawerNavigationRoutes");
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log("Please check your email id or password");
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });

    try {
      const res = await mutateAsync({
        data: {
          email: userEmail,
          password: userPassword,
        },
      });

      await AsyncStorage.setItem("token", res.accessToken);
      navigation.navigate("Dashboard");
    } catch (e) {
      alert("Either email or password is incorrect");
    }
  };

  return (
    <>
      <View style={[styles.mainBody, { flex: 0.9 }]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: "center" }}>
                <SocialIcon
                  style={styles.socialIcon}
                  button
                  title="Sign In With Facebook"
                  type="facebook"
                  onPress={() => {
                    alert("facebook");
                  }}
                />

                <SocialIcon
                  style={styles.socialIcon}
                  button
                  title="Sign In With Google"
                  type="google"
                  onPress={() => {
                    alert("google");
                  }}
                />

                {/*<Image*/}
                {/*  source={require("../images/image2.png")}*/}
                {/*  style={{*/}
                {/*    width: "50%",*/}
                {/*    height: 100,*/}
                {/*    resizeMode: "contain",*/}
                {/*    margin: 30,*/}
                {/*  }}*/}
                {/*/>*/}
              </View>
              <Text style={styles.textRegister}>
                {" "}
                ─────────── OR ────────────
              </Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                  placeholder="Enter Password"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext !== "" ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
              >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>

              <Text style={styles.registerTextStyle}>
                New Here ?{" "}
                <Text
                  style={{ textDecorationLine: "underline", color: "#0d6efd" }}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  Register
                </Text>
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 0.1 }}>
        <Footer />
      </View>
    </>
  );
};
export default Login;
