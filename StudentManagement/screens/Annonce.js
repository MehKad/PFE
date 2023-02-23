import React, { Component } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class Annonce extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { annonces } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          ListHeaderComponentStyle={styles.listheader}
          ListHeaderComponent={<Text style={styles.header}>Annonce</Text>}
          data={annonces}
          renderItem={({ item }) => {
            const d = new Date(item.date.seconds * 1000);
            var dd =
              d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            return (
              <View style={styles.posts}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.content}</Text>
                <Text style={styles.time}>{dd}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f0ffff",
  },
  listheader: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  posts: {
    width: 330,
    justifyContent: "center",
    backgroundColor: "#386BF6",
    borderRadius: 20,
    padding: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 35,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 15,
    marginTop: 5,
    textAlign: "center",
    color: "white",
  },
  body: {
    textAlign: "justify",
    padding: 5,
  },
  time: {
    textAlign: "right",
    paddingTop: 10,
    fontSize: 10,
    color: "white",
  },
});

const mapStateToProps = (store) => ({
  annonces: store.userState.annonces,
});

export default connect(mapStateToProps, null)(Annonce);
