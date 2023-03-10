import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase/compat";
import { connect } from "react-redux";
import moment from 'moment';

class Profile extends Component {
  onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out"))
      .catch((error) => alert(error));
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
              marginTop: 30,
              paddingBottom: 5,
            }}
          >
            Profile
          </Text>
          <Image source={{ uri: currentUser.image }} style={styles.img} />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              margin: 5,
            }}
          >
            {currentUser.full_name}
          </Text>
          <Text style={{ color: "white" }}>
            {currentUser.student ? "Student" : "Teacher"}
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.general}>General</Text>
          <Text></Text>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.data}>{currentUser.email}</Text>
          <Seperator />
          <Text style={styles.title}>Phone Number</Text>
          <Text style={styles.data}>{currentUser.phone}</Text>
          <Seperator />
          <Text style={styles.title}>Code</Text>
          <Text style={styles.data}>{currentUser.id}</Text>
          <Seperator />
          <Text style={styles.title}>Date of birth</Text>
          <Text style={styles.data}>{moment(currentUser.date_birth.seconds * 1000).format('L')}</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLogOut()}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Seperator = () => <View style={styles.sep} />;

// style

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#386BF6",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 120,
    paddingRight: 120,
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#386BF6",
    flex: 2,
    width: "100%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: "white",
    flex: 2.5,
    width: "80%",
    borderRadius: 30,
    marginTop: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  sep: {
    height: 1,
    width: "90%",
    backgroundColor: "#ddd",
    margin: 15,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  general: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
  },
  title: {
    fontWeight: "700",
    paddingLeft: "5%",
  },
  data: {
    paddingLeft: "5%",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Profile);
