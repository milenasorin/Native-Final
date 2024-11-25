import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      searchText: "",
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let usuario = [];
      docs.forEach((doc) => {
        usuario.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        usuarios: usuario,
        loading: false,
      });
      console.log(usuario);
    });
  }

  filterUsers() {
    const { usuarios, searchText } = this.state;
    if (searchText === "") return usuarios;
    return usuarios.filter(
      (usuario) =>
        usuario.data.userName &&
        usuario.data.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  

  render() {
    const filteredUsers = this.filterUsers();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Estás en Search</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="Buscar usuarios"
          value={this.state.searchText}
          onChangeText={(text) => this.setState({ searchText: text })}
        />
        {filteredUsers.length === 0 ? (
          <Text style={styles.noResultsText}>
            El usuario buscado no existe.
          </Text>
        ) : (
          <FlatList
            style={styles.flatlist}
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.flat}>{item.data.userName}</Text>
            )}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 20,
      backgroundColor: "#f0f0f5", 
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: 15,
    },
    subtitle: {
      fontSize: 18,
      color: "#34495e", 
      textAlign: "center",
      marginBottom: 25,
    },
    searchBar: {
      height: 45,
      borderColor: "#bdc3c7", 
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: "#ffffff",
      fontSize: 16,
      color: "#2c3e50",
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3, 
    },
    flatlist: {
      flex: 1,
      marginTop: 10,
    },
    flat: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      fontSize: 18,
      color: "#2c3e50",
      backgroundColor: "#ffffff", 
      borderRadius: 10, 
      marginBottom: 10, 
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2, 
    },
    noResultsText: {
      fontSize: 18,
      color: "#e74c3c", 
      textAlign: "center",
      marginTop: 30,
    },
  });
  ;
  ;
