import React, { Component } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
  }

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <View style={{ flex: 1 }}>
          <Agenda
            items={announcements}
            renderItem={this.renderItem}
            renderEmptyData={this.renderEmptyData}
            showOnlySelectedDayItems={true}
          />
        </View>
        {/* <View style={styles.bottom}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="timetable" size={50} />
            <Text>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="book-open-outline" size={50} />
            <Text>Exams</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="book-check-outline" size={50} />
            <Text>Results</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#386BF6",
  },
  bottom: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  annonces: store.userState.annonces
});

export default connect(mapStateToProps, null)(Home);