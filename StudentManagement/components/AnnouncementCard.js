import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import FadeIn from './FadeIn';

const AnnouncementCard = ({ id, title, content, date, avatar, teacherName, teacher, deleteAnnonce, editAnnouncemnt }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleCard = () => {
    if (expanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(true));
    }
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [70, 250],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.2, 1],
  });

  const EditButton = () => {
    return (
      <TouchableOpacity
        onPress={() => editAnnouncemnt({ id, title, content })}
        style={styles.editButton}
      >
        <MaterialIcons name="edit" size={20} color="#1c1c1c" />
      </TouchableOpacity>
    );
  };

  const DeleteButton = () => {
    return (
      <TouchableOpacity onPress={() => deleteAnnonce(id)} style={styles.deleteButton}>
        <MaterialCommunityIcons name="delete-outline" size={20} color="#1c1c1c" />
      </TouchableOpacity>
    );
  };

  return (
    <FadeIn>
      <TouchableOpacity onPress={toggleCard} activeOpacity={0.8}>
        <Animated.View style={[styles.container, { height: heightInterpolate }]}>
          <View style={styles.header}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <View style={styles.headerText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            {teacher && <EditButton />}
            {teacher && <DeleteButton />}
          </View>
          <Animated.View style={{ opacity: opacityInterpolate }}>
            <View style={styles.body}>
              <Text style={styles.content}>{content}</Text>
              <Text style={styles.teacherName}>{teacherName}</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </FadeIn>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dadce0",
    elevation: 0,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#386BF6",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#5f6368",
  },
  body: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#dadce0",
    paddingBottom: 10,
  },
  teacherName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
    marginTop: 8,
  },
  content: {
    fontSize: 16,
    color: "#202124",
  },
  editButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    padding: 4,
    marginLeft: 12,
  },
  deleteButton: {
    backgroundColor: "#00bdff",
    borderRadius: 4,
    padding: 4,
    marginLeft: 8,
  },
});

export default AnnouncementCard;
