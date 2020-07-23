import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import FormLogin from "../../components/Account/LoginForm";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

export default function login() {
  const toastRef = useRef();
  const navigation = useNavigation();

  ///console.log(toastRef);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          dureation={1500}
          source={require("../../../assets/img/LOGO-PEDIDOS_Mesa.png")}
          style={styles.logo}
          resizeMode={"stretch"}
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View>
          <FormLogin toastRef={toastRef} />
          <CreateAccount navigation={navigation} />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.viewContainer}></View>
      </Animatable.View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿ Aun no tienes una cuenta ?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Registrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05375a",
  },
  logo: {
    width: "100%",
    height: 140,
    marginTop: 30,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    color: "gray",
  },
  btnRegister: {
    color: "blue",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "tomato",
    margin: 20,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05375a",
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
});
