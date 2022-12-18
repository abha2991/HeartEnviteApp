import {
  useAuthControllerViewer,
  useCardControllerFind,
  useCardetailsControllerFindAll,
} from "../api";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardImage } from "../Style";
import { Button, Card } from "react-native-paper";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import * as FileSystem from "expo-file-system";
import RazorpayCheckout from "react-native-razorpay";

import { payment } from "../utils/Payment";

const DraftsDetailPages = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const { data: profile } = useAuthControllerViewer({});

  const userId = profile?.id;
  const { data: draftData } = useCardControllerFind(userId);
  const cardDetails = draftData?.filter((val) => val.id === id);

  const category = cardDetails[0]?.cardCategory;
  //console.log(cardDetails[0].id);

  const [orderId, setOrderId] = useState();
  const createOrderId = async () => {
    const userData = {
      price: cardDetails[0]?.cardSalePrice,
      userName: profile?.firstName,
    };
    const res = await fetch(
      `http://localhost:3001/api/paymentgateway/orderId`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      }
    );

    const orderDetails = await res.json();

    setOrderId(orderDetails?.createdOrdetDetails?.orderId);

    const options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_g5mVREbtx16Zdy",
      amount: cardDetails[0]?.cardSalePrice * 100,
      name: profile?.firstName,
      order_id: orderId,
      prefill: {
        email: "Ezea@zeabros.com",
        contact: "9191919191",
        name: "Ezea group",
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success

        const successData = {
          cardId: id,
          orderCreationId: orderId,
          razorpayPaymentId: data.razorpay_payment_id,
          razorpayOrderId: data.razorpay_order_id,
          razorpaySignature: data.razorpay_signature,
        };

        const result = fetch(
          "http://localhost:3001/api/paymentgateway/paymentSuccess",
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(successData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //.then((data) => data.json());
        //
        // const d = result.json();
        // console.log({ d });
        // if (result.status === 401) {
        //   alert(`Unsuccessful: Please try again!!!`);
        // } else {
        alert(`Success: Payment Done Successfully!!`);
        //}
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <>
      <ScrollView>
        {cardDetails?.[0]?.previewCardNames?.map((value, index) => {
          return (
            <>
              <CardImage
                key={index}
                source={{
                  uri:
                    "http://localhost:3001/generated/" + category + "/" + value,
                }}
              />
            </>
          );
        })}
        <View style={{ alignItems: "center" }}></View>
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
                  id: cardDetails[0]?.id,
                });
              }}
            >
              Edit This Card
            </Button>
            <Button
              buttonColor="#ff3162"
              textColor="white"
              //onPress={() => createOrderId()}

              onPress={() =>
                payment(cardDetails[0]?.cardSalePrice, profile?.firstName, id)
              }
            >
              Pay And Download
            </Button>
          </Card.Content>
        </Card>
        {/*<Button buttonColor="#ff3162" textColor="white" onPress={fun}>*/}
        {/*  download*/}
        {/*</Button>*/}
      </SafeAreaView>
    </>
  );
};

export default DraftsDetailPages;
