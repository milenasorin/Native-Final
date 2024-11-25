import React from "react";
import { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NuevoPost from "../screens/NuevoPost";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "../firebase/config";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  render(){
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "#555",
        }}
      />
        <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "#555",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "#555",
        }}
      />
      <Tab.Screen
        name="NuevoPost"
        component={NuevoPost}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "#555",
        }}
      />
    </Tab.Navigator>
  )};
};

export default HomeMenu;