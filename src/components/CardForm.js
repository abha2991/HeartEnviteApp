// import categoryData from "../categories.json";
// import cardData from "../cards.json";
// import {
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   View,
// } from "react-native";
// import { BackgroundImage, Text } from "@rneui/base";
// import { Form } from "../utils/Form";
// import { useForm } from "react-hook-form";
// import React, { useEffect, useMemo } from "react";
// import { Button as PaperButton } from "react-native-paper";
// import { useCardApi } from "../api/use-card-api";
// import { useAuthControllerViewer } from "../api";
//
// const { width } = Dimensions.get("window");
//
// const style = StyleSheet.create({
//   container: {
//     width: width - 32,
//     margin: 16,
//     height: (width - 32) * (620 / 437),
//   },
//   content: {
//     position: "absolute",
//   },
//   backgroundImage: {
//     flex: 1,
//     height: "100%",
//     width: width - 32,
//   },
// });
//
// function contentToDefaultValues(arr) {
//   return arr.reduce(
//     (all, curr) => ({ ...all, [curr.key]: curr.defaultValue }),
//     {}
//   );
// }
//
// const CardForm = (props) => {
//   const { id } = props.id;
//   const category = props.category;
//   //
//   const { control, reset, handleSubmit } = useForm();
//   const data = props.data;
//
//   useEffect(() => {
//     if (data) {
//       reset(contentToDefaultValues(props.content));
//     }
//   }, [reset, data]);
//
//   return (
//     <>
//       <ScrollView>
//         <View style={[style.container, data?.containerStyle]}>
//           <BackgroundImage
//             resizeMode="contain"
//             style={{
//               flex: 1,
//               height: "100%",
//               width: "100%",
//             }}
//             source={{
//               uri:
//                 "http://localhost:3001/assets/" +
//                 category +
//                 "/" +
//                 props.backgroundImage,
//             }}
//           >
//             <View style={[style.content, data?.contentStyle]}>
//               {props.dataContent?.map((content) => {
//                 if (content.editable === true) {
//                   return (
//                     <Form
//                       color={data.fontAwesomeIconColor}
//                       control={control}
//                       style={[data?.commonStyle, content.style]}
//                       containerStyle={content.containerStyle}
//                       key={content.key}
//                       name={content.key}
//                     />
//                   );
//                 } else {
//                   return (
//                     <TextInput
//                       key={props.key}
//                       style={[data?.commonStyle, content.style]}
//                     >
//                       {content.defaultValue}
//                     </TextInput>
//                   );
//                 }
//               })}
//             </View>
//           </BackgroundImage>
//         </View>
//       </ScrollView>
//     </>
//   );
// };
//
// export default CardForm;

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

const CardForm = (props) => {
  // const { id } = props.id;
  const category = props.category;

  let index = props.index;
  let content = props.content;
  let data = props.data;
  let control = props.control;

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
            <View style={[style.content, data?.contentStyle]}>
              {content?.map((item) => {
                if (item.editable === true) {
                  return (
                    <Form
                      // TODO: data.fontAwesomeIconColor or content.fontAwesomeIconColor?
                      color={data.fontAwesomeIconColor}
                      control={control}
                      // TODO: data.commonStyle or content.commonStyle?
                      style={[data?.commonStyle, item.style]}
                      containerStyle={data.containerStyle}
                      key={`${index}.${item.key}`}
                      name={`${index}.${item.key}`}
                    />
                  );
                } else {
                  return (
                    <TextInput
                      key={`${index}.${item.key}`}
                      // TODO: data.commonStyle or content.commonStyle?
                      style={[data?.commonStyle, item.style]}
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

export default CardForm;
