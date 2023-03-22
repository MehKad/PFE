import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTableVisible: false,
      examsVisible: true,
      resultsVisible: false,
    };
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

    return (
      <View>
        {timeTableVisible && (
          <Modal animationType="slide" visible={this.state.timeTableVisible}>
            <View>
              <AntDesign
                name="close"
                size={24}
                onPress={() => this.setState({ timeTableVisible: false })}
                style={{
                  width: 25,
                  left: 25,
                  top: 25,
                  marginBottom: 25,
                }}
              />
              <DataTable style={styles.tableC}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title>Days</DataTable.Title>
                  <DataTable.Title>8--10</DataTable.Title>
                  <DataTable.Title>10--12</DataTable.Title>
                  <DataTable.Title>14--16</DataTable.Title>
                  <DataTable.Title>16--18</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>Mon</DataTable.Cell>
                  <DataTable.Cell>G.E</DataTable.Cell>
                  <DataTable.Cell>G.E</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Tue</DataTable.Cell>
                  <DataTable.Cell>G.E</DataTable.Cell>
                  <DataTable.Cell>G.E</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Wed</DataTable.Cell>
                  <DataTable.Cell>G.P</DataTable.Cell>
                  <DataTable.Cell>G.P</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Thu</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                  <DataTable.Cell>R</DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Fri</DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <DataTable style={styles.tableC}>
                <DataTable.Header>
                  <DataTable.Title>Abreviation</DataTable.Title>
                  <DataTable.Title>Full name</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>R</DataTable.Cell>
                  <DataTable.Cell>Reseau</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>G.E</DataTable.Cell>
                  <DataTable.Cell>Gestion d'entreprise</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>G.P</DataTable.Cell>
                  <DataTable.Cell>Gestion de projet</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </Modal>
        )}
        {examsVisible && (
          <Modal>
            <View>
              <AntDesign
                name="close"
                size={24}
                onPress={() => this.setState({ examsVisible: false })}
                style={{
                  width: 25,
                  left: 25,
                  top: 25,
                  marginBottom: 25,
                }}
              />
              <DataTable style={styles.tableC}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title>Days</DataTable.Title>
                  <DataTable.Title>Module</DataTable.Title>
                  <DataTable.Title>Place</DataTable.Title>
                  <DataTable.Title>Time</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>24-Mar</DataTable.Cell>
                  <DataTable.Cell>M13</DataTable.Cell>
                  <DataTable.Cell>TP6/TP9</DataTable.Cell>
                  <DataTable.Cell>9--12</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>24-Mar</DataTable.Cell>
                  <DataTable.Cell>M14</DataTable.Cell>
                  <DataTable.Cell>TP6/TP9</DataTable.Cell>
                  <DataTable.Cell>9--12</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <DataTable style={styles.tableC}>
                <DataTable.Header>
                  <DataTable.Title>Abreviation</DataTable.Title>
                  <DataTable.Title>Full name</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>M13</DataTable.Cell>
                  <DataTable.Cell>Reseau</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>M14</DataTable.Cell>
                  <DataTable.Cell>
                    Organisation des Entreprises et Gestion de Projet
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </Modal>
        )}
        {resultsVisible && (
          <Modal>
            <View>
              <AntDesign
                name="close"
                size={24}
                onPress={() => this.setState({ resultsVisible: false })}
                style={{
                  width: 25,
                  left: 25,
                  top: 25,
                  marginBottom: 25,
                }}
              />
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
  tableC: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  annonces: store.userState.annonces,
});

export default connect(mapStateToProps, null)(Home);
