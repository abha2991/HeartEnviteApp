import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import wedding from "../images/image2.png";
import birthday from "../images/image3.png";
import engagement from "../images/Engagement.png";
import { CardComponent, CategoryImage, DataCellImage } from "../Style";
import CategoryList from "../CategoryList";
import CustomizedCardModal from "../utils/CustomizedCardModal";
import Modal from "react-native-modal";

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
import Footer from "./Footer";
import { ListItem } from "@rneui/themed";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});

const Dashboard = () => {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { mutate } = useAuthControllerLogin({});
  const { data } = useUsersControllerFindAll();
  const { data: cardData } = useCardetailsControllerFindAll({});
  const [showModal, setShowModal] = useState(false);
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
      <View style={{ flex: 0.9 }}>
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
            {CategoryList?.map((value, index) => {
              return (
                <CategoryImage
                  key={index}
                  source={value.image}
                  text={value.text}
                  onPress={() => {
                    navigation.navigate("CategoryCards", {
                      category: value.category,
                      name: value.value,
                    });
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
        {/*<Card1>*/}
        {/*  <Card1.Content*/}
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
        {/*  </Card1.Content>*/}
        {/*</Card1>*/}
        <ScrollView>
          <CardComponent
            title={"Wedding Cards"}
            buttonText={"View All"}
            onPress={() => {
              navigation.navigate("CategoryCards", {
                category: "WeddingInvitation",
                name: "Wedding Cards",
              });
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            {weddingCards?.slice(0, 4)?.map((value, index) => {
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

          <CardComponent
            title={"Engagement Cards"}
            buttonText={"View All"}
            onPress={() => {
              navigation.navigate("CategoryCards", {
                category: "EngagementInvitation",
                name: "Engagement Cards",
              });
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            {engagementCards?.slice(0, 4)?.map((value, index) => {
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

          <CardComponent
            title={"Get Well Soon Cards"}
            buttonText={"View All"}
            onPress={() => {
              navigation.navigate("CategoryCards", {
                category: "GetWellInvitation",
                name: "Get Well Soon Cards",
              });
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            {getWellSoonCards?.slice(0, 4)?.map((value, index) => {
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
            </Card.Content>

            <Card.Content style={{ alignItems: "center" }}>
              <Button
                style={{ marginTop: 20, width: 120 }}
                mode="contained"
                buttonColor="#ff3162"
                onPress={toggleModal}
                //onPress={CustomizedCardModal}
              >
                Buy Now
              </Button>

              <Modal
                onBackdropPress={() => setIsModalVisible(false)}
                style={{ height: 900 }}
                animationOutTiming={1000}
                animationOut={"slideOutUp"}
                isVisible={isModalVisible}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: 510,
                  }}
                >
                  <CustomizedCardModal />
                  <View style={{ alignItems: "center" }}>
                    <Button
                      style={{
                        alignItems: "center",
                      }}
                      titleStyle={{ color: "white" }}
                      onPress={toggleModal}
                    >
                      {" "}
                      <Entypo name="cross" size={14} color="black" />
                      Close
                    </Button>
                  </View>
                </View>
              </Modal>

              {/*<CustomizedCardModal*/}
              {/*  name={Button}*/}
              {/*  placeholder={Button}*/}
              {/*  label={"Name"}*/}
              {/*  value={"name"}*/}
              {/*></CustomizedCardModal>*/}
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
      <View style={{ flex: 0.1 }}>
        <Footer />
      </View>
    </>
  );
};

export default Dashboard;
