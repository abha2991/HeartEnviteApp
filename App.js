import "expo-dev-client";
import * as React from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import logo from "./src/images/logo.png";
import Categories from "./src/screens/Categories";
import { Appbar, List, Provider as ThemeProvider } from "react-native-paper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import CardDetailPages from "./src/screens/CardDetailPages";
import BirthdayCards from "./src/screens/BirthdayCards";
import AnniversaryCards from "./src/screens/AnniversaryCards";
import BabyShowerCards from "./src/screens/BabyShowerCards";
import CongratulationCards from "./src/screens/CongratulationCards";
import EngagementCards from "./src/screens/EngagementCards";
import GetWellSoonCards from "./src/screens/GetWellSoonCards";
import MissYouCards from "./src/screens/MissYouCards";
import ReceptionCards from "./src/screens/ReceptionCards";
import ThankYouCards from "./src/screens/ThankYouCards";
import WeddingCards from "./src/screens/WeddingCards";
import CustomizedCardsQuery from "./src/screens/CustomizedCardsQuery";
import Preview from "./src/screens/Preview";

import Card50 from "./src/cards/EngagementCards/Card50";
import Card51 from "./src/cards/EngagementCards/Card51";
import Card52 from "./src/cards/EngagementCards/Card52";
import Card53 from "./src/cards/EngagementCards/Card53";
import Card81 from "./src/cards/EngagementCards/Card81";
import Card82 from "./src/cards/EngagementCards/Card82";

import CategoryList from "./src/CategoryList";
import { ListItem } from "@rneui/themed";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { useFontsLoaded } from "./src/fonts";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

function Header() {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();

  return (
    <Appbar.Header
      style={{ justifyContent: "space-between", backgroundColor: "white" }}
    >
      <View>
        <Image
          style={{ width: 120, height: 50, margin: 10 }}
          source={logo}
          onPress={() => {
            navigation.navigate("Categories");
          }}
        />
      </View>

      <Appbar.Action
        icon="dots-vertical"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </Appbar.Header>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");

  const [expanded, setExpanded] = useState(false);

  return (
    <DrawerContentScrollView>
      <DrawerItem
        labelStyle={{ fontSize: 18 }}
        label="Home"
        onPress={() => {
          navigation.navigate("Categories");
        }}
      />
      <DrawerItem
        labelStyle={{ fontSize: 18 }}
        label="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />

      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 18, marginLeft: 4 }}>
                Categories
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {CategoryList.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title
                onPress={() => {
                  navigation.navigate(l.url);
                }}
              >
                {l.value}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>

      {/*<View>*/}
      {/*  {CategoryList.map((item, i) => (*/}
      {/*    <ListItem key={i} title={item.title} bottomDivider chevron />*/}
      {/*  ))}*/}
      {/*</View>*/}
      {/*<DrawerItemList {...props} />*/}
      {/*<DrawerItem*/}
      {/*  label="Close drawer"*/}
      {/*  onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}*/}
      {/*/>*/}
      {/*<DrawerItem*/}
      {/*  label="Toggle drawer"*/}
      {/*  onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}*/}
      {/*/>*/}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function HomeScreen({}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: Header,
        drawerPosition: "right",
        drawerType: "front",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Categories" component={Categories} />

      <Drawer.Screen name="AnniversaryCards" component={AnniversaryCards} />
      <Drawer.Screen name="BabyShowerCards" component={BabyShowerCards} />
      <Drawer.Screen name="BirthdayCards" component={BirthdayCards} />
      <Drawer.Screen
        name="CongratulationCards"
        component={CongratulationCards}
      />
      <Drawer.Screen name="EngagementCards" component={EngagementCards} />
      <Drawer.Screen name="GetWellSoonCards" component={GetWellSoonCards} />
      <Drawer.Screen name="MissYouCards" component={MissYouCards} />
      <Drawer.Screen name="ReceptionCards" component={ReceptionCards} />
      <Drawer.Screen name="ThankYouCards" component={ThankYouCards} />
      <Drawer.Screen name="WeddingCards" component={WeddingCards} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="CardDetailPages" component={CardDetailPages} />
      <Drawer.Screen name="Card50" component={Card50} />
      <Drawer.Screen name="Card51" component={Card51} />
      <Drawer.Screen name="Card52" component={Card52} />
      <Drawer.Screen name="Card53" component={Card53} />
      <Drawer.Screen name="Card81" component={Card81} />
      <Drawer.Screen name="Card82" component={Card82} />
      <Drawer.Screen name="Preview" component={Preview} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function App() {
  const fontsLoaded = useFontsLoaded();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
