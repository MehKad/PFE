import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
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
          enableSwipeMonths={true}
          style={{
            width: 300,
          }}
          theme={{
            calendarBackground: "#fff",
            textSectionTitleColor: "grey",
            todayTextColor: "blue",
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
