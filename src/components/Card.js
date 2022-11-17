// import { useNavigation } from "@react-navigation/core";
// import { useCardApi } from "../api/use-card-api";
// import { SafeAreaView, ScrollView } from "react-native";
// import React, { useMemo } from "react";
// import cardData from "../cards.json";
// import CardForm from "./CardForm";
// import { Button as PaperButton } from "react-native-paper";
// import { useForm } from "react-hook-form";
//
// const Card = ({ route }) => {
//   const navigation = useNavigation();
//   const { id, category } = route.params;
//   const { control, handleSubmit } = useForm();
//
//   const data = useMemo(() => cardData.find((data) => data.id === id), [id]);
//   const { mutateAsync } = useCardApi(data.apiUrl);
//
//   const onSubmit = async () => {};
//   return (
//     <>
//       <ScrollView>
//         {data?.pages?.map((value, index) => {
//           return (
//             <CardForm
//               dataContent={value?.content}
//               content={value.content}
//               id={id}
//               data={data}
//               category={category}
//               backgroundImage={value?.page}
//               control={control}
//               defaultValue={value.content.defaultValue}
//             ></CardForm>
//           );
//         })}
//       </ScrollView>
//
//       <SafeAreaView style={{ alignItems: "center", fontWeight: "bolder" }}>
//         <PaperButton
//           style={{
//             marginTop: 20,
//             width: 110,
//             fontWeight: "bolder",
//           }}
//           onPress={handleSubmit(onSubmit)}
//           mode="contained"
//           buttonColor="#ff3162"
//         >
//           Preview
//         </PaperButton>
//       </SafeAreaView>
//     </>
//   );
// };
//
// export default Card;

import { useNavigation } from "@react-navigation/core";
import { useCardApi } from "../api/use-card-api";
import { SafeAreaView, ScrollView } from "react-native";
import React, { useMemo, useEffect } from "react";
import cardData from "../cards.json";
import CardForm from "./CardForm";
import { Button as PaperButton } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useAuthControllerViewer } from "../api";

function contentToDefaultValues(data) {
  return data.pages.reduce(
    (all, curr, index) => ({
      ...all,
      [index]: curr.content.reduce(
        (_all, _curr) => ({ ..._all, [_curr.key]: _curr.defaultValue }),
        {}
      ),
    }),
    {}
  );
}

const Card = ({ route }) => {
  const navigation = useNavigation();
  const { id, category } = route.params;
  const { control, handleSubmit, reset } = useForm();
  const { data: profile } = useAuthControllerViewer({});
  const data = useMemo(() => cardData.find((data) => data.id === id), [id]);
  let maxCharsPerLine = data.maxCharsPerLine;

  const { mutateAsync } = useCardApi(data.apiUrl);

  useEffect(() => {
    if (data) {
      reset(contentToDefaultValues(data));
    }
  }, [reset, data]);

  const onSubmit = async (data) => {
    let details = Object.values(data);
    console.log({ data, details });
    const res = await mutateAsync({
      data: {
        details,
        email: profile?.email,
        maxCharsPerLine: maxCharsPerLine,
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
        {data?.pages?.map((value, index) => {
          return (
            <CardForm
              index={index}
              content={value.content}
              data={data}
              category={category}
              backgroundImage={value?.page}
              control={control}
            />
          );
        })}
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
