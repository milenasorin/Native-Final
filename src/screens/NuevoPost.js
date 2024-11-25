import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { auth, db } from "../firebase/config";

export default class NuevoPost extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  handlePost() {
    const { message } = this.state;

    if (message.length === 0) {
      this.setState({errorMessage : "El posteo no debe estar vacío"});
      return;
    }

    db.collection("posts")
      .add({
        email: auth.currentUser.email,
        mensaje: message,
        createdAt: Date.now(),
        likes: [],
      })
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        this.setState({ errorMessage: "Error al crear el posteo" });
        console.error(error);
      });
  }

  render() {
    const { message, errorMessage } = this.state;

    return (
      <View style={styles.container}>
          <>
            <Text style={styles.title}>Crear Nuevo Posteo</Text>
            <TextInput
              style={styles.input}
              placeholder="¿Qué estás pensando?"
              onChangeText={(text) => this.setState({ message: text })}
              value={message}
            />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={() => this.handlePost()}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
          </>
      </View>
    );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});  


