import { ListItem } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import CategoryList from "../CategoryList";
import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

const CategoryDropDown = () => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      <ListItem.Accordion
        style={{ width: 200 }}
        content={
          <>
            <MaterialIcons
              color="rgba(28, 28, 30, 0.68)"
              size={28}
              name="category"
            />
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {CategoryList.map((l, i) => (
          <ListItem key={i} bottomDivider style={{ width: 200 }}>
            <ListItem.Content>
              <ListItem.Title
                onPress={() => {
                  navigation.navigate("CategoryCards", {
                    category: l.category,
                    name: l.value,
                  });
                }}
              >
                {l.value}
              </ListItem.Title>
            </ListItem.Content>

            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
    </>
  );
};

export default CategoryDropDown;
