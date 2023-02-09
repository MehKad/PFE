import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as firebase from "firebase/compat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Login from "./components/auth/Login";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Notification from "./components/screens/Notification";
import Annonce from "./components/screens/Annonce";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

//? Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDLKBHxDFPKHm_OazWiZtD9zKZlAITA4r4",
  authDomain: "pfe-studentmanagement.firebaseapp.com",
  projectId: "pfe-studentmanagement",
  storageBucket: "pfe-studentmanagement.appspot.com",
  messagingSenderId: "144914160641",
  appId: "1:144914160641:web:d4a6068f2a21103c4e7400",
  measurementId: "G-QR9Z4PLMFZ",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: user });
    });
  }

  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              )
            }}
          />
          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
              )
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
