import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "react-native-magnus";

export const Form = (props) => {
  return (
    <>
      <Controller
        control={props.control}
        // rules={{
        //   required: props.required,
        // }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            multiline={true}
            editable={props.editable}
            style={props.style}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={props.name}
      />
    </>
  );
};
