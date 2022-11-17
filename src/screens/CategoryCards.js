import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardComponent, DataCellImage } from "../Style";

import React from "react";
import { useCardetailsControllerFindAll } from "../api";
import { useNavigation } from "@react-navigation/core";
import Footer from "./Footer";

const AnniversaryCards = ({ route }) => {
  const { data: cardData } = useCardetailsControllerFindAll({});
  const { category, name } = route.params;
  const navigation = useNavigation();
  const Cards = cardData?.filter((val) => val.cardCategory === category);

  return (
    <>
      <View style={{ flex: 0.9 }}>
        <Text
          style={{
            fontSize: 18,
            margin: 15,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {name}
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
            {Cards?.map((value, index) => {
              return (
                <DataCellImage
                  key={index}
                  cardSalePrice={value.cardSalePrice}
                  cardTotalPrice={value.cardTotalPrice}
                  source={{
                    uri:
                      "http://localhost:3001/assets/" +
                      value?.cardCategory +
                      "/" +
                      value?.cardTemplates[0],
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
      </View>
      <View style={{ flex: 0.1 }}>
        <Footer />
      </View>
    </>
  );
};

export default AnniversaryCards;
