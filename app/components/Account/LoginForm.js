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
import { validateEmail } from "../../utils/Validations";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { size, isEmpty } from "lodash";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Loading from "../Loading";

export default function LoginForm(props) {
  const { toastRef } = props;

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(defaultFormValue());

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onSubmit = () => {
    console.log(formData);

    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("Account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("Email o contraseña incorrecta");
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <KeyboardAwareScrollView>
      <Text style={[styles.text_footer]}>E-MAIL</Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="su email"
          style={styles.textInput}
          onChange={(e) => onChange(e, "email")}
          keyboardType={"email-address"}
          autoCapitalize="none"
        />

        <Animatable.View animation="bounceIn">
          <Feather name="check-circle" color="tomato" size={20} />
        </Animatable.View>
      </View>
      <Text style={[styles.text_footer, { marginTop: 35 }]}>Clave</Text>
      <View style={styles.action}>
        <FontAwesome name="lock" color="#05375a" size={20} />

        <TextInput
          placeholder="Clave"
          onChange={(e) => onChange(e, "password")}
          secureTextEntry={showPassword ? false : true}
          style={styles.textInput}
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

      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.button}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.signIn}
          >
            <Text style={styles.textSign}>Ingresar</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <Loading isVisible={loading} text="Iniciando sesion.." />
    </KeyboardAwareScrollView>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
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
    paddingBottom: 1,
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
