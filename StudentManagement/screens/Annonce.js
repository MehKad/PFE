import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class Annonce extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { annonces } = this.props;
    console.log(annonces);
    return (
      <View style={styles.container}>
        <Text>Annonce</Text>
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

const mapStateToProps = (store) => ({
  annonces: store.userState.annonces
})

export default connect(mapStateToProps, null)(Annonce);
