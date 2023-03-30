import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Linking,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/compat";
import { Snackbar } from "react-native-paper";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visible: false,
    };
  }

  onToggleSnackBar = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  onDismissSnackBar = () => this.setState({ visible: false });

  onSignIn = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(`Sign in: ${email}, ${password}`);
      })
      .catch((error) => alert(error));
    this.onToggleSnackBar();
  };

  render() {
    const { visible } = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.parent}>
          <View style={styles.container}>
            <Image
              source={require("../assets/Students.png")}
              style={styles.img}
            />
            <Text style={styles.title}>Student Management App</Text>
          </View>

          <View style={styles.body}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onSignIn()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Se Connecter
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>Mot de pass oubliée?</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "mailto:benkiranedut@gmail.com?subject=Forgotten password&body=I have forgotten my password, can you reset it?"
                )
              }
            >
              <Text style={styles.contact}>Contacter votre prof</Text>
            </TouchableOpacity>
          </View>
          <Snackbar
            visible={visible}
            onDismiss={() => this.onDismissSnackBar()}
          >
            Login Successful
          </Snackbar>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%",
  },
  container: {
    alignItems: "center",
  },
  body: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    flex: 1,
  },
  img: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  contact: {
    color: "#004AAD",
    fontWeight: "bold",
    marginLeft: 5,
  },
  input: {
    borderWidth: 2,
    padding: 8,
    width: 330,
    borderColor: "rgba(232, 236, 244, 1)",
    borderRadius: 8,
    marginTop: "5%",
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
});
