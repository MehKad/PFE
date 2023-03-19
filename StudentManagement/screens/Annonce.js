import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase/compat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AnimatedFAB, Button, Searchbar } from "react-native-paper";
import moment from "moment";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AnnouncementCard from "../components/AnnouncementCard";

class Annonce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredAnnouncements: [],
      modalVisible: false,
      title: "",
      content: "",
      posting: false,
      start: true,
    };
  }

  deleteAnnonce = (id) => {
    firebase
      .firestore()
      .collection("annonces")
      .doc(firebase.auth().currentUser.uid)
      .collection("teacherAnnonce")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Delete announcement");
      });
  };
  editAnnonce = (id) => {
    onPress = this.toggleModal();
  };

  searchFilter = (query) => {
    const { annonces } = this.props;
    const filteredAnnouncements = annonces.filter((annonce) =>
      annonce.title.toLowerCase().includes(query.toLowerCase())
      || annonce.content.toLowerCase().includes(query.toLowerCase())
      || annonce.teacher.full_name.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredAnnouncements: filteredAnnouncements, start: false });
  }

  toggleModal = () => {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };

  handleSaveChanges = () => {
    this.setState({ posting: true });
    const { title, content } = this.state;
    firebase
      .firestore()
      .collection("annonces")
      .doc(firebase.auth().currentUser.uid)
      .collection("teacherAnnonce")
      .add({
        title,
        content,
        date: new Date()
      })
      .then(() => {
        console.log("Announcement posted");
        this.setState({
          title: "",
          content: "",
          posting: false,
        });
        this.toggleModal();
      });
  };

  render() {
    const { currentUser, annonces } = this.props;
    const { filteredAnnouncements, start } = this.state;
    return (
      <SafeAreaProvider style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => this.searchFilter(query)}
        />
        <FlatList
          data={start ? annonces : filteredAnnouncements}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { }}>
              <AnnouncementCard
                id={item.id}
                title={item.title}
                content={item.content}
                date={moment(item.date.seconds * 1000).format("LL")}
                avatar={item.teacher.image}
                teacherName={item.teacher.full_name}
                teacher={!currentUser.student}
                deleteAnnonce={this.deleteAnnonce}
                editAnnonce={this.editAnnonce}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>No Availabe announcements!</Text>
            </View>
          )}
        />
        {!currentUser.student ? (
          <AnimatedFAB
            icon={"plus"}
            label={"Add"}
            onPress={this.toggleModal}
            animateFrom={"right"}
            iconMode={"dynamic"}
            style={styles.fabStyle}
          />
        ) : null}
        <Modal visible={this.state.modalVisible}>
          <View style={styles.newcont}>
            <AntDesign
              style={{ width: 25, left: 25, top: 25 }}
              name="close"
              size={24}
              onPress={this.toggleModal}
            />
            <Button
              style={{
                width: 100,
                position: "absolute",
                right: 0,
                margin: 15,
              }}
              onPress={this.handleSaveChanges}
            >
              <Text>Post</Text>
            </Button>
            <Image style={styles.avatar} source={{ uri: currentUser.image }} />
            <Text style={styles.fname}>{currentUser.full_name}</Text>
            {this.state.posting && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.activityIndicator}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={(title) => this.setState({ title })}
            />
            <TextInput
              style={styles.input}
              onChangeText={(content) => this.setState({ content })}
              placeholder="Content"
              maxLength={100}
              multiline
            />
          </View>
        </Modal>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  fabStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  newcont: {
    flex: 1,
  },
  input: {
    top: 100,
    left: 30,
    borderWidth: 2,
    padding: 8,
    width: 330,
    borderColor: "rgba(232, 236, 244, 1)",
    borderRadius: 8,
    marginTop: "5%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    top: 80,
    left: 30,
    position: "absolute",
  },
  fname: {
    position: "absolute",
    top: 90,
    left: 80,
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  annonces: store.userState.annonces,
});

export default connect(mapStateToProps, null)(Annonce);
