// import React, { useState } from "react";
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   Pressable,
//   View,
//   TextInput,
// } from "react-native";
//
// import { useForm, Controller } from "react-hook-form";
//
// const CustomizedCardModal = (props) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text>{props.label}</Text>
//             <TextInput
//               type="text"
//               style={styles.modalText}
//               name={props.name}
//               onChangeText={props.onChangeText}
//               placeholder={props.text}
//               value={props.value}
//             ></TextInput>
//
//             <Text style={styles.label}>Phone</Text>
//             <TextInput
//               type="text"
//               style={styles.modalText}
//               name="Phone"
//               onChangeText={props.onChangeText}
//               placeholder="Phone"
//               value="Phone"
//             ></TextInput>
//
//             <TextInput
//               autoCompleteType="email"
//               keyboardType="email-address"
//               textContentType="emailAddress"
//               placeholder="Email"
//             />
//             <TextInput
//               secureTextEntry
//               autoCompleteType="password"
//               placeholder="Password"
//             />
//
//             <Text>First name</Text>
//             <Controller
//               as={TextInput}
//               name="firstName"
//               rules={{ required: true }}
//               defaultValue=""
//             />
//
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
//           Buy Now
//         </Text>
//       </Pressable>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     width: "80%",
//
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: "#ff3767",
//   },
//   buttonClose: {
//     backgroundColor: "#ff3767",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
//
//   label: {
//     alignItems: "left",
//     justifyContent: "left",
//     textAlign: "left",
//   },
//
//   inputStyle: {
//     flex: 1,
//     color: "black",
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: "#dadae8",
//   },
// });
//
// export default CustomizedCardModal;

// import { useState } from "react";
// import { TextInput, View, StyleSheet } from "react-native";
// import { Text } from "@rneui/base";
//
// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 0.5,
//   //   backgroundColor: "#000",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   // },
// });
//
// const CustomizedCardModal = () => {
//   const [value, setValue] = useState(0);
//   return (
//     <View style={styles.container}>
//       <Text style={{ color: "black" }}> Login Form </Text>
//       <View>
//         <TextInput style={{ color: "black" }} value="Enter Email" />
//         <TextInput
//           style={{ color: "white" }}
//           secureTextEntry={true}
//           value="Enter Password"
//         />
//       </View>
//     </View>
//   );
// };
//
// export default CustomizedCardModal;

import React, { useState, createRef, useRef } from "react";
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

import {
  useAuthControllerLogin,
  useCustomizecardsqueryControllerCreate,
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
  titleStyle: {
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

const CustomizedCardModal = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEvent, setUserEvent] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const { mutateAsync } = useCustomizecardsqueryControllerCreate({});

  const handleSubmitPress = async () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPhoneNumber) {
      alert("Please fill Phone Number");
      return;
    }

    if (!userEvent) {
      alert("Please fill Event");
      return;
    }
    if (!userDescription) {
      alert("Please fill Description");
      return;
    }
    setLoading(true);

    try {
      const res = await mutateAsync({
        data: {
          name: userName,
          email: userEmail,
          phoneNumber: `+91${userPhoneNumber}`,
          event: userEvent,
          description: userDescription,
        },
      });

      if (res?.status === "success") {
        alert("Your request is submitted");
      } else {
        alert("Something Went Wrong!!");
      }
    } catch (e) {
      alert("Please fill proper details");
    }
  };

  return (
    <>
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
            <Text style={styles.titleStyle}>Customize Your Card</Text>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserName) => setUserName(UserName)}
                  placeholder="Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(PhoneNumber) =>
                    setUserPhoneNumber(PhoneNumber)
                  }
                  placeholder="Phone Number"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  placeholder="Email"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Event) => setUserEvent(Event)}
                  placeholder="Event"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Description) =>
                    setUserDescription(Description)
                  }
                  multiline
                  placeholder="Description"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
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
                <Text style={styles.buttonTextStyle}>SUBMIT</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default CustomizedCardModal;
