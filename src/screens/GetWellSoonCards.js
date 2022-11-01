import { ScrollView, Text, View } from "react-native";
import { CardComponent, DataCellImage } from "../Style";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useCardetailsControllerFindAll } from "../api";
import CategoriesHeader from "./CategoriesHeader";

const GetWellSoonCards = () => {
  const navigation = useNavigation();

  const { data: cardData } = useCardetailsControllerFindAll({});

  const getWellSoonCards = cardData?.filter(
    (val) => val.cardCategory === "GetWellInvitation"
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
        Get Well Soon Cards
      </Text>
      {/*<CategoriesHeader />*/}
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
          {getWellSoonCards?.map((value, index) => {
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

export default GetWellSoonCards;
