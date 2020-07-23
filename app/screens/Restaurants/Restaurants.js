import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: "Tienda",
          image: "https://www.cssecuador.com/img/menu/tienda.png",
        },
        {
          id: 2,
          title: "Carniceria",
          image: "https://www.cssecuador.com/img/menu/carniceria.png",
        },
        {
          id: 3,
          title: "Panaderia",
          image: "https://www.cssecuador.com/img/menu/panaderia.jpg",
        },
        {
          id: 4,
          title: "Fruteria",
          image: "https://www.cssecuador.com/img/menu/fruteria.jpg",
        },
        {
          id: 5,
          title: "Ferreteria",
          image: "https://www.cssecuador.com/img/menu/ferreteria.jpg",
        },
        {
          id: 6,
          title: "Farmacia",
          image: "https://www.cssecuador.com/img/menu/farmacia.png",
        },
        {
          id: 7,
          title: "Profesionales",
          image: "https://www.cssecuador.com/img/menu/profesionales.png",
        },
      ],
    };
  }

  clickEventListener(item) {
    ///  Alert.Alert(item);
    console.log(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.clickEventListener(item);
                }}
              >
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={{ uri: item.image }} />
                <View style={styles.cardHeader}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: "42%",
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 75,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
});
