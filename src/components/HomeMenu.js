import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
// import NuevoPost from "../screens/NuevoPost";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
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
  );
};

export default HomeMenu;