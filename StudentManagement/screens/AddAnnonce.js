import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class AddAnnonce extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add Annonce</Text>
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
