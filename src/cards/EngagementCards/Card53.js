import Engagement from "../../images/Engagement/Engagement_4_1.png";
import {
  ImageBackground,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  useWindowDimensions,
  Dimensions,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Form } from "../../utils/Form";
import { Button as PaperButton } from "react-native-paper";
import { cardControllerEngagementCard } from "../../api";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: width - 32,
  },
  sectionContainer: {
    position: "absolute",
    // marginTop: 380,
    // paddingHorizontal: 24,
  },

  sectionContainer1: {
    marginTop: 500,
    paddingHorizontal: 24,
  },
  title: {
    color: "#000",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  name1: {
    marginLeft: 100,
    maxWidth: 200,
    fontSize: 28,
    fontFamily: "GreatVibes-Regular",
  },
  name2: {
    marginLeft: 90,
    maxWidth: 200,
    fontSize: 30,
    fontFamily: "GreatVibes-Regular",
  },

  and: {
    textAlign: "center",

    fontSize: 30,
    fontFamily: "GreatVibes-Regular",
  },

  date: {
    marginTop: 5,
    textAlign: "center",
    maxWidth: 400,
    fontSize: 12,
    fontFamily: "NirmalaB",
  },
  time: {
    textAlign: "center",
    maxWidth: 400,
    fontSize: 12,
    fontFamily: "NirmalaB",
  },
  venue: {
    marginTop: 5,
    textAlign: "center",
    maxWidth: 400,
    fontSize: 13,
    fontFamily: "Franklin-Gothic-Medium-Regular",
  },
});
const Card82 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      brideOrGroomName: "ANDREA CAMPBELL",
      and: "AND",
      groomOrBrideName: "JACOB HENDERSON",
      date: "June 29 2022",
      time: "7:00 PM EVENING",
      venue: "MAJESTIC BALL ROOM 1152-DARK STAR LANE",
    },
  });

  //const { data: cardData } =cardControllerEngagementCard({})
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="contain"
          source={Engagement}
          style={styles.backgroundImage}
        >
          <View style={styles.sectionContainer}>
            <Form
              control={control}
              name={"brideOrGroomName"}
              style={{
                position: "relative",
                top: 300,
                left: (width - 32 - 200) * 0.5,
                width: 200,
                lineHeight: 20,
                textAlign: "center",
                fontFamily: "NirmalaB",
                fontSize: 18,
                color: "#f60331",
              }}
              // style={styles.name1}
            />
            <Form
              control={control}
              name={"and"}
              editable={false}
              // style={styles.and}

              style={{
                position: "relative",
                top: 310,
                left: (width - 32 - 200) * 0.5,
                width: 200,
                lineHeight: 20,
                textAlign: "center",
                fontFamily: "NirmalaB",
                fontSize: 18,
                color: "#f60331",
              }}
            />
            <Form
              control={control}
              name={"groomOrBrideName"}
              // style={styles.name2}

              style={{
                position: "relative",
                top: 320,
                left: (width - 32 - 200) * 0.5,
                width: 200,
                lineHeight: 20,
                textAlign: "center",
                fontFamily: "NirmalaB",
                fontSize: 18,
                color: "#f60331",
              }}
            />
            <Form
              control={control}
              name={"date"}
              //style={styles.date}
              //
              style={{
                position: "relative",
                top: 380,
                left: (width - 32 - 200) * 0.5,
                width: 200,
                lineHeight: 20,
                textAlign: "center",
                fontFamily: "Nirmala",
                fontSize: 14,
                color: "#f60331",
              }}
            />
            <Form
              control={control}
              name={"time"}
              style={{
                position: "relative",
                top: 380,
                left: (width - 32 - 200) * 0.5,
                width: 200,
                lineHeight: 20,
                textAlign: "center",
                fontFamily: "Nirmala",
                fontSize: 14,
                color: "#f60331",
              }}
            />
            <Form
              control={control}
              name={"venue"}
              style={{
                position: "relative",
                top: 380,
                left: (width - 32 - 380) * 0.5,
                width: 380,
                lineHeight: 20,
                textAlign: "center",
                fontFamily: "gadugib",
                fontSize: 14,
                color: "#f60331",
              }}
            />
          </View>
        </ImageBackground>
      </View>

      <SafeAreaView style={{ alignItems: "center", fontWeight: "bolder" }}>
        <PaperButton
          style={{
            marginTop: 20,
            width: 110,
            fontWeight: "bolder",
          }}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          buttonColor="#ff3162"
        >
          Preview
        </PaperButton>
      </SafeAreaView>
    </>
  );
};

export default Card82;
