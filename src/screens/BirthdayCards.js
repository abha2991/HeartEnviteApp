import { ScrollView, Text, View, StyleSheet } from "react-native";
import { CardComponent, DataCellImage } from "../Style";

import React from "react";
import { useCardetailsControllerFindAll } from "../api";
import { useNavigation } from "@react-navigation/core";

const BirthdayCards = () => {
  const { data: cardData } = useCardetailsControllerFindAll({});
  const navigation = useNavigation();
  const birthdayCards = cardData?.filter(
    (val) => val.cardCategory === "BirthdayInvitation"
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
        Birthday Cards
      </Text>
      <ScrollView>
        {/*<CardComponent style={{ textAlign: "center" }} title={"Birthday Cards"} />*/}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,

            flexWrap: "wrap",
            display: "flex",
          }}
        >
          {birthdayCards?.map((value, index) => {
            return (
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
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default BirthdayCards;
