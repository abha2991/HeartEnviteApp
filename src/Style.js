import { Image, Text, View } from "react-native";
import { Button, Card, Text as PaperText } from "react-native-paper";
import React from "react";
import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import { TouchableRipple } from "react-native-paper";

export const CategoryImage = (props) => {
  return (
    <TouchableRipple onPress={props.onPress}>
      <View
        style={{
          margin: 10,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 70, height: 70, borderRadius: 40 }}
          source={props.source}
        />

        <Text
          onPress={props.onPress}
          style={{
            marginTop: 5,
            fontSize: 14,
          }}
        >
          {props.text}
        </Text>
      </View>
    </TouchableRipple>
  );
};

export const DataCellImage = (props) => {
  return (
    <Card
      elevation={5}
      onPress={props.onPress}
      style={{
        margin: 10,
        // borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Image style={{ width: 160, height: 220 }} source={props.source} />
      <View
        style={{
          flexDirection: "row",

          justifyContent: "center",
        }}
      >
        <Text
          style={{
            margin: 5,
            fontWeight: "bold",
          }}
        >
          ₹{props.cardSalePrice}
        </Text>
        <Text
          style={{
            textDecorationLine: "line-through",
            textDecorationStyle: "solid",
            margin: 5,
            fontWeight: "bold",
          }}
        >
          ₹{props.cardTotalPrice}
        </Text>
      </View>
    </Card>
  );
};

export const CardImage = (props) => {
  return (
    <View elevation={10}>
      <Image
        style={{
          //width: "100%",
          height: 500,
          marginTop: 40,

          marginHorizontal: "10%",
        }}
        source={props.source}
        key={props.key}
      />
    </View>
  );
};

export const CardComponent = (props) => {
  return (
    <Card>
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PaperText variant="titleMedium">{props.title}</PaperText>
        <Button buttonColor="#ff3162" textColor="white" onPress={props.onPress}>
          {props.buttonText}
        </Button>
      </Card.Content>
    </Card>
  );
};
