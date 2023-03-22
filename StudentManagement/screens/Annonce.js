import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase/compat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AnimatedFAB, Searchbar } from "react-native-paper";
import moment from "moment";

import AnnouncementCard from "../components/AnnouncementCard";
import Model from "../components/Model";

class Annonce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredAnnouncements: [],
      modalVisible: false,
      posting: false,
      start: true,
      title: '',
      content: '',
      editingId: null
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

  searchFilter = (query) => {
    const { annonces } = this.props;
    const filteredAnnouncements = annonces.filter((annonce) =>
      annonce.title.toLowerCase().includes(query.toLowerCase())
      || annonce.content.toLowerCase().includes(query.toLowerCase())
      || annonce.teacher.full_name.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredAnnouncements, start: false });
  }

  toggleModal = () => {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };

  editAnnouncemnt = (props) => {
    const { id, title, content } = props;
    this.setState({ title, content, editingId: id });
    this.toggleModal();
  }

  handleSaveChanges = (title, content) => {
    this.setState({ posting: true });
    const { editingId } = this.state;
    const collection = firebase
      .firestore()
      .collection("annonces")
      .doc(firebase.auth().currentUser.uid)
      .collection("teacherAnnonce");
    if (editingId) {
      collection
        .doc(editingId)
        .update({
          title,
          content,
          date: new Date()
        })
        .then(() => {
          this.setState({ posting: false, editingId: null });
          this.toggleModal();
        });
    } else {
      collection
        .add({
          title,
          content,
          date: new Date()
        })
        .then(() => {
          this.setState({ posting: false });
          this.toggleModal();
        });
    }
  }

  render() {
    const { currentUser, annonces } = this.props;
    const { filteredAnnouncements, start, modalVisible, posting, title, content } = this.state;
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
                editAnnouncemnt={this.editAnnouncemnt}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>No Availabe announcements!</Text>
            </View>
          )}
        />
        {!currentUser.student && (
          <AnimatedFAB
            icon={"plus"}
            label={"Add"}
            onPress={() => this.toggleModal()}
            animateFrom={"right"}
            iconMode={"dynamic"}
            style={styles.fabStyle}
          />
        )}
        <Model
          visible={modalVisible}
          posting={posting}
          full_name={currentUser.full_name}
          image={currentUser.image}
          prevTitle={title}
          prevContent={content}
          toggleModal={this.toggleModal}
          handleSaveChanges={this.handleSaveChanges}
        />
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
  }
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  annonces: store.userState.annonces,
});

export default connect(mapStateToProps, null)(Annonce);
