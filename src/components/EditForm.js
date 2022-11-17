import categoryData from "../categories.json";
import cardData from "../cards.json";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { BackgroundImage, Text } from "@rneui/base";
import { Form } from "../utils/Form";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import { Button as PaperButton } from "react-native-paper";
import { useCardApi } from "../api/use-card-api";
import { useAuthControllerViewer } from "../api";

const { width } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    width: width - 32,
    margin: 16,
    height: (width - 32) * (620 / 437),
  },
  content: {
    position: "absolute",
  },
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: width - 32,
  },
});

const EditForm = (props) => {
  // const { id } = props.id;
  const category = props.category;

  let content = props.content;
  let data = props.data;
  let control = props.control;
  let cardDetails = props.cardDetails;
  //console.log({ data });

  return (
    <>
      <ScrollView>
        {/* TODO: data.containerStyle or content.containerStyle? */}
        <View style={[style.container, data?.containerStyle]}>
          <BackgroundImage
            resizeMode="contain"
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
            }}
            source={{
              uri:
                "http://localhost:3001/assets/" +
                category +
                "/" +
                props.backgroundImage,
            }}
          >
            {/* TODO: data.contentStyle or content.contentStyle? */}
            <View style={[style.content, cardDetails?.contentStyle]}>
              {content?.map((item) => {
                if (item.editable === true) {
                  return (
                    <Form
                      // TODO: data.fontAwesomeIconColor or content.fontAwesomeIconColor?
                      color={cardDetails.fontAwesomeIconColor}
                      control={control}
                      // TODO: data.commonStyle or content.commonStyle?
                      style={[cardDetails?.commonStyle, item.style]}
                      containerStyle={cardDetails.containerStyle}
                      key={`${props.index}.${item.key}`}
                      name={`${props.index}.${item.key}`}
                    />
                  );
                } else {
                  return (
                    <TextInput
                      key={`${props.index}.${item.key}`}
                      // TODO: data.commonStyle or content.commonStyle?
                      style={[cardDetails?.commonStyle, item.style]}
                    >
                      {item.defaultValue}
                    </TextInput>
                  );
                }
              })}
            </View>
          </BackgroundImage>
        </View>
      </ScrollView>
    </>
  );
};

export default EditForm;
