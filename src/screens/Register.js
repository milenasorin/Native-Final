
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
      errorFirebase: "",
      errorEmail: "",
      errorUser: "",
      errorPassword: "",
    };
  }
  onSubmit() {
    const { email, userName, password } = this.state;
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
            this.setState({ errorFirebase: "" });
            this.props.navigation.navigate("Login");
          }) 
      })
      .catch((error) => {
        this.setState({ errorFirebase: error.message });
      });
  }
  render() {
    const { email, userName, password, errorFirebase } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          onChangeText={(text) => {this.setState({ email: text })
          if (text === "") {
            this.setState({ errorEmail: "El correo electrónico es obligatorio" });
          } else {
            this.setState({ errorEmail: "" });
          }}}
          value={email}
        />
        {this.state.errorEmail ? <Text style={styles.error}>{this.state.errorEmail}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={(text) => {this.setState({ userName: text })
          if (text === "") {
            this.setState({ errorUser: "El user es obligatorio" });
          } else {
            this.setState({ errorUser: "" });
          }}}
          value={userName}
        />
        {this.state.errorUser ? <Text style={styles.error}>{this.state.errorUser}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({ password: text })
          if (text === "") {
            this.setState({ errorPassword: "La contra es obligatoria" });
          } else {
            this.setState({ errorPassword: "" });
          }}}
          value={password}
        />
        {this.state.errorPassword ? <Text style={styles.error}>{this.state.errorPassword}</Text> : null}
        {errorFirebase ? <Text style={styles.error}>{errorFirebase}</Text> : null}
        <TouchableOpacity
        style={[styles.button, (!email || !userName || !password) && styles.disabled]}
          onPress={() => this.onSubmit()}
          disabled={!email || !userName || !password} 
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
