import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "react-native-magnus";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { omitBy } from "lodash";

const style = StyleSheet.create({
  container: {
    // height: 20,
  },
});

export const Form = (props) => {
  return (
    <>
      <View style={[props.containerStyle, { position: "relative" }]}>
        <FontAwesome
          name="edit"
          size={15}
          color={props.color}
          style={{
            position: "absolute",
            right: -20,
            bottom: 0,
            lineHeight: 22,
          }}
        />
        <Controller
          control={props.control}
          // rules={{
          //   required: props.required,
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline={true}
              editable={props.editable}
              style={[style.container, props.style]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              key={props.key}
            />
          )}
          name={props.name}
        />
      </View>
    </>
  );
};
