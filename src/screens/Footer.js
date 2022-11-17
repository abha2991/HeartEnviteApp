import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

import * as React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useAuthControllerViewer } from "../api";
import { ListItem } from "@rneui/themed";
import CategoryList from "../CategoryList";
import { useState } from "react";
import CategoryDropDown from "../components/CategoryDropDown";

const Footer = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <SafeAreaView
      // style={{
      //   flex: 1,
      //   backgroundColor: "yellow",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
      >
        <Appbar.Header
          style={{ justifyContent: "space-around", backgroundColor: "#fff" }}
        >
          <Ionicons
            name="home"
            size={30}
            color="#696969"
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          />

          <View style={{ marginLeft: 120 }}>
            <CategoryDropDown />
          </View>
          {/*<MaterialIcons name="category" size={30} color="#696969" />*/}
          {/*<ListItem.Accordion*/}
          {/*  content={*/}
          {/*    <>*/}
          {/*      <MaterialIcons*/}
          {/*        color="rgba(28, 28, 30, 0.68)"*/}
          {/*        size={28}*/}
          {/*        name="category"*/}
          {/*      />*/}
          {/*      <ListItem.Content>*/}
          {/*        <ListItem.Title*/}
          {/*          style={{*/}
          {/*            fontSize: 18,*/}
          {/*            marginLeft: 32,*/}
          {/*            color: "rgba(28, 28, 30, 0.68)",*/}
          {/*            fontWeight: "bold",*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          Categories*/}
          {/*        </ListItem.Title>*/}
          {/*      </ListItem.Content>*/}
          {/*    </>*/}
          {/*  }*/}
          {/*  isExpanded={expanded}*/}
          {/*  onPress={() => {*/}
          {/*    setExpanded(!expanded);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {CategoryList.map((l, i) => (*/}
          {/*    <ListItem key={i} bottomDivider>*/}
          {/*      <ListItem.Content>*/}
          {/*        <ListItem.Title*/}
          {/*          // onPress={() => {*/}
          {/*          //   navigation.navigate(l.url);*/}
          {/*          // }}*/}

          {/*          onPress={() => {*/}
          {/*            navigation.navigate("CategoryCards", {*/}
          {/*              category: l.category,*/}
          {/*              name: l.value,*/}
          {/*            });*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          {l.value}*/}
          {/*        </ListItem.Title>*/}
          {/*      </ListItem.Content>*/}
          {/*      <ListItem.Chevron />*/}
          {/*    </ListItem>*/}
          {/*  ))}*/}
          {/*</ListItem.Accordion>*/}

          <Ionicons
            name="person"
            size={30}
            color="#696969"
            onPress={() => {
              navigation.navigate("ProfileScreen");
            }}
          />
        </Appbar.Header>
      </SafeAreaView>
    </>
  );
};

export default Footer;
