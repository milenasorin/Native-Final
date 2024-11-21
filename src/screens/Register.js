
import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config.js";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      error: "",
    };
  }

  onSubmit() {
    const { email, userName, password } = this.state;

    if (!email || !userName || !password) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        db.collection("users")
          .add({
            email,
            userName,
            createdAt: Date.now(),
          })
          .then(() => {
            this.setState({ error: "" });
            this.props.navigation.navigate("Login");
          })
          .catch((error) => {
            this.setState({ error: "Error al guardar los datos del usuario" });
          });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { email, userName, password, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={userName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, (!email || !userName || !password) && styles.disabled]}
          onPress={() => this.onSubmit()}
          disabled={!email || !userName || !password} //falta validacion de mensaje vacio en cada campo de form
        >
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});

