import { ScrollView, Text, View } from "react-native";
import { CardComponent, DataCellImage } from "../Style";

import React from "react";
import { useCardetailsControllerFindAll } from "../api";
import { useNavigation } from "@react-navigation/core";

const WeddingCards = () => {
  const { data: cardData } = useCardetailsControllerFindAll({});
  const navigation = useNavigation();
  const weddingCards = cardData?.filter(
    (val) => val.cardCategory === "WeddingInvitation"
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
        Wedding Cards
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
          {weddingCards?.map((value, index) => {
            return (
              <>
                <View>
                  <DataCellImage
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
                  <View style={{ display: "flex" }}>
                    <Text>{value.cardSalePrice}</Text>
                    <Text style={{ textDecorationLine: "line-through" }}>
                      {value.cardTotalPrice}
                    </Text>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default WeddingCards;
