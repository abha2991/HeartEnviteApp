import {
  useCardControllerFind,
  useCardControllerFindById,
  useCardControllerFindOne,
} from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardImage, DataCellImage } from "../Style";
import { Button, Card } from "react-native-paper";
// import RazorpayCheckout from "react-native-razorpay";
import logo from "../images/logo.png";
import RazorpayCheckout from "react-native-razorpay";

const Preview = ({ route }) => {
  const { id } = route.params;

  const { data: cardData1 } = useCardControllerFindOne(id);

  const options = {
    description: "HeartEnvite",
    image: { logo },
    currency: "INR",
    key: "rzp_test_g5mVREbtx16Zdy",
    amount: "5000",
    name: "HeartEnvite",
    prefill: {
      name: "Ezea group",
      email: "Ezea@zeabros.com",
      contact: "9999999999",
    },
  };

  const onPayment = () => {
    RazorpayCheckout.open(options)
      .then((data) => {
        alert("Success");
      })
      .catch((e) => {
        alert(e);
      });
  };

  if (cardData1) {
    return (
      <>
        <Text
          style={{
            fontSize: 18,
            margin: 15,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Preview
        </Text>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              flexWrap: "wrap",
              display: "flex",
            }}
          >
            {cardData1?.previewCardNames?.map((value, index) => {
              return (
                <CardImage
                  source={{
                    uri:
                      "http://localhost:3001/generated/" +
                      cardData1?.cardCategory +
                      "/" +
                      value,
                  }}
                ></CardImage>
              );
            })}
          </View>
        </ScrollView>
        <SafeAreaView
          style={{ justifyContent: "space-between", fontWeight: "bolder" }}
        >
          <Card>
            <Card.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button buttonColor="#ff3162" textColor="white">
                Edit This Card
              </Button>
              <Button
                buttonColor="#ff3162"
                textColor="white"
                //onPress={() => onPayment()}
              >
                Pay And Download
              </Button>
            </Card.Content>
          </Card>
        </SafeAreaView>
      </>
    );
  }
};

export default Preview;
