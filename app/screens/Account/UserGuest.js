import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Slider from "../../../app/components/Slider";
import { dummyData } from "../../data/DataSlider";

export default function UserGuest() {
  const navigation = useNavigation();

  console.log(dummyData);

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Slider data={dummyData} />
      <Text style={styles.title}>Consulta tu perfil VENTAS ONLINE</Text>
      <Text style={styles.description}>
        Como describiria los mejores productos ? Busca y Visualiza los mejores
        de una forma sencilla, vota cual te ha gustado mas comenta como ha sido
        tu experiencia
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "blue",
  },
  btnContainer: {
    width: "70%",
  },
});
