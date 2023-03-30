import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase/compat";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { connect } from "react-redux";
import moment from 'moment';
import { Snackbar } from 'react-native-paper';

import UserModel from "../components/UserModel";

const Profile = (props) => {
  const uid = firebase.auth().currentUser.uid;
  const { currentUser } = props;
  const [modelVisible, setModelVisible] = useState(false);
  const [posting, setPosting] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onToggleSnackBar = () => setSnackbarVisible((prevState) => !prevState);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out"))
      .catch((error) => alert(error));
  };

  const toggleModal = () => {
    setModelVisible((prevState) => !prevState);
  };

  const uploadImage = async (name, phone, image, dateBirth) => {
    setPosting(true);
    const childPath = `users/${uid}/${Math.random().toString(36)}`;
    const response = await fetch(image);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, childPath);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Image uploaded successfully!');
      getDownloadURL(snapshot.ref).then(url => handleSaveChanges(name, phone, url, dateBirth));
    });
  };


  const handleSaveChanges = (name, phone, url, dateBirth) => {
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .update({
        full_name: name,
        phone,
        image: url,
        date_birth: dateBirth
      })
      .then(() => {
        setPosting(false);
        toggleModal();
        onToggleSnackBar();
      })
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
        <Text style={styles.data}>{moment(currentUser.date_birth.seconds * 1000).format('DD/MM/YYYY')}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => toggleModal()}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onLogOut()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <UserModel
        visible={modelVisible}
        posting={posting}
        prevName={currentUser.full_name}
        prevPhone={currentUser.phone}
        prevImage={currentUser.image}
        prevDate={currentUser.date_birth}
        toggleModal={toggleModal}
        handleSaveChanges={handleSaveChanges}
        uploadImage={uploadImage}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => onDismissSnackBar()}
      >
        Updated Successfully
      </Snackbar>
    </View>
  );
}

const Seperator = () => <View style={styles.sep} />;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingVertical: 20,
  },
  editButton: {
    backgroundColor: "#386BF6",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#386BF6",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  logoutButtonText: {
    color: "#386BF6",
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
