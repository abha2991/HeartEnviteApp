import Engagement from "../../images/Engagement/Engagement_5_1.png";
import {
  ImageBackground,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Form } from "../../utils/Form";
import { Button as PaperButton } from "react-native-paper";
import { cardControllerEngagementCard } from "../../api";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,

    height: "100%",
    width: "95%",
    marginLeft: "5%",
  },
  sectionContainer: {
    marginTop: 280,
    paddingHorizontal: 24,
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
    marginTop: 1,
    textAlign: "center",
    maxWidth: 400,
    fontSize: 13,
    fontFamily: "Franklin-Gothic-Medium-Regular",
  },
});
const Card82 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brideOrGroomName: "Andrea Campbell",
      and: "And",
      groomOrBrideName: "Jacob Henderson",
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
              style={styles.name1}
            />
            <Form
              control={control}
              name={"and"}
              editable={false}
              style={styles.and}
            />
            <Form
              control={control}
              name={"groomOrBrideName"}
              style={styles.name2}
            />
            <Form control={control} name={"date"} style={styles.date} />
            <Form control={control} name={"time"} style={styles.time} />
            <Form control={control} name={"venue"} style={styles.venue} />
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
