import {
  useAuthControllerViewer,
  useCardControllerFind,
  useCardControllerFindById,
  useCardControllerFindOne,
} from "../api";

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardImage, DataCellImage } from "../Style";
import { Button, Card } from "react-native-paper";
// import RazorpayCheckout from "react-native-razorpay";

import { useNavigation } from "@react-navigation/core";
import RazorpayCheckout from "react-native-razorpay";
import { payment } from "../utils/Payment";

const Preview = ({ route }) => {
  const { id } = route.params;

  const { data: cardData1 } = useCardControllerFindOne(id);
  const navigation = useNavigation();
  const { data: profile } = useAuthControllerViewer({});

  // const options = {
  //   description: "HeartEnvite",
  //   image: { logo },
  //   currency: "INR",
  //   key: "rzp_test_g5mVREbtx16Zdy",
  //   amount: "5000",
  //   name: "HeartEnvite",
  //   prefill: {
  //     name: "Ezea group",
  //     email: "Ezea@zeabros.com",
  //     contact: "9999999999",
  //   },
  // };
  //
  // const onPayment = () => {
  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       alert("Success");
  //     })
  //     .catch((e) => {
  //       alert(e);
  //     });
  // };
  const [orderId, setOrderId] = useState();
  const createOrderId = async () => {
    console.log("create");
    const res = await fetch(
      `http://localhost:3001/api/paymentgateway/orderId`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //.then((data) => data.json());

    const orderDetails = await res.json();

    setOrderId(orderDetails?.createdOrdetDetails?.orderId);

    const options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_g5mVREbtx16Zdy",
      amount: "5000",
      name: "Acme Corp",
      order_id: orderId, //Replace this with an order_id created using Orders API.
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: "9191919191",
        name: "Gaurav Kumar",
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success

        // console.log({ data });
        const successData = {
          cardId: id,
          orderCreationId: orderId,
          razorpayPaymentId: data.razorpay_payment_id,
          razorpayOrderId: data.razorpay_order_id,
          razorpaySignature: data.razorpay_signature,
        };
        const result = fetch(
          "http://localhost:3001/api/paymentgateway/success",
          {
            method: "POST",
            body: JSON.stringify(successData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
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
          // style={{
          //   flexDirection: "row",
          //   justifyContent: "center",
          //
          //   flexWrap: "wrap",
          //   display: "flex",
          // }}
          >
            {cardData1?.previewCardNames?.map((value, index) => {
              return (
                <CardImage
                  key={index}
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
              <Button
                buttonColor="#ff3162"
                textColor="white"
                onPress={() => {
                  navigation.navigate("EditCard", {
                    id: cardData1.id,
                  });
                }}
              >
                Edit This Card
              </Button>
              <Button
                buttonColor="#ff3162"
                textColor="white"
                onPress={() =>
                  payment(
                    cardData1?.cardSalePrice,
                    profile?.firstName,
                    cardData1.id
                  )
                }
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
