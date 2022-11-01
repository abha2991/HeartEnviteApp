import {
  useAuthControllerViewer,
  useCardControllerFind,
  useCardControllerFindOne,
  useCardetailsControllerFindAll,
} from "../api";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { BackgroundImage, Text } from "@rneui/base";
import { Form } from "../utils/Form";
import { Button as PaperButton } from "react-native-paper";
import cardData from "../cards.json";
import { useCardApi } from "../api/use-card-api";
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

const EditCard = ({ route }) => {
  const { id } = route.params;
  console.log({ id });
  const navigation = useNavigation();
  const { data: cardDetails } = useCardControllerFindOne(id);

  const { data: profile } = useAuthControllerViewer({});
  const { control, reset, handleSubmit } = useForm();
  const data = useMemo(() => cardDetails?.text[0]);
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);

  const card = cardData?.find((value) => value.id === cardDetails?.cardId);
  const { mutateAsync } = useCardApi(card?.apiUrl);
  const onSubmit = async (data1) => {
    let details = [];
    console.log({ data1 });
    details.push(data1);
    console.log({ details });
    const res = await mutateAsync({
      data: {
        details,
        email: profile?.email,
        maxCharsPerLine: Number(33),
        userId: profile?.id,
        id: cardDetails?.cardId,
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
        <View style={[style.container, card?.containerStyle]}>
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
                cardDetails?.cardCategory +
                "/" +
                card?.backgroundImage,
            }}
          >
            <View style={[style.content, card?.contentStyle]}>
              {card?.content.map((content) => {
                if (content.editable === true) {
                  return (
                    <Form
                      color={card.fontAwesomeIconColor}
                      control={control}
                      style={[card?.commonStyle, content.style]}
                      containerStyle={content.containerStyle}
                      key={content.key}
                      name={content.key}
                    />
                  );
                } else {
                  return (
                    <Text
                      key={content.key}
                      style={[card?.commonStyle, content.style]}
                    >
                      {content.defaultValue}
                    </Text>
                  );
                }
              })}
            </View>
          </BackgroundImage>
        </View>
      </ScrollView>
      <SafeAreaView style={{ alignItems: "center" }}>
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

export default EditCard;
