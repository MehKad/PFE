import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: "white", fontSize: 30, fontFamily: "monospace" }}
          >
            Kadiri Mehdi
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Calendar
            onDayPress={(day) => {
              this.setState({ date: day.dateString });
              console.log("selected day", day.dateString);
            }}
            markedDates={{
              [this.state.date]: {
                selected: true,
                selectedColor: "#00adf5",
              },
            }}
            enableSwipeMonths
            style={{
              width: 300,
              borderRadius: 10,
            }}
            theme={{
              calendarBackground: "#fff",
              textSectionTitleColor: "grey",
              todayTextColor: "white",
              todayBackgroundColor: "#386BF6",
              dayTextColor: "#000",
              textDisabledColor: "#d9e1e8",
              arrowColor: "#000",
              monthTextColor: "#000",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "bold",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="clock" size={50} />
            <Text>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="book-open" size={50} />
            <Text>Exams</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="book-check" size={50} />
            <Text>Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#386BF6",
  },
  bottom: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
