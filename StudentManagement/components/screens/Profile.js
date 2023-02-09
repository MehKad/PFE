import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase/compat";

export default class Profile extends Component {
  onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out"))
      .catch((error) => alert(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onLogOut()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#004AAD",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 120,
    paddingRight: 120,
    marginTop: "5%",
    marginBottom: "10%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
});
