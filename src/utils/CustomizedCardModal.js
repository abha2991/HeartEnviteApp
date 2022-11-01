import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

const CustomizedCardModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{props.label}</Text>
            <TextInput
              type="text"
              style={styles.modalText}
              name={props.name}
              onChangeText={props.onChangeText}
              placeholder={props.text}
              value={props.value}
            ></TextInput>

            <Text style={styles.label}>Phone</Text>
            <TextInput
              type="text"
              style={styles.modalText}
              name="Phone"
              onChangeText={props.onChangeText}
              placeholder="Phone"
              value="Phone"
            ></TextInput>

            <TextInput
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Email"
            />
            <TextInput
              secureTextEntry
              autoCompleteType="password"
              placeholder="Password"
            />

            <Text>First name</Text>
            <Controller
              as={TextInput}
              name="firstName"
              rules={{ required: true }}
              defaultValue=""
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Buy Now
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#ff3767",
  },
  buttonClose: {
    backgroundColor: "#ff3767",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  label: {
    alignItems: "left",
    justifyContent: "left",
    textAlign: "left",
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
});

export default CustomizedCardModal;
