import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { List } from "react-native-paper";

const DrawerCategories = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View></View>

    // <Provider>
    //   <View
    //     style={{
    //       paddingTop: 50,
    //       flexDirection: "row",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Menu
    //       visible={visible}
    //       onDismiss={closeMenu}
    //       anchor={<Button onPress={openMenu}>Show menu</Button>}
    //     >
    //       <Menu.Item onPress={() => {}} title="Anniversary Cards" />
    //       <Menu.Item onPress={() => {}} title="Baby Shower Cards" />
    //       <Divider />
    //       <Menu.Item onPress={() => {}} title="Birthday Cards" />
    //       <Menu.Item onPress={() => {}} title="Congratulations Cards" />
    //       <Menu.Item onPress={() => {}} title="Engagement Cards" />
    //       <Menu.Item onPress={() => {}} title="Get Well Soon Cards" />
    //       <Menu.Item onPress={() => {}} title="Miss You Cards" />
    //       <Menu.Item onPress={() => {}} title="Reception Cards" />
    //       <Menu.Item onPress={() => {}} title="Thank You Cards" />
    //       <Menu.Item onPress={() => {}} title="Wedding Cards" />
    //     </Menu>
    //   </View>
    // </Provider>
  );
};

export default DrawerCategories;
