import "expo-dev-client";
import * as React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import logo from "./src/images/logo.png";
import Dashboard from "./src/screens/Dashboard";
import {
  Appbar,
  List,
  Provider as ThemeProvider,
  Avatar,
} from "react-native-paper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "./src/components/Card";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import CardDetailPages from "./src/screens/CardDetailPages";

import Preview from "./src/screens/Preview";
import EditCard from "./src/components/EditCard";
import Drafts from "./src/screens/Drafts";
import DraftsDetailPages from "./src/screens/DraftsDetailPages";
import PurchasedCardDetailsPages from "./src/screens/PurchasedCardDetailsPages";
import CustomizedCardModal from "./src/utils/CustomizedCardModal";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Profile from "./src/screens/Profile";
import ProfileScreen from "./src/screens/ProfileScreen";
import Purchased from "./src/screens/Purchased";
import EditProfileScreen from "./src/screens/EditProfileScreen";

import CategoryList from "./src/CategoryList";
import { ListItem } from "@rneui/themed";
import CategoryCards from "./src/screens/CategoryCards";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { useFontsLoaded } from "./src/fonts";
import { useAuthControllerLogout, useAuthControllerViewer } from "./src/api";
import { Divider } from "@rneui/base";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

function Header() {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();

  return (
    <Appbar.Header
    // style={{ justifyContent: "space-evenly", backgroundColor: "white" }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <Image
            style={{
              width: 120,
              height: 50,
              margin: 10,
            }}
            source={logo}
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          />
        </TouchableWithoutFeedback>
      </View>

      <Appbar.Action
        //icon="dots-vertical"
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </Appbar.Header>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const { data: profile } = useAuthControllerViewer({});

  const [selected, setSelected] = React.useState("");

  const [expanded, setExpanded] = useState(false);

  const handleSubmitPress = async () => {
    const token = await AsyncStorage.getItem("token");
    await AsyncStorage.removeItem("token");
  };

  if (profile) {
    return (
      <DrawerContentScrollView>
        <DrawerItem
          labelStyle={{
            fontSize: 18,
            height: 100,
            fontWeight: "bold",

            width: 500,
          }}
          style={{
            flex: 1,

            justifyContent: "center",
            alignSelf: "center",
            marginLeft: 80,
          }}
          icon={({ focused, color, size }) => {
            if (profile) {
              if (profile?.profileImage) {
                return (
                  <Image
                    source={{
                      uri: `http://localhost:3001/ProfilePic/${profile?.profileImage}`,
                    }}
                    style={{ height: 100, width: 200 }}
                    resizeMode="contain"
                  />
                );
              } else if (!profile?.profileImage) {
                return (
                  <Ionicons
                    style={{ textAlign: "center" }}
                    color="black"
                    size={60}
                    name="person"
                  />
                );
              }
            } else {
              return (
                <Ionicons
                  style={{ textAlign: "center" }}
                  color="black"
                  size={60}
                  name="person"
                />
              );
            }
          }}
          label=""
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {profile
              ? `${profile?.firstName} ${profile?.lastName}`
              : "Test test"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {profile ? profile?.email : "Test@gmail.com"}
          </Text>

          {profile ? (
            <Entypo
              name="edit"
              size="20"
              color="rgba(28, 28, 30, 0.68)"
              onPress={() => {
                navigation.navigate("EditProfileScreen");
              }}
            />
          ) : (
            <Entypo
              name="edit"
              size="20"
              color="rgba(28, 28, 30, 0.68)"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          )}
        </View>

        <Divider />

        <DrawerItem
          labelStyle={{
            fontSize: 18,
            fontWeight: "bold",
          }}
          icon={({ focused, color, size }) => (
            <Ionicons color={color} size={28} name="home" />
          )}
          label="Home"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        />

        <ListItem.Accordion
          content={
            <>
              <MaterialIcons
                color="rgba(28, 28, 30, 0.68)"
                size={28}
                name="category"
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 18,
                    marginLeft: 32,
                    color: "rgba(28, 28, 30, 0.68)",
                    fontWeight: "bold",
                  }}
                >
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
        <DrawerItem
          labelStyle={{ fontSize: 18, fontWeight: "bold" }}
          icon={({ focused, color, size }) => (
            <Entypo name="shopping-cart" color={color} size={28} />
          )}
          label="Drafts"
          onPress={() => {
            navigation.navigate("Drafts");
          }}
        />

        <DrawerItem
          labelStyle={{ fontSize: 18, fontWeight: "bold" }}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="cart-check"
              color="rgba(28, 28, 30, 0.68)"
              size={28}
            />
          )}
          label="Purchased"
          onPress={() => {
            navigation.navigate("Purchased");
          }}
        />

        <DrawerItem
          labelStyle={{ fontSize: 18, fontWeight: "bold" }}
          icon={({ focused, color, size }) => (
            <FontAwesome color={color} size={28} name="sign-out" />
          )}
          label="Logout"
          onPress={handleSubmitPress}
        />

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
  } else {
    return (
      <DrawerContentScrollView>
        <DrawerItem
          labelStyle={{
            fontSize: 18,
            height: 100,
            fontWeight: "bold",

            width: 500,
          }}
          style={{
            flex: 1,

            justifyContent: "center",
            alignSelf: "center",
            marginLeft: 80,
          }}
          icon={({ focused, color, size }) => {
            if (profile) {
              if (profile?.profileImage) {
                return (
                  <Image
                    source={{
                      uri: `http://localhost:3001/ProfilePic/${profile?.profileImage}`,
                    }}
                    style={{ height: 100, width: 200 }}
                    resizeMode="contain"
                  />
                );
              } else if (!profile?.profileImage) {
                return (
                  <Ionicons
                    style={{ textAlign: "center" }}
                    color="black"
                    size={60}
                    name="person"
                  />
                );
              }
            } else {
              return (
                <Ionicons
                  style={{ textAlign: "center" }}
                  color="black"
                  size={60}
                  name="person"
                />
              );
            }
          }}
          label=""
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {profile
              ? `${profile?.firstName} ${profile?.lastName}`
              : "Test test"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {profile ? profile?.email : "Test@gmail.com"}
          </Text>

          {profile ? (
            <Entypo
              name="edit"
              size="20"
              color="rgba(28, 28, 30, 0.68)"
              onPress={() => {
                navigation.navigate("EditProfileScreen");
              }}
            />
          ) : (
            <Entypo
              name="edit"
              size="20"
              color="rgba(28, 28, 30, 0.68)"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          )}
        </View>

        <Divider />

        <DrawerItem
          labelStyle={{
            fontSize: 18,
            fontWeight: "bold",
          }}
          icon={({ focused, color, size }) => (
            <Ionicons color={color} size={28} name="home" />
          )}
          label="Home"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        />

        <ListItem.Accordion
          content={
            <>
              <MaterialIcons
                color="rgba(28, 28, 30, 0.68)"
                size={28}
                name="category"
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 18,
                    marginLeft: 32,
                    color: "rgba(28, 28, 30, 0.68)",
                    fontWeight: "bold",
                  }}
                >
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

        <DrawerItem
          labelStyle={{ fontSize: 18, fontWeight: "bold" }}
          icon={({ focused, color, size }) => (
            <FontAwesome color={color} size={28} name="sign-in" />
          )}
          label="Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </DrawerContentScrollView>
    );
  }
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
      <Drawer.Screen name="Dashboard" component={Dashboard} />

      <Drawer.Screen name="Card" component={Card} />
      <Drawer.Screen name="EditCard" component={EditCard} />
      <Drawer.Screen name="Drafts" component={Drafts} />
      <Drawer.Screen name="DraftsDetailPages" component={DraftsDetailPages} />
      <Drawer.Screen name="MultiPagesCard" component={Card} />

      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="CardDetailPages" component={CardDetailPages} />

      <Drawer.Screen name="Preview" component={Preview} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="Purchased" component={Purchased} />
      <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Drawer.Screen name="CategoryCards" component={CategoryCards} />
      <Drawer.Screen
        name="CustomizedCardModal"
        component={CustomizedCardModal}
      />

      <Drawer.Screen
        name="PurchasedCardDetailsPages"
        component={PurchasedCardDetailsPages}
      />
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
