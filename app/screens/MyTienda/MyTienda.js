import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/FireBase";
import FireBase from "firebase/app";

export default function MyTienda(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    FireBase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Tienda</Text>
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="blue"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("Add-Tienda")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "tomato",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
