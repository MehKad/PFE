import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Image, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const Model = ({ visible, posting, full_name, image, prevTitle, prevContent, toggleModal, handleSaveChanges }) => {
    const [title, setTitle] = useState(prevTitle);
    const [content, setContent] = useState(prevContent);

    return (
        <Modal
            visible={visible}
            animationType='slide'
        >
            <View style={styles.newcont}>
                <AntDesign
                    style={{ width: 25, left: 25, top: 25 }}
                    name="close"
                    size={24}
                    onPress={() => toggleModal()}
                />
                <Button
                    style={{
                        width: 100,
                        position: "absolute",
                        right: 0,
                        margin: 15,
                    }}
                    onPress={() => handleSaveChanges(title, content)}
                >
                    <Text>Post</Text>
                </Button>
                <Image style={styles.avatar} source={{ uri: image }} />
                <Text style={styles.fname}>{full_name}</Text>
                {posting && (
                    <ActivityIndicator
                        size="large"
                        color="#386BF6"
                        style={styles.activityIndicator}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    onChangeText={(title) => setTitle(title)}
                    value={title}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Content"
                    onChangeText={(content) => setContent(content)}
                    value={content}
                    maxLength={50}
                    multiline={true}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    }, newcont: {
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
    }
});

export default Model;
