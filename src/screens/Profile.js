import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth, db } from "../firebase/config";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userPosts: [],
      userEmail: "",
      userName: "",
      postCount: 0,
    };
  }

  componentDidMount() {
    const currentUserEmail = auth.currentUser.email;

    db.collection("users")
      .where("email", "==", currentUserEmail)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          const userData = doc.data();
          this.setState({
            userEmail: userData.email,
            userName: userData.userName,
          });
        });
      });


    db.collection("posts")
      .where("email", "==", currentUserEmail)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        posts.sort((a, b) => b.data.createdAt - a.data.createdAt);

        this.setState({ userPosts: posts, postCount: posts.length });
      });
  }

  

  handleLogOut() {
    auth
      .signOut()
      .then(() => this.props.navigation.navigate("Login"))
      .catch((error) => console.error("Error al cerrar sesión:", error));
  }

  render() {
    const { userEmail, userName, userPosts, postCount } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.info}>Email: {userEmail}</Text>
        <Text style={styles.info}>Usuario: {userName}</Text>
        <Text style={styles.info}>Posteos: {postCount}</Text>
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postMessage}>{item.data.mensaje}</Text>
              
            </View>
          )}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.handleLogOut()}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  postContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#007bff",
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