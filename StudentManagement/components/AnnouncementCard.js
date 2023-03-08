import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AnnouncementCard = (props) => {
    const { title, content, avatar, date } = props;
    return (
        <View style={styles.cardContainer}>
            <Image
                source={{ uri: avatar }}
                style={styles.avatarImage}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.content} numberOfLines={2}>{content}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        marginBottom: 10,
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555',
    },
    dateContainer: {
        backgroundColor: '#f1f3f4',
        borderRadius: 10,
        padding: 5,
    },
    date: {
        fontSize: 12,
        color: '#555',
    },
});

export default AnnouncementCard;
