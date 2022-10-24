import React, { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import wedding from "../images/image2.png";
import birthday from "../images/image3.png";
import engagement from "../images/Engagement.png";
import { CardComponent, CategoryImage, DataCellImage } from "../Style";
import {
  Text as PaperText,
  Card,
  Button,
  DataTable,
  List,
  MD3Colors,
  Appbar,
} from "react-native-paper";

import {
  useAuthControllerLogin,
  useUsersControllerFindAll,
  useCardetailsControllerFindAll,
} from "../api";
import logo from "../images/logo.png";
import { useNavigation } from "@react-navigation/core";

const Categories = () => {
  const navigation = useNavigation();
  const { mutate } = useAuthControllerLogin({});
  const { data } = useUsersControllerFindAll();
  const { data: cardData } = useCardetailsControllerFindAll({});

  const getWellSoonCards = cardData?.filter(
    (val) => val.cardCategory === "GetWellInvitation"
  );

  const weddingCards = cardData?.filter(
    (val) => val.cardCategory === "WeddingInvitation"
  );

  const engagementCards = cardData?.filter(
    (val) => val.cardCategory === "EngagementInvitation"
  );

  useEffect(() => {
    mutate({
      email: "",
      password: "",
    });
  }, []);
  return (
    <>
      <View style={{ margin: 10 }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            margin: 10,
            fontWeight: "bold",
          }}
        >
          Top Categories
        </Text>
        <ScrollView
          snapToStart
          snapToInterval={90}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          <CategoryImage
            source={wedding}
            text={"Wedding"}
            onPress={() => {
              navigation.navigate("WeddingCards");
            }}
          />

          <CategoryImage
            source={birthday}
            text={"Birthday"}
            onPress={() => {
              navigation.navigate("BirthdayCards");
            }}
          />
          <CategoryImage
            source={engagement}
            text={"Engagement"}
            onPress={() => {
              navigation.navigate("EngagementCards");
            }}
          />
          <CategoryImage
            source={wedding}
            text={"Anniversary"}
            onPress={() => {
              navigation.navigate("AnniversaryCards");
            }}
          />

          <CategoryImage
            source={birthday}
            text={"Baby Shower"}
            onPress={() => {
              navigation.navigate("BabyShowerCards");
            }}
          />
          <CategoryImage
            source={engagement}
            text={"Congratulations"}
            onPress={() => {
              navigation.navigate("CongratulationCards");
            }}
          />
          <CategoryImage
            source={wedding}
            text={"Get Well Soon"}
            onPress={() => {
              navigation.navigate("GetWellSoonCards");
            }}
          />
          <CategoryImage
            source={birthday}
            text={"Miss You"}
            onPress={() => {
              navigation.navigate("MissYouCards");
            }}
          />
          <CategoryImage
            source={engagement}
            text={"Reception"}
            onPress={() => {
              navigation.navigate("ReceptionCards");
            }}
          />

          <CategoryImage
            source={wedding}
            text={"Thank You"}
            onPress={() => {
              navigation.navigate("ThankYouCards");
            }}
          />
        </ScrollView>
      </View>
      {/*<Card>*/}
      {/*  <Card.Content*/}
      {/*    style={{*/}
      {/*      flexDirection: "row",*/}
      {/*      justifyContent: "space-between",*/}
      {/*      alignItems: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <PaperText variant="titleMedium">Wedding Cards</PaperText>*/}
      {/*    <Button buttonColor="#f450a9" textColor="white">*/}
      {/*      View All*/}
      {/*    </Button>*/}
      {/*  </Card.Content>*/}
      {/*</Card>*/}
      <ScrollView>
        <CardComponent
          title={"Wedding Cards"}
          buttonText={"View All"}
          onPress={() => {
            navigation.navigate("WeddingCards");
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,

            flexWrap: "wrap",
            display: "flex",
          }}
        >
          {weddingCards?.slice(0, 4)?.map((value, index) => {
            return (
              <DataCellImage
                key={index}
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
        {/*<View*/}
        {/*  style={{*/}
        {/*    flexDirection: "row",*/}
        {/*    justifyContent: "center",*/}
        {/*    marginTop: 20,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <DataCellImage source={wedding}></DataCellImage>*/}
        {/*  <DataCellImage source={wedding}></DataCellImage>*/}
        {/*</View>*/}

        <CardComponent
          title={"Engagement Cards"}
          buttonText={"View All"}
          onPress={() => {
            navigation.navigate("EngagementCards");
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,

            flexWrap: "wrap",
            display: "flex",
          }}
        >
          {engagementCards?.slice(0, 4)?.map((value, index) => {
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

        <CardComponent
          title={"Get Well Soon Cards"}
          buttonText={"View All"}
          onPress={() => {
            navigation.navigate("GetWellSoonCards");
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,

            flexWrap: "wrap",
            display: "flex",
          }}
        >
          {getWellSoonCards?.slice(0, 4)?.map((value, index) => {
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

        <Card>
          <Card.Title
            titleStyle={{ textAlign: "center", fontWeight: "bold" }}
            title="Customized Card"
          />
          <Card.Content style={{ justifyContent: "center" }}>
            <PaperText style={{ fontWeight: "bold" }}>
              Looking for a Designer for a Customised e-card?
            </PaperText>

            <Text
              style={{ fontSize: 12, marginTop: 8 }}
            >{`\u2022 We've got you covered!`}</Text>
            <Text
              style={{ fontSize: 12, marginTop: 3 }}
            >{`\u2022 You're Special & your Wedding card needs to be Special too`}</Text>

            <PaperText style={{ fontWeight: "bold", marginTop: 15 }}>
              How it works?
            </PaperText>

            <Text
              style={{ fontSize: 12, marginTop: 8 }}
            >{`\u2022 Get a dedicated Designer for your Wedding/Engagement e-card.`}</Text>
            <Text
              style={{ fontSize: 12, marginTop: 3 }}
            >{`\u2022 Delivery within 3 working days.`}</Text>

            <Text
              style={{ fontSize: 12, marginTop: 3 }}
            >{`\u2022 Flexible editing & customer support`}</Text>

            {/*<Button*/}
            {/*  style={{ marginTop: 15, width: 120 }}*/}
            {/*  mode="contained"*/}
            {/*  buttonColor="#ff3162"*/}
            {/*  onPress={() => console.log("Pressed")}*/}
            {/*>*/}
            {/*  Buy Now*/}
            {/*</Button>*/}
          </Card.Content>

          <Card.Content style={{ alignItems: "center" }}>
            <Button
              style={{ marginTop: 20, width: 120 }}
              mode="contained"
              buttonColor="#ff3162"
              onPress={() => console.log("Pressed")}
            >
              Buy Now
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

export default Categories;
