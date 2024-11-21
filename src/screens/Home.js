import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import Posts from "../components/Posts";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
    };
  }

  componentDidMount() {
   
    db.collection("posts") 
     .orderBy("createdAt", "desc") 
     .onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        posteos: posts,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a la Home!</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Posts posteo={item} />} 
        />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                this.props.navigation.navigate("Login");
              })
              .catch((error) => console.error("Error al cerrar sesión:", error));
          }}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;