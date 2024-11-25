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
      emailError: "",
      userNameError: "",
      passwordError: "",
    };
  }

  validateFields() {
    let isValid = true;


    if (!this.state.email) {
      this.setState({ emailError: "El correo electrónico es obligatorio" });
      isValid = false;
    } else if (!this.state.email.includes("@")) {
      this.setState({ emailError: "El correo electrónico debe contener un @" });
      isValid = false;
    } else {
      this.setState({ emailError: "" });
    }


    if (!this.state.userName) {
      this.setState({ userNameError: "El nombre de usuario es obligatorio" });
      isValid = false;
    } else {
      this.setState({ userNameError: "" });
    }

  
    if (!this.state.password) {
      this.setState({ passwordError: "La contraseña es obligatoria" });
      isValid = false;
    } else if (this.state.password.length < 6) {
      this.setState({
        passwordError: "La contraseña debe tener al menos 6 caracteres",
      });
      isValid = false;
    } else {
      this.setState({ passwordError: "" });
    }

    return isValid;
  }

  isFormValid() {
    const { email, userName, password } = this.state;
    return email.includes("@") && userName.length > 0 && password.length >= 6;
  }

  onSubmit() {
    if (!this.validateFields()) {
      return;
    }

    const { email, userName, password } = this.state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .add({
            email,
            userName,
            createdAt: Date.now(),
          })
          .then(() => {
            console.log("Usuario registrado y datos guardados en Firestore");
            this.props.navigation.navigate("Login");
          })
          .catch((error) => {
            console.error("Error al guardar los datos del usuario:", error);
          });
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        this.setState({ emailError: error.message });
      });
  }

  render() {
    const {
      email, userName, password, emailError, userNameError, passwordError } = this.state;

    const isValid = this.isFormValid();

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
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={userName}
        />
        {userNameError ? <Text style={styles.error}>{userNameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={password}
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, !isValid && styles.disabled]}
          onPress={() => this.onSubmit()}
          disabled={!isValid}
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