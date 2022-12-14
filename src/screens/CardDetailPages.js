import { useCardetailsControllerFindAll } from "../api";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardImage } from "../Style";
import { Button } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import Footer from "./Footer";

const CardDetailPages = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  const { data: cardData } = useCardetailsControllerFindAll({});
  const cardDetails = cardData?.filter((val) => val.id === id);
  const category = cardDetails?.[0].cardCategory;
  const link =
    "http://localhost:3001/assets/" +
    category +
    "/" +
    cardDetails?.[0]?.cardTemplates?.[0];

  return (
    <>
      <View style={{ flex: 0.9 }}>
        <ScrollView>
          {cardDetails?.[0]?.cardTemplates?.map((value, index) => {
            return (
              <>
                <CardImage
                  key={index}
                  source={{
                    uri:
                      "http://localhost:3001/assets/" + category + "/" + value,
                  }}
                />
              </>
            );
          })}
          <View style={{ alignItems: "center" }}></View>
        </ScrollView>
        <SafeAreaView style={{ alignItems: "center" }}>
          <Button
            style={{
              marginTop: 20,
              width: 150,
              fontWeight: "bolder",
            }}
            mode="contained"
            buttonColor="#ff3162"
            // onPress={() => {
            //
            //   navigation.navigate("Card1", {
            //     id: id,
            //     category: category,
            //   });
            // }}

            onPress={() => {
              navigation.navigate("MultiPagesCard", {
                id: id,
                category: category,
              });
            }}
          >
            Try This Card
          </Button>
        </SafeAreaView>
      </View>
      <View style={{ flex: 0.1 }}>
        <Footer />
      </View>
    </>
  );
};

export default CardDetailPages;
