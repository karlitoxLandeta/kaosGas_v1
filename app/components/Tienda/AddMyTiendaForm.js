import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modal";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const whidthScreen = Dimensions.get("window").width;

export default function AddMyTiendaForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [tiendaNombre, setTiendaNombre] = useState("");
  const [tiendaTelefono, setTiendaTelefono] = useState("");
  const [tiendaAddress, setTiendaAddress] = useState("");
  const [tiendaDescripcion, setTiendaDescripcion] = useState("");
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationtienda, setLocationtienda] = useState(null);

  const addtienda = () => {
    if (
      !tiendaNombre ||
      !tiendaAddress ||
      !tiendaDescripcion ||
      !tiendaTelefono
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (size(imagesSelected) === 0) {
      toastRef.current.show("La tienda debe tener al menos una foto");
    } else if (!locationtienda) {
      toastRef.current.show("Tiene que localizar la tienda en el mapa");
    } else {
      setIsLoading(true);
      uploadImageStorage().then((response) => {
        setIsLoading(false);

        db.collection("tiendas")
          .add({
            name: tiendaNombre,
            telefono: tiendaTelefono,
            address: tiendaAddress,
            description: tiendaDescripcion,
            location: locationtienda,
            images: response,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: firebase.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("MyTiendaScreen");
          })
          .catch(() => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al crear la tienda intentelo mas tarde"
            );
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imageBlob = [];

    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("tiendas").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`tiendas/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoURL) => {
              imageBlob.push(photoURL);
            });
        });
      })
    );

    return imageBlob;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ImageTienda imageTienda={imagesSelected[0]} />
      <FormAdd
        setTiendaNombre={setTiendaNombre}
        setTiendaTelefono={setTiendaTelefono}
        setTiendaAddress={setTiendaAddress}
        setTiendaDescripcion={setTiendaDescripcion}
        setIsVisibleMap={setIsVisibleMap}
        locationtienda={locationtienda}
      />
      <UploadImagen
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="INGRESA GESTION"
        onPress={addtienda}
        buttonStyle={styles.btnTienda}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationtienda={setLocationtienda}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationtienda, toastRef } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      //  console.log(status);

      //const statusPermissions = resultPermissions.Permissions.LOCATION.status;
      if (status !== "granted") {
        toastRef.current.show(
          "Tiene que aceptar los permisos de localizacion",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        console.log(setLocation);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationtienda(location);
    toastRef.current.show("Localizacion guardada Correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            containerStyle={styles.viewMapContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar Ubicacion"
            containerStyle={styles.viewMapContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

function ImageTienda(props) {
  const { imageTienda } = props;
  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imageTienda
            ? { uri: imageTienda }
            : require("../../../assets/img/no_imagen.png")
        }
        style={{ width: whidthScreen, height: 200 }}
      />
    </View>
  );
}

function FormAdd(props) {
  const {
    setTiendaNombre,
    setTiendaTelefono,
    setTiendaAddress,
    setTiendaDescripcion,
    setIsVisibleMap,
    locationtienda,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre Tienda"
        containerStyle={styles.input}
        onChange={(e) => setTiendaNombre(e.nativeEvent.text)}
      />
      <Input
        placeholder="Telefono"
        containerStyle={styles.input}
        onChange={(e) => setTiendaTelefono(e.nativeEvent.text)}
        keyboardType="name-phone-pad"
      />
      <Input
        placeholder="Direccion"
        containerStyle={styles.input}
        onChange={(e) => setTiendaAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationtienda ? "blue" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Descripcion Tienda"
        containerStyle={styles.txtArea}
        multiline={true}
        onChange={(e) => setTiendaDescripcion(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImagen(props) {
  const { toastRef, setImagesSelected, imagesSelected } = props;
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermissions === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos, si los haz rechazado tienes que ir ajustes y activarlos manualmente.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Haz cerrado la galeria sin seleccioar ninguna imagen.",
          2000
        );
      } else {
        setImagesSelected(result.uri);
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "Estas Seguro que quiere eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageURL) => imageURL !== image)
              // console.log(test);
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.viewImges}>
      {size(imagesSelected) < 5 && (
        <Icon
          type="Material-community"
          name="camera"
          color="tomato"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {map(imagesSelected, (imageTienda, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageTienda }}
          onPress={() => removeImage(imageTienda)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  txtArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnTienda: {
    backgroundColor: "tomato",
    margin: 20,
  },
  viewImges: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "blue",
  },
});
