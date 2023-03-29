import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Linking,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import firebase from "firebase/compat";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTableVisible: false,
      examsVisible: false,
      resultsVisible: false,
    };
  }

  async getTimeTable() {
    const { currentUser } = this.props;
    const Link = await firebase
      .firestore()
      .collection("filiere")
      .doc(currentUser.filiere)
      .collection("timetable")
      .get();
    Linking.openURL(Link.docs[0].data().link);
  }
  async getExams() {
    const { currentUser } = this.props;
    const Link = await firebase
      .firestore()
      .collection("filiere")
      .doc(currentUser.filiere)
      .collection("exams")
      .get();
    Linking.openURL(Link.docs[0].data().link);
  }

  handleTimeTableClick = () => {
    this.setState({ timeTableVisible: true });
  };

  handleExamsClick = () => {
    this.setState({ examsVisible: true });
  };

  handleResultsClick = () => {
    this.setState({ resultsVisible: true });
  };

  renderModals = () => {
    const { timeTableVisible, examsVisible, resultsVisible } = this.state;
    const { currentUser } = this.props;

    return (
      <View>
        {timeTableVisible && (
          <Modal
            animationType="slide"
            visible={this.state.timeTableVisible}
            transparent
          >
            <View style={styles.Mcontainer}>
              <View style={styles.content}>
                <AntDesign
                  name="close"
                  size={24}
                  onPress={() => this.setState({ timeTableVisible: false })}
                  style={{
                    position: "absolute",
                    width: 25,
                    left: 25,
                    top: 25,
                    marginBottom: 25,
                  }}
                />
                {currentUser.student ? (
                  <>
                    <Text>You are about to open the time table, proceed?</Text>
                    <Button
                      icon="timetable"
                      mode="contained"
                      style={{ marginTop: 50 }}
                      onPress={() => this.getTimeTable()}
                    >
                      Yes
                    </Button>
                  </>
                ) : (
                  <Text>
                    You are a teacher, you are unable to see the timetable
                  </Text>
                )}
              </View>
            </View>
          </Modal>
        )}
        {examsVisible && (
          <Modal
            animationType="slide"
            visible={this.state.examsVisible}
            transparent
          >
            <View style={styles.Mcontainer}>
              <View style={styles.content}>
                <AntDesign
                  name="close"
                  size={24}
                  onPress={() => this.setState({ examsVisible: false })}
                  style={{
                    position: "absolute",
                    width: 25,
                    left: 25,
                    top: 25,
                    marginBottom: 25,
                  }}
                />
                {currentUser.student ? (
                  <>
                    <Text>
                      You are about to open the exams scheduale, proceed?
                    </Text>
                    <Button
                      icon="timetable"
                      mode="contained"
                      style={{ marginTop: 50 }}
                      onPress={() => this.getExams()}
                    >
                      Yes
                    </Button>
                  </>
                ) : (
                  <Text>
                    You are a teacher, you are unable to see the exams scheduale
                  </Text>
                )}
              </View>
            </View>
          </Modal>
        )}
        {resultsVisible && (
          <Modal
            animationType="slide"
            visible={this.state.resultsVisible}
            transparent
          >
            <View style={styles.Mcontainer}>
              <View style={styles.content}>
                <AntDesign
                  name="close"
                  size={24}
                  onPress={() => this.setState({ resultsVisible: false })}
                  style={{
                    position: "absolute",
                    width: 25,
                    left: 25,
                    top: 25,
                    marginBottom: 25,
                  }}
                />
                <Text>Results aren't available now</Text>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  renderItem = (item) => (
    <ListItem>
      <Avatar source={{ uri: item.teacher.image }} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No announcements for this date.</Text>
      </View>
    );
  };

  render() {
    const { annonces } = this.props;
    const announcements = annonces.reduce((acc, announcement) => {
      const { title, content, date, teacher } = announcement;
      const formated_date = moment(date.seconds * 1000).format("YYYY-MM-DD");
      if (!acc[formated_date]) {
        acc[formated_date] = [];
      }
      acc[formated_date].push({ title, content, teacher });
      return acc;
    }, {});

    return (
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Agenda
            items={announcements}
            renderItem={this.renderItem}
            renderEmptyData={this.renderEmptyData}
            showOnlySelectedDayItems={true}
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={this.handleTimeTableClick}
          >
            <MaterialCommunityIcons name="timetable" size={50} />
            <Text>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={this.handleExamsClick}
          >
            <MaterialCommunityIcons name="book-open-outline" size={50} />
            <Text>Exams</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={this.handleResultsClick}
          >
            <MaterialCommunityIcons name="book-check-outline" size={50} />
            <Text>Results</Text>
          </TouchableOpacity>
        </View>
        {this.renderModals()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  bottom: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  Mcontainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "white",
    height: "40%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  annonces: store.userState.annonces,
});

export default connect(mapStateToProps, null)(Home);
