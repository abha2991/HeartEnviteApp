import {
  Button,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  button: {
    borderRadius: 25,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 12 },
  },
  buttonActive: {
    alignItems: "center",
    backgroundColor: "#dc00ff",
    borderColor: "#dc00ff",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});

const CategoriesHeader = () => {
  const [state, setState] = useState({ active: 0 });
  return (
    <>
      <View>
        <ScrollView
          snapToStart
          snapToInterval={90}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          <TouchableOpacity
            onPress={() => {
              setState({ active: 0 });
            }}
            style={state.active === 0 ? styles.buttonActive : styles.button}
            //style={styles.button}
          >
            <Button
              style={{ color: "black", fontWeight: "bold" }}
              title="Submit"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState({ active: 1 });
            }}
            style={state.active === 1 ? styles.buttonActive : styles.button}
            //style={styles.button}
          >
            <Button
              style={{ color: "black", fontWeight: "bold" }}
              title="Submit"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState({ active: 2 });
            }}
            style={state.active === 2 ? styles.buttonActive : styles.button}
            //style={styles.button}
          >
            <Button
              style={{ color: "black", fontWeight: "bold" }}
              title="Submit"
            />
          </TouchableOpacity>
          <Button title="sbdcdsbc s"></Button>
          <Button title="sbdcdsbc s"></Button>
          <Button title="sbdcdsbc s"></Button>
          <Button title="sbdcdsbc s"></Button>
        </ScrollView>
      </View>
    </>
  );
};

export default CategoriesHeader;
