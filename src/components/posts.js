import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantLikes: 0,
    };
  }

  componentDidMount() {
    const { likes } = this.props.posteo.data;


    this.setState({
      like: likes.includes(auth.currentUser.email),
      cantLikes: likes.length,
    });

 
    db.collection("posts")
      .doc(this.props.posteo.id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const updatedLikes = doc.data().likes;
          this.setState({
            cantLikes: updatedLikes.length,
            like: updatedLikes.includes(auth.currentUser.email),
          });
        }
      });
  }

  like() {
    db.collection("posts")
      .doc(this.props.posteo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .catch((error) => console.error("Error al dar like:", error));
  }

  unLike() {
    db.collection("posts")
      .doc(this.props.posteo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .catch((error) => console.error("Error al quitar like:", error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <Text style={styles.email}>{this.props.posteo.data.email}</Text>
          <Text style={styles.message}>{this.props.posteo.data.mensaje}</Text>
          {this.state.like ? (
            <TouchableOpacity onPress={() => this.unLike()}>
              <AntDesign name="like1" size={24} color="blue" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.like()}>
              <AntDesign name="like2" size={24} color="gray" />
            </TouchableOpacity>
          )}
          <Text>Cantidad de Likes: {this.state.cantLikes}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});