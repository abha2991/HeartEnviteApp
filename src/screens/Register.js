import React, { useState, createRef } from "react";
import { Divider } from "react-native-paper";
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

import * as WebBrowser from "expo-web-browser";
import {
  useAuthControllerFacebookAuth,
  useAuthControllerRegister,
} from "../api";

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

const Register = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();
  const { mutateAsync } = useAuthControllerRegister({});

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
    try {
      const res = await mutateAsync({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: userEmail,
          password: userPassword,
        },
      });
      alert("Registered Successfully");
      navigation.navigate("Login");
    } catch (e) {
      alert("Please fill details properly Or Email is already present");
    }
  };

  const handleFacebook = async () => {
    try {
      //const res = await fetch("api/auth/facebook");
      await WebBrowser.openBrowserAsync(
        "http://192.168.1.3:3001/api/auth/facebook"
      );
      // await AsyncStorage.setItem("token", res.accessToken);
      // navigation.navigate("Dashboard");
    } catch (e) {
      alert("Either email or password is incorrect");
    }
  };

  const handleGoogle = async () => {
    try {
      //const res = await fetch("api/auth/facebook");
      let result = await WebBrowser.openBrowserAsync(
        "http://192.168.1.3:3001/api/auth/google"
      );
      console.log({ result });
      // await AsyncStorage.setItem("token", res.accessToken);
      // navigation.navigate("Dashboard");
    } catch (e) {
      alert("Either email or password is incorrect");
    }
  };

  // const handleSubmitPress = () => {
  //   setErrortext("");
  //   if (!userEmail) {
  //     alert("Please fill Email");
  //     return;
  //   }
  //   if (!userPassword) {
  //     alert("Please fill Password");
  //     return;
  //   }
  //   setLoading(true);
  //   let dataToSend = { email: userEmail, password: userPassword };
  //   let formBody = [];
  //   for (let key in dataToSend) {
  //     let encodedKey = encodeURIComponent(key);
  //     let encodedValue = encodeURIComponent(dataToSend[key]);
  //     formBody.push(encodedKey + "=" + encodedValue);
  //   }
  //   formBody = formBody.join("&");
  //
  //   fetch("http://localhost:3000/api/user/login", {
  //     method: "POST",
  //     body: formBody,
  //     headers: {
  //       //Header Defination
  //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.log(responseJson);
  //       // If server response message same as Data Matched
  //       if (responseJson.status === "success") {
  //         AsyncStorage.setItem("user_id", responseJson.data.email);
  //         console.log(responseJson.data.email);
  //         navigation.replace("DrawerNavigationRoutes");
  //       } else {
  //         setErrortext(responseJson.msg);
  //         console.log("Please check your email id or password");
  //       }
  //     })
  //     .catch((error) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };

  return (
    <View style={styles.mainBody}>
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
                // onPress={() => {
                //   alert("facebook");
                // }}

                onPress={handleFacebook}
              />

              <SocialIcon
                style={styles.socialIcon}
                button
                title="Sign In With Google"
                type="google"
                // onPress={() => {
                //   alert("google");
                // }}

                onPress={handleGoogle}
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
                onChangeText={(firstName) => setFirstName(firstName)}
                placeholder="Enter First Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(lastName) => setLastName(lastName)}
                placeholder="Enter Last name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
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
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>

            <Text
              style={styles.registerTextStyle}
              //onPress={() => navigation.navigate("RegisterScreen")}
            >
              Already Registered ?{" "}
              <Text
                style={{ textDecorationLine: "underline", color: "#0d6efd" }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Login
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Register;
