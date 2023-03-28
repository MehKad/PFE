import React from "react";
import { Modal, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const UserProfile = ({ user, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <AntDesign
            name="close"
            size={24}
            onPress={onClose}
            style={styles.closeIcon}
          />
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "40%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    color: "white",
    position: "absolute",
    left: 25,
    top: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 80,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    marginVertical: 10,
    color: "white",
  },
  email: {
    fontSize: 18,
    marginVertical: 10,
    color: "white",
  },
};

export default UserProfile;
