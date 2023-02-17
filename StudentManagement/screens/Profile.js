import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase/compat";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchUser } from "../redux/actions";


class Profile extends Component {
  onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out"))
      .catch((error) => alert(error));
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onLogOut()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <Text>{currentUser.full_name}</Text>
        <Text>{currentUser.email}</Text>
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

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);