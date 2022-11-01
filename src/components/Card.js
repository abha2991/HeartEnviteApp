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
import { useNavigation } from "@react-navigation/core";
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

function contentToDefaultValues(arr) {
  return arr.reduce(
    (all, curr) => ({ ...all, [curr.key]: curr.defaultValue }),
    {}
  );
}

const Card = ({ route }) => {
  const navigation = useNavigation();
  const { id, category } = route.params;

  const { data: profile } = useAuthControllerViewer({});
  const { control, reset, handleSubmit } = useForm();
  const data = useMemo(() => cardData.find((data) => data.id === id), [id]);

  const { mutateAsync } = useCardApi(data.apiUrl);

  useEffect(() => {
    if (data) {
      reset(contentToDefaultValues(data.content));
    }
  }, [reset, data]);

  const onSubmit = async (data1) => {
    let details = [];

    details.push(data1);
    console.log({ data1, details });
    const res = await mutateAsync({
      data: {
        details,
        email: profile?.email,
        maxCharsPerLine: Number(33),
        userId: profile?.id,
        id: id,
      },
    });

    if (res.status === "Success") {
      navigation.navigate("Preview", {
        id: res.createdCardId,
      });
    }
  };

  return (
    <>
      <ScrollView>
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
                data.backgroundImage,
            }}
          >
            <View style={[style.content, data?.contentStyle]}>
              {data?.content.map((content) => {
                if (content.editable === true) {
                  return (
                    <Form
                      color={data.fontAwesomeIconColor}
                      control={control}
                      style={[data?.commonStyle, content.style]}
                      containerStyle={content.containerStyle}
                      key={content.key}
                      name={content.key}
                    />
                  );
                } else {
                  return (
                    <TextInput
                      key={content.key}
                      style={[data?.commonStyle, content.style]}
                    >
                      {content.defaultValue}
                    </TextInput>
                  );
                }
              })}
            </View>
          </BackgroundImage>
        </View>
      </ScrollView>
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

export default Card;
