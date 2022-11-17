import {
  useAuthControllerViewer,
  useCardControllerFind,
  useCardetailsControllerFindAll,
} from "../api";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardImage } from "../Style";
import { Button, Card } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const DraftsDetailPages = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const { data: profile } = useAuthControllerViewer({});

  const userId = profile?.id;
  const { data: draftData } = useCardControllerFind(userId);
  const cardDetails = draftData?.filter((val) => val.id === id);

  const category = cardDetails[0]?.cardCategory;
  console.log(cardDetails[0].id);

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
            <Button buttonColor="#ff3162" textColor="white">
              Pay And Download
            </Button>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </>
  );
};

export default DraftsDetailPages;
