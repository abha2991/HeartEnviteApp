import { useCardControllerFind, useAuthControllerViewer } from "../api";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { DataCellImage } from "../Style";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import Footer from "./Footer";
import * as FileSystem from "expo-file-system";
// import RNImageToPdf from "react-native-image-to-pdf";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const Purchased = () => {
  let deviceWidth = width;

  const navigation = useNavigation();
  const { data: profile } = useAuthControllerViewer({});

  const userId = profile?.id;
  const { data: draftData } = useCardControllerFind(userId);

  // const myAsyncPDFFunction = async () => {
  //   try {
  //     const options = {
  //       imagePaths:
  //         "http://localhost:3001/generated/CongratulationsInvitation/Congratulations_1_1-1667396694455.png",
  //       name: "PDFName",
  //       maxSize: {
  //         width: 900,
  //         height: 800,
  //       },
  //       quality: 0.7,
  //     };
  //
  //     console.log({ options });
  //     const pdf = await RNImageToPdf.createPDFbyImages(options);
  //
  //     console.log(pdf.filePath);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
          Purchased
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
              if (value.paymentStatus === "SUCCESS") {
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
                        value.cardNames[0],
                    }}
                    onPress={() => {
                      navigation.navigate("PurchasedCardDetailsPages", {
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

export default Purchased;
