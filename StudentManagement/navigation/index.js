import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase/compat";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Reducer from "../redux/reducers";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const store = createStore(Reducer, applyMiddleware(thunk));

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

export default class index extends Component {
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
    return (
      <NavigationContainer>
        {loggedIn ? <Provider store={store}><AppStack /></Provider> : <AuthStack />}
      </NavigationContainer>
    );
  }
}
