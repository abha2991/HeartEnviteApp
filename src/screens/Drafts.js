import { useCardControllerFind, useAuthControllerViewer } from "../api";
import { ScrollView, Text, View } from "react-native";
import { DataCellImage } from "../Style";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import Footer from "./Footer";

const Drafts = () => {
  const navigation = useNavigation();
  const { data: profile } = useAuthControllerViewer({});

  const userId = profile?.id;
  const { data: draftData } = useCardControllerFind(userId);

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
          Drafts
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
            {draftData?.map((value, index) => {
              if (value.paymentStatus === "PENDING") {
                return (
                  <DataCellImage
                    cardSalePrice={value.cardSalePrice}
                    cardTotalPrice={value.cardTotalPrice}
                    key={index}
                    source={{
                      uri:
                        "http://localhost:3001/generated/" +
                        value.cardCategory +
                        "/" +
                        value.previewCardNames[0],
                    }}
                    onPress={() => {
                      navigation.navigate("DraftsDetailPages", {
                        id: value.id,
                      });
                    }}
                  ></DataCellImage>
                );
              } else {
              }
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

export default Drafts;
