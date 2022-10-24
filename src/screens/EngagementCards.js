import { ScrollView, Text, View } from "react-native";
import { CardComponent, DataCellImage } from "../Style";

import React from "react";
import { useCardetailsControllerFindAll } from "../api";
import { useNavigation } from "@react-navigation/core";

const EngagementCards = () => {
  const { data: cardData } = useCardetailsControllerFindAll({});
  const navigation = useNavigation();
  const engagementCards = cardData?.filter(
    (val) => val.cardCategory === "EngagementInvitation"
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
        Engagement Cards
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
          {engagementCards?.map((value, index) => {
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

export default EngagementCards;
