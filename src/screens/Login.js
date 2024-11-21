
import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  validateEmail(email) {
    return email.includes("@");
  }

  validatePassword(password) {
    return password.length >= 6;
  }

  onSubmit() {
    const { email, password } = this.state;

    if (!this.validateEmail(email)) {
      this.setState({ error: "El correo no tiene un formato válido" });
      return;
    }
    if (!this.validatePassword(password)) {
      this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "" });
        this.props.navigation.navigate("HomeMenu");
      })
      .catch(() => {
        this.setState({ error: "El correo o la contraseña son incorrectos" });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Correo Electrónico"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
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
    backgroundColor: "#007bff",
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
});
