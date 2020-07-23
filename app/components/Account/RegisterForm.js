import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

import { validateEmail } from "../../utils/Validations";
import Loading from "../Loading";

export default function RegisterForm(props) {
  const { toastRef } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatShowPassword] = useState(false);

  const [formData, setFormData] = useState(defaultFormValue());

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.pasword) ||
      isEmpty(formData.repeatPasword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Email no valido");
    } else if (formData.pasword !== formData.repeatPasword) {
      toastRef.current.show("La constrasena no coincide");
    } else if (size(formData.pasword) < 6) {
      toastRef.current.show(
        "La contrasena tiene que tener al menos 6 carateres"
      );
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.pasword)
        .then(() => {
          setLoading(false);
          navigation.navigate("Account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("El email esta en uso, pruebe otro");
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text style={[styles.text_footer, { marginTop: 5 }]}>E-MAIL</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="su email"
            style={styles.textInput}
            onChange={(e) => onChange(e, "email")}
            keyboardType={"email-address"}
            autoCapitalize="none"
          />

          <Feather name="check-circle" color="tomato" size={20} />
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>CLAVE</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />

          <TextInput
            placeholder="Clave"
            secureTextEntry={showPassword ? false : true}
            style={styles.textInput}
            onChange={(e) => onChange(e, "pasword")}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              color="gray"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>
          REPETIR CLAVE
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />

          <TextInput
            placeholder="Clave"
            secureTextEntry={showRepeatPassword ? false : true}
            style={styles.textInput}
            onChange={(e) => onChange(e, "repeatPasword")}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setRepeatShowPassword(!showRepeatPassword)}
          >
            <Feather
              name={showRepeatPassword ? "eye" : "eye-off"}
              color="gray"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.button}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.signIn}
          >
            <Text style={styles.textSign}>Registrar</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <Loading isVisible={loading} text="Creando Cuenta.." />
    </KeyboardAwareScrollView>
  );
}

function defaultFormValue() {
  return {
    email: "",
    pasword: "",
    repeatPasword: "",
  };
}

const styles = StyleSheet.create({
  text_footer: {
    paddingLeft: 10,
    color: "blue",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#05375a",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
