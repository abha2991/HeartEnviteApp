import { ScrollView, Text, View } from "react-native";
import { CardComponent, DataCellImage } from "../Style";

import React from "react";
import { useCardetailsControllerFindAll } from "../api";
import { useNavigation } from "@react-navigation/core";

const ThankYouCards = () => {
  const { data: cardData } = useCardetailsControllerFindAll({});
  const navigation = useNavigation();
  const thankYouCards = cardData?.filter(
    (val) => val.cardCategory === "ThankYouInvitation"
  );
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
        Thank You Cards
      </Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,

            flexWrap: "wrap",
            display: "flex",
          }}
        >
          {thankYouCards?.map((value, index) => {
            return (
              <DataCellImage
                key={index}
                cardSalePrice={value.cardSalePrice}
                cardTotalPrice={value.cardTotalPrice}
                source={{
                  uri:
                    "http://localhost:3001/assets/" +
                    value.cardCategory +
                    "/" +
                    value.cardTemplates[0],
                }}
                onPress={() => {
                  navigation.navigate("CardDetailPages", {
                    id: value.id,
                  });
                }}
              ></DataCellImage>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default ThankYouCards;
